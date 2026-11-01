'use client';

import React from 'react';

export function AppHeader() {
  return (
    <header className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl space-y-3 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          
          {/* Isotipo Mejora1 (Triángulo con punta asimétrica) */}
          <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center shadow-inner">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 500 500" 
              className="w-6 h-6 text-white"
            >
              {/* Borde del triángulo - El strokeWidth es alto para que se vea bien a tamaño pequeño */}
              <polygon 
                points="250,100 420,420 80,420" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="24" 
                strokeLinejoin="miter" 
              />
              {/* Punta asimétrica */}
              <polygon 
                points="250,100 345,235 215,265" 
                fill="currentColor" 
              />
            </svg>
          </div>

          <div>
            <h1 className="text-base font-bold tracking-tight text-white font-sans">
              Mejora1
            </h1>
            <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
              Tu sistema personal
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-zinc-800">
        <p className="text-xs text-zinc-300 font-medium italic">
          "La cima empieza con un paso."
        </p>
      </div>
    </header>
  );
}