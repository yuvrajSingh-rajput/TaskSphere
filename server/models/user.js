const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        trim : true,
    },
    email: {
        type: String, 
        unique: true,
        trim: true,
    },
    password: {
        type: String,
    },
    completedTasks : {
        type: Number,
        default : 0,
    }, 
    totalTasks: {
        type: Number,
        default : 0,
    },
},{
    timestamps: true,
});

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
