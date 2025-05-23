import React, {useEffect, useState} from 'react';
import TodoItem from './TodoItem';
import useTodoStore from "@/features/todo/store/todoStore.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

interface TodoListProps {
    filter: 'all' | 'active' | 'completed'; // Prop to receive current filter
}

const TodoList: React.FC<TodoListProps> = ({filter}) => {
    const fetchTodos = useTodoStore((state) => state.fetchTodos);
    const todos = useTodoStore((state) => state.todos);
    const isLoading = useTodoStore((state) => state.isLoading);
    const error = useTodoStore((state) => state.error);
    const clearError = useTodoStore((state) => state.clearError);

    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
        fetchTodos();
        return () => {
            clearError();
            setLocalError(null);
        };
    }, [fetchTodos, clearError]);

    useEffect(() => {
        if (error) {
            setLocalError(error);
        } else {
            setLocalError(null);
        }
    }, [error]);

    const getFilteredTodos = () => {
        if (filter === 'active') {
            return todos.filter((todo) => !todo.completed);
        } else if (filter === 'completed') {
            return todos.filter((todo) => todo.completed);
        }
        return todos;
    };

    const filteredTodos = getFilteredTodos();

    if (localError) {
        return <div className="text-red-500 text-center p-5">Error: {localError}</div>;
    }


    return (
        <div>
            {isLoading ? (
                Array.from({length: 3}).map((_, index) => (
                        <div className="flex flex-col gap-4" key={index}>
                            <div className="flex items-center justify-between border py-3 px-5 mb-2.5 rounded-xl">
                                <Skeleton className="h-5 w-5 rounded-full"/>
                                <Skeleton className="h-4 w-[200px]"/>
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-16"/>
                                    <Skeleton className="h-8 w-16"/>
                                </div>
                            </div>
                        </div>
                ))
            ) : (
                filteredTodos.map((todo) => (
                    <TodoItem key={todo._id} todo={todo}/>
                ))
            )}

            { filteredTodos.length === 0 && !isLoading && !localError && (
                <p className="text-center p-5 text-[#666]">No todos found.</p>
            )}
        </div>
    );
};

export default TodoList;