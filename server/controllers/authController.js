const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup endpoint
const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username) {
            return res.status(400).json({ error: "username is required!" });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                error: "password is required and must contain at least 6 characters"
            });
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "user already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ msg: 'user registered successfully' });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'internal server error' });
    }
}

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "user not found" });
        }

        const match = await comparePassword(password, existingUser.password);

        if (match) {
            const token = jwt.sign(
                {
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "30d",
                }
            );
            return res.status(200).json({ msg: 'user logged in successfully', token });

        } else {
            return res.status(400).json({ error: 'incorrect password' });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

module.exports = {
    signupUser,
    loginUser,
}
