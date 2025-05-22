import express from "express";
import asyncHandler from "express-async-handler";
import Todo from "../models/Todo.js";
import protect from "../middleware/authMiddleware.js";

const router = express();

// @desc    Get all todos
// @route   GET /api/todos
// @access  Private

router.get('/',
    protect,
    asyncHandler(async (req, res) => {
        const todos = await Todo.find({owner: req.user.id}).sort({createdAt: -1})
        res.status(200).json(todos)
    })
)

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Private

router.post('/',
    protect,
    asyncHandler(async (req, res) => {
        const {text} = req.body;

        if (!text) {
            res.status(400);
            throw new Error('Please add a todo text');
        }

        const todo = await Todo.create({
            text,
            owner: req.user._id,
            completed: false
        })

        res.status(201).json(todo)
    })
)

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private

router.put('/:id',
    protect,
    asyncHandler(async (req, res) => {
        const {text, completed} = req.body;

        const todo = await Todo.findById(req.params.id)

        if (!todo) {
            res.status(404);
            throw new Error('Todo not found');
        }

        if (todo.owner.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('User not authorized to update this todo');
        }

        if (text !== undefined) {
            if (text.length < 3 || text.length > 100) {
                res.status(400);
                throw new Error('Todo text must be between 3 and 100 characters');
            }
            todo.text = text;
        }
        if (completed !== undefined) {
            todo.completed = completed;
        }

        const updatedTodo = await todo.save();

        res.status(200).json(updatedTodo)
    })
)

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private

router.delete('/:id',
    protect,
    asyncHandler(async (req, res) => {
        const todo = await Todo.findById(req.params.id)

        if (!todo) {
            res.status(404); // Not Found
            throw new Error('Todo not found');
        }

        if (todo.owner.toString() !== req.user._id.toString()) {
            res.status(401); // Unauthorized
            throw new Error('User not authorized to delete this todo');
        }

        await todo.deleteOne()

        res.status(200).json({message: 'Todo removed'});
    })
)

export default router;