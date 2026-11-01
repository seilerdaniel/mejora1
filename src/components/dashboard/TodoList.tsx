'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { TodoItem as TodoType } from '@/types';
import { TodoItem } from './TodoItem';
import { TodoModal } from './TodoModal';

type Category = 'Proyecto' | 'Hogar' | 'Compras';

interface TodoListProps {
  todos: TodoType[];
  onAddTodo: (text: string, category: Category) => void;
  onUpdateTodo: (id: string, text: string, category: Category) => void;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export function TodoList({ todos, onAddTodo, onUpdateTodo, onToggleTodo, onDeleteTodo }: TodoListProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('Proyecto');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!text.trim()) return;
    
    try {
      await onAddTodo(text.trim(), category);
      setText(''); 
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  };

  const handleOpenEdit = (todo: TodoType) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (newText: string, newCategory: Category) => {
    if (editingTodo) {
      onUpdateTodo(editingTodo.id, newText, newCategory);
    }
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">Tareas del Día</span>
          <span className="text-xs text-zinc-500 font-mono">{todos.filter((t) => t.completed).length}/{todos.length}</span>
        </div>

        <form onSubmit={handleQuickAdd} className="flex flex-col gap-2 mb-4 bg-zinc-950/50 p-2 rounded-xl border border-zinc-800/50">
          <div className="flex items-center gap-2">
            <input
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              placeholder="¿Qué necesitas hacer hoy?"
              className="flex-1 bg-transparent px-2 py-1.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none"
            />
            <button 
              type="submit" 
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 p-1.5 rounded-lg transition-colors flex-shrink-0"
              title="Agregar tarea"
            >
              <Plus size={16} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 px-2 pb-1 border-t border-zinc-800/50 pt-2">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Etiqueta:</span>
            <select
              value={category} 
              onChange={(e) => setCategory(e.target.value as Category)}
              className="bg-zinc-900 border border-zinc-800 rounded-md px-2 py-1 text-[10px] text-zinc-300 focus:outline-none cursor-pointer"
            >
              <option value="Proyecto">Proyecto</option>
              <option value="Hogar">Hogar</option>
              <option value="Compras">Compras</option>
            </select>
          </div>
        </form>

        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {todos.length === 0 ? (
            <p className="text-xs text-zinc-600 text-center py-4">No hay tareas pendientes para hoy</p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggleTodo}
                onEdit={handleOpenEdit}
                onDelete={onDeleteTodo}
              />
            ))
          )}
        </div>
      </div>

      <TodoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
        editingTodo={editingTodo}
      />
    </div>
  );
}