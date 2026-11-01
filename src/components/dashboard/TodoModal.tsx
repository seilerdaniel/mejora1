'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { TodoItem } from '@/types';

type Category = 'Proyecto' | 'Hogar' | 'Compras';

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, category: Category) => void;
  editingTodo: TodoItem | null;
}

export function TodoModal({ isOpen, onClose, onSave, editingTodo }: TodoModalProps) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<Category>('Proyecto');

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      setCategory(editingTodo.category);
    } else {
      setText('');
      setCategory('Proyecto');
    }
  }, [editingTodo, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSave(text.trim(), category);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-zinc-100">
            {editingTodo ? 'Editar Tarea' : 'Nueva Tarea'}
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Descripción</label>
            <input
              type="text" value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Ej: Comprar café"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
              autoFocus
            />
          </div>
          <div>
            <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">Categoría</label>
            <select
              value={category} onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
            >
              <option value="Proyecto">Proyecto</option>
              <option value="Hogar">Hogar</option>
              <option value="Compras">Compras</option>
            </select>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs text-zinc-400 hover:text-zinc-200">Cancelar</button>
            <button type="submit" className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 px-4 py-2 rounded-lg text-xs font-medium">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}