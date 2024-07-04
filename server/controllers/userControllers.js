const TodoModel = require('../models/todo');
const UserModel = require('../models/user');

const showAllTodos = async (req, res) => {
    try {
        const tasks = await TodoModel.find({ user: req.user.id });
        return res.status(200).json({ tasks });
    } catch (err) {
        console.error("Error in fetching tasks: ", err);
        return res.status(500).json({
            error: "Internal Server Error!"
        });
    }
};

const createTodo = async (req, res) => {
    try {
        const { task } = req.body;
        console.log("req.user in controller:", req.user); // Confirm req.user is available
        const userId = req.user && req.user.id; // Ensure req.user is set
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized. User not found in token." });
        }
        console.log("Creating task for user ID:", userId);
        const todo = new TodoModel({
            user: userId,
            task,
        });

        await todo.save();

        await UserModel.findByIdAndUpdate(userId, { $inc: { totalTasks: 1 } });

        return res.status(200).json({
            msg: 'Task Successfully Added!',
            task: todo
        });

    } catch (err) {
        console.error("Error creating todo: ", err.message, err.stack);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};


const deleteTodo = async (req, res) => {
    const taskId = req.params.id;
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(taskId);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        await UserModel.findByIdAndUpdate(deletedTodo.user, {
            $inc: {
                completedTasks: 1,
            }
        });

        return res.status(200).json({
            msg: "Congratulations, Task Completed!"
        });

    } catch (err) {
        console.error("Error deleting todo: ", err);
        return res.status(500).json({
            error: "Internal Server Error!"
        });
    }
};

const handleUserStats = async (req, res) => {
    try {
        const userStats = await UserModel.findById(req.user.id).select('username email totalTasks completedTasks');
        return res.status(200).json(userStats);
    } catch (err) {
        console.error("Error fetching user stats: ", err);
        return res.status(500).json({
            error: "Internal Server Error!",
        });
    }
};

const handleAbout = async (req, res) => {
}

module.exports = {
    showAllTodos,
    deleteTodo,
    createTodo,
    handleUserStats,
    handleAbout,
};
