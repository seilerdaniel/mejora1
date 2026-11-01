'use client';

import React from 'react';
import { Check, Trash2, Pencil } from 'lucide-react';
import { TodoItem as TodoType } from '@/types';

interface TodoItemProps {
  todo: TodoType;
  onToggle: (id: string) => void;
  onEdit: (todo: TodoType) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  return (
    <div className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
      todo.completed
        ? 'bg-zinc-950/40 border-zinc-800/40 text-zinc-600'
        : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-200'
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className="flex items-center gap-2.5 flex-1 cursor-pointer min-w-0 pr-2 text-left"
      >
        <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
          todo.completed
            ? 'bg-zinc-100 border-zinc-100 text-zinc-950'
            : 'border-zinc-700 bg-zinc-950'
        }`}>
          {todo.completed && <Check size={11} strokeWidth={3} />}
        </div>
        
        <span className={`text-xs truncate ${todo.completed ? 'line-through decoration-zinc-600 text-zinc-500' : ''}`}>
          {todo.text}
        </span>
        
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-800/60 text-zinc-500 font-mono flex-shrink-0 ml-auto">
          {todo.category}
        </span>
      </button>

      <div className="flex items-center gap-1 pl-2 border-l border-zinc-800/50">
        <button onClick={() => onEdit(todo)} className="text-zinc-500 hover:text-blue-400 p-1" title="Editar">
          <Pencil size={13} />
        </button>
        <button onClick={() => onDelete(todo.id)} className="text-zinc-600 hover:text-red-400 p-1" title="Eliminar">
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}