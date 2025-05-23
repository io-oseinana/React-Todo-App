import React from 'react';
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useTodoForm} from "@/features/todo/hooks/useTodoForm.ts";
import {Loader2} from "lucide-react";

interface TodoFormProps {
    initialText?: string;
    todoId?: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({initialText = '', todoId, onSuccess, onCancel}) => {
    const {formik, formSpecificError, isLoading, isEditMode} = useTodoForm({initialText, todoId, onSuccess})

    return (
        <form onSubmit={formik.handleSubmit} className="mb-4">
            <div className="flex gap-2.5 w-full">
                <Input
                    type="text"
                    id="text"
                    name="text"
                    placeholder={isEditMode ? "Edit todo text..." : "Add a new todo..."}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.text}
                    disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !formik.isValid || !formik.dirty}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            {isEditMode ? 'Updating...' : 'Adding...'}
                        </>
                    ) : (
                        <>
                            {isEditMode ? 'Update Todo' : 'Add Todo'}
                        </>
                    )}
                </Button>
            </div>
            {formik.touched.text && formik.errors.text ? (
                <div className="text-red-500 text-sm mt-5">{formik.errors.text}</div>
            ) : null}
            {formSpecificError && <div className="text-red-500 text-sm mt-5">{formSpecificError}</div>}
            {isEditMode && (
                <Button type="button" onClick={onCancel} className="mt-2 text-xs bg-red-400 hover:bg-red-300" disabled={isLoading}>
                    Cancel
                </Button>
            )}
        </form>
    );
};

export default TodoForm;