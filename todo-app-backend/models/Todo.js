// Todo model

import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 100
        },
        completed: {
            type: Boolean,
            default: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo