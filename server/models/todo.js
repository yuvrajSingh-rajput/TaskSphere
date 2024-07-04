const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'UserModel',
        required : true,
    },
    task: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const TodoModel = mongoose.model('TodoModel', TodoSchema);

module.exports = TodoModel;