import TodoForm from "@/features/todo/components/form/TodoForm.tsx";
import TodoFilter from "@/features/todo/components/TodoFilter.tsx";
import useTodoStore from "@/features/todo/store/todoStore";
import {useState} from "react";
import TodoList from "@/features/todo/components/TodoList.tsx";
import Nav from "@/features/user/Nav.tsx";

const TodosPage = () => {
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const todos = useTodoStore((state) => state.todos);

    return (
        <>
            <Nav/>

            <div className="flex flex-col gap-4 p-5 rounded-xl shadow max-w-[600px] border my-5 mx-auto">
                <div>
                    <h1 className="text-2xl font-semibold">✏️Todo List</h1>
                </div>
                <TodoForm/>
                <TodoFilter currentFilter={filter} onFilterChange={setFilter}/>
                <TodoList filter={filter}/>

                {todos.length > 0 && (
                    <p className="text-center mt-[30px] text-gray-500 text-sm italic">
                        You have <span className="font-bold">
                     {todos.filter(t => !t.completed).length}
                    </span> active todo(s)
                        and <span className="font-bold">
                    {todos.filter(t => t.completed).length} completed todo(s).
                    </span>
                    </p>
                )}
            </div>
        </>
    )
}

export default TodosPage
