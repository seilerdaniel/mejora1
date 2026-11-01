'use client';

import React from 'react';
import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';
import { usePomodoro } from '@/hooks/usePomodoro';

interface PomodoroTimerProps {
  onCompleteSession?: () => void;
}

export function PomodoroTimer({ onCompleteSession }: PomodoroTimerProps) {
  // Toda la lógica viene de nuestro custom hook
  const {
    mode,
    timeLeft,
    isRunning,
    isZen,
    holdProgress,
    formatTime,
    toggleTimer,
    resetTimer,
    handleModeChange,
    enterZenMode,
    startHoldExit,
    cancelHoldExit,
  } = usePomodoro({ onCompleteSession });

  return (
    <>
      {/* TARJETA COMPACTA EN DASHBOARD */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-5 shadow-lg flex flex-col items-center justify-between">
        
        {/* Cabecera y Selector de Modo */}
        <div className="flex items-center justify-between w-full mb-3">
          <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
            Trabajo Enfocado
          </span>
          <div className="flex gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-800/60">
            <button
              onClick={() => handleModeChange(25)}
              className={`px-2.5 py-0.5 text-xs rounded-md transition-colors ${
                mode === 25 
                  ? 'bg-zinc-800 text-zinc-100 font-medium' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              25m
            </button>
            <button
              onClick={() => handleModeChange(50)}
              className={`px-2.5 py-0.5 text-xs rounded-md transition-colors ${
                mode === 50 
                  ? 'bg-zinc-800 text-zinc-100 font-medium' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              50m
            </button>
          </div>
        </div>

        {/* Display del Tiempo */}
        <div className="font-mono text-5xl font-light tracking-tight text-zinc-100 my-2">
          {formatTime(timeLeft)}
        </div>

        {/* Botones de Control (Con feedback táctil) */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={toggleTimer}
            className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 p-2.5 rounded-lg transition-all hover:scale-105 active:scale-95"
            title={isRunning ? 'Pausar' : 'Iniciar'}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
          
          <button
            onClick={resetTimer}
            className="bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 p-2.5 rounded-lg border border-zinc-700/50 transition-all hover:scale-105 active:scale-95"
            title="Reiniciar"
          >
            <RotateCcw size={18} />
          </button>
          
          <button
            onClick={enterZenMode}
            className="bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 p-2.5 rounded-lg border border-zinc-700/50 transition-all hover:scale-105 active:scale-95"
            title="Activar Modo Zen"
          >
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* MODAL MODO ZEN PANTALLA COMPLETA */}
      {isZen && (
        <div className="fixed inset-0 z-50 bg-zinc-950 flex flex-col items-center justify-center select-none p-6">
          <span className="text-xs tracking-widest text-zinc-500 uppercase font-medium mb-4">
            Proyecto Personal — Modo Zen
          </span>

          <div className="font-mono text-7xl md:text-9xl text-zinc-100 font-extralight tracking-tight my-8">
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={toggleTimer}
              className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 px-6 py-3 rounded-xl font-medium text-sm transition-all hover:scale-105 active:scale-95"
            >
              {isRunning ? 'Pausar' : 'Continuar'}
            </button>
          </div>

          {/* Botón Mantener Presionado para Salir */}
          <div className="relative">
            <button
              onMouseDown={startHoldExit}
              onMouseUp={cancelHoldExit}
              onMouseLeave={cancelHoldExit}
              onTouchStart={startHoldExit}
              onTouchEnd={cancelHoldExit}
              className="relative overflow-hidden text-xs text-zinc-500 hover:text-zinc-300 transition-colors py-2.5 px-6 border border-zinc-800/80 rounded-full"
            >
              <span className="relative z-10">Mantén presionado para salir</span>
              <div
                className="absolute left-0 top-0 bottom-0 bg-zinc-800 transition-all duration-75"
                style={{ width: `${holdProgress}%` }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}