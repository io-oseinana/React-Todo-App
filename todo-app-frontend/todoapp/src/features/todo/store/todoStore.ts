import {create} from "zustand/react";
import todoService from "@/features/todo/services/todoService.ts";
import {AxiosError} from "axios";
import type {TodoState} from "@/features/todo/types/todo.ts";

const useTodoStore = create<TodoState>((set, get) => ({
    todos: [],
    isLoading: false,
    error: null,

    fetchTodos: async () => {
        set({isLoading: true, error: null});
        try {
            const todos = await todoService.getTodos();
            set({todos, isLoading: false});
        } catch (error: unknown) {
            let message: string = 'Failed to fetch todos';
            if (error instanceof AxiosError && error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
            } else if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            set({ isLoading: false, error: message });
        }
    },

    addTodo: async (text: string) => {
        set({ isLoading: true, error: null });
        try {
            const newTodo = await todoService.createTodo({ text });

            set((state) => ({
                todos: [newTodo, ...state.todos],
                isLoading: false,
            }));
            return newTodo;
        } catch (error: unknown) {
            let message: string = 'Failed to add todo';
            if (error instanceof AxiosError && error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
            } else if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            set({ isLoading: false, error: message });
            throw error;
        }
    },

    toggleComplete: async (id: string) => {
        set({ isLoading: true, error: null });
        const currentTodos = get().todos;
        const todoToUpdate = currentTodos.find(todo => todo._id === id);

        if (!todoToUpdate) {
            set({ isLoading: false, error: 'Todo not found for toggle' });
            throw new Error('Todo not found');
        }

        // Optimistic update: Update UI first, then send request
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo._id === id ? { ...todo, completed: !todo.completed } : todo
            ),
            isLoading: false,
        }));

        try {
            const updatedTodo = await todoService.updateTodo(id, { completed: !todoToUpdate.completed });

            set((state) => ({
                todos: state.todos.map((todo) =>
                    todo._id === id ? updatedTodo : todo
                ),
            }));
            return updatedTodo;
        } catch (error: unknown) {

            set({ todos: currentTodos, isLoading: false });
            let message: string = 'Failed to toggle todo status';
            if (error instanceof AxiosError && error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
            } else if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            set({ error: message });
            throw error;
        }
    },

    deleteTodo: async (id: string) => {
        set({ isLoading: true, error: null });
        const currentTodos = get().todos;

        set((state) => ({
            todos: state.todos.filter((todo) => todo._id !== id),
            isLoading: false, // Set false quickly
        }));

        try {
            await todoService.deleteTodo(id);
        } catch (error: unknown) {
            // Revert optimistic update on error
            set({ todos: currentTodos, isLoading: false });
            let message: string = 'Failed to delete todo';
            if (error instanceof AxiosError && error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
            } else if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            set({ error: message });
            throw error;
        }
    },

    updateTodoText: async (id: string, newText: string) => {
        set({ isLoading: true, error: null });
        const currentTodos = get().todos;
        const todoToUpdate = currentTodos.find(todo => todo._id === id);

        if (!todoToUpdate) {
            set({ isLoading: false, error: 'Todo not found for update' });
            throw new Error('Todo not found');
        }

        set(state => ({
            todos: state.todos.map(todo =>
                todo._id === id ? { ...todo, text: newText } : todo
            ),
            isLoading: false,
        }));

        try {
            const updatedTodo = await todoService.updateTodo(id, { text: newText });
            set(state => ({
                todos: state.todos.map(todo =>
                    todo._id === id ? updatedTodo : todo
                )
            }));
            return updatedTodo;
        } catch (error: unknown) {
            set({ todos: currentTodos, isLoading: false });
            let message: string = 'Failed to update todo text';
            if (error instanceof AxiosError && error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
            } else if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            set({ error: message });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
}))

export default useTodoStore;