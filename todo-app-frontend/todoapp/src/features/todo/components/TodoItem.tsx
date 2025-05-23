import React, {useState} from 'react';
import useTodoStore from "@/features/todo/store/todoStore.ts";
import TodoForm from "@/features/todo/components/form/TodoForm.tsx";
import type {Todo} from "@/features/todo/types/todo.ts";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {EditIcon, Trash2} from "lucide-react";
import {toast} from "sonner";

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({todo}) => {
    const {toggleComplete, deleteTodo, isLoading, error: todoError} = useTodoStore();

    const [isEditing, setIsEditing] = useState(false);
    const [itemSpecificError, setItemSpecificError] = useState<string | null>(null);

    const handleToggleComplete = async () => {
        setItemSpecificError(null);
        try {
            await toggleComplete(todo._id);
            toast.success(`${todo.text} is marked ${!todo.completed ? 'complete' : 'incomplete'}!`);
        } catch (err: any) {
            toast.error('Failed to toggle completion:', err);
            setItemSpecificError('Failed to update status.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            setItemSpecificError(null);
            try {
                await deleteTodo(todo._id);
                toast.success(`${todo.text} is deleted!`);
            } catch (err: any) {
                toast.error('Failed to delete todo:', err);
                setItemSpecificError('Failed to delete todo.');
            }
        }
    };

    const handleEditSuccess = () => {
        setIsEditing(false);
        setItemSpecificError(null);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setItemSpecificError(null);
    };

    React.useEffect(() => {
        if (todoError) {
            setItemSpecificError(todoError);
        } else {
            setItemSpecificError(null);
        }
    }, [todoError]);


    return (
        <div className={cn('flex items-center justify-between border py-3 px-5 mb-2.5 rounded-xl')}>
            {isEditing ? (
                <TodoForm
                    initialText={todo.text}
                    todoId={todo._id}
                    onSuccess={handleEditSuccess}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={handleToggleComplete}
                        disabled={isLoading}
                        className="border-none shadow-none"
                    />
                    <p className={`flex-grow m-0 text-[1.1em] ml-3 text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                        {todo.text}
                    </p>
                    <div className="flex gap-2.5">
                        <Button onClick={() => setIsEditing(true)}
                                className="bg-blue-500 text-white rounded-md text-sm transition-all hover:bg-blue-600"
                                disabled={isLoading}>
                            <EditIcon size={16}/>
                        </Button>
                        <Button onClick={handleDelete}
                                className="bg-red-600 text-white rounded-md text-sm transition-all hover:bg-red-700"
                                disabled={isLoading}>
                            <Trash2 size={16}/>
                        </Button>
                    </div>
                </>
            )}
            {itemSpecificError && <div className="text-red-500 text-sm mt-5 w-full">{itemSpecificError}</div>}
        </div>
    );
};

export default TodoItem;