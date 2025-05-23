import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import useTodoStore from '@/features/todo/store/todoStore.ts';
import { todoSchema } from '@/utils/validationSchemas.ts';
import {toast} from "sonner";

interface TodoFormProps {
    initialText?: string;
    todoId?: string;
    onSuccess?: () => void;
}

export const useTodoForm = ({ initialText = '', todoId, onSuccess }: TodoFormProps) => {
    const addTodo = useTodoStore((state) => state.addTodo);
    const updateTodoText = useTodoStore((state) => state.updateTodoText);
    const isLoading = useTodoStore((state) => state.isLoading);
    const todoError = useTodoStore((state) => state.error);
    const clearTodoError = useTodoStore((state) => state.clearError);

    const [formSpecificError, setFormSpecificError] = useState<string | null>(null);

    const isEditMode = !!todoId;

    const formik = useFormik({
        initialValues: {
            text: initialText,
        },
        validationSchema: todoSchema,
        onSubmit: async (values, { resetForm }) => {
            setFormSpecificError(null);
            clearTodoError();

            try {
                if (isEditMode && todoId) {
                    await updateTodoText(todoId, values.text);
                    toast.success('Todo updated successfully!');
                } else {
                    await addTodo(values.text);
                    toast.success('Todo added successfully!');
                }
                resetForm();
                onSuccess?.();
            } catch (err: any) {
                toast.error('Todo operation failed:', err);
                setFormSpecificError(todoError);
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (todoError) {
            setFormSpecificError(todoError);
        }
    }, [todoError]);

    return {
        formik,
        isLoading,
        formSpecificError,
        isEditMode,
        setFormSpecificError,
        clearTodoError,
    };
};