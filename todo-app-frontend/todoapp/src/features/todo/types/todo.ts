export interface Todo {
    _id: string;
    text: string;
    completed: boolean;
    owner: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface CreateTodoData {
    text: string;
}

export interface UpdateTodoData {
    text?: string;
    completed?: boolean;
}

export interface TodoState {
    todos: Todo[];
    isLoading: boolean;
    error: string | null;
    fetchTodos: () => Promise<void>;
    addTodo: (text: string) => Promise<Todo>;
    toggleComplete: (id: string) => Promise<Todo>;
    deleteTodo: (id: string) => Promise<void>;
    updateTodoText: (id: string, newText: string) => Promise<Todo>;
    clearError: () => void;
}