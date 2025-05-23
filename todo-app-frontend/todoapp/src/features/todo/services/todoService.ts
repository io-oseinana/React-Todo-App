import api from "@/services/api.ts";
import type {Todo} from "@/features/todo/types/todo.ts";


const API_URL = '/todos'

// Create a new todo
const createTodo = async (todoData: {text: string}): Promise<Todo> => {
    const response = await api.post(API_URL, todoData);
    return response.data;
}

// Get user todo
const getTodos = async (): Promise<Todo[]> => {
    const response = await api.get(API_URL);
    return response.data;
}

// Update a todo
const updateTodo = async (todoId: string, todoData: {text?: string; completed?: boolean}): Promise<Todo> => {
    const response = await api.put(`${API_URL}/${todoId}`, todoData);
    return response.data;
}

// Delete a todo
const deleteTodo = async (todoId: string): Promise<{ message: string; id: string }> => {
    const response = await api.delete(`${API_URL}/${todoId}`);
    return { message: response.data.message, id: todoId };
}

const todoService = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
}

export default todoService;