import React from 'react';
import {Button} from "@/components/ui/button.tsx";

interface TodoFilterProps {
    currentFilter: 'all' | 'active' | 'completed';
    onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="flex justify-center gap-2.5 p-4 bg-gray-100 rounded-lg">
            <Button
                className={`bg-gray-200  text-gray-700 transition-all hover:bg-blue-300 ${
                    currentFilter === 'all' ? 'bg-blue-500 text-white border-blue-500 font-bold' : ''
                }`}
                onClick={() => onFilterChange('all')}
            >
                All
            </Button>
            <Button
                className={` bg-gray-200 text-gray-700 transition-all hover:bg-blue-300 ${
                    currentFilter === 'active' ? 'bg-blue-500 text-white border-blue-500 font-bold' : ''
                }`}
                onClick={() => onFilterChange('active')}
            >
                Active
            </Button>
            <Button
                className={` bg-gray-200 text-gray-700 transition-all hover:bg-blue-300 ${
                    currentFilter === 'completed' ? 'bg-blue-500 text-white border-blue-500 font-bold' : ''
                }`}
                onClick={() => onFilterChange('completed')}
            >
                Completed
            </Button>
        </div>
    );
};


export default TodoFilter;