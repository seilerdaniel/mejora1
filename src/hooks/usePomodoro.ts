import { useState, useEffect, useRef } from 'react';

export type PomodoroMode = 25 | 50;

interface UsePomodoroProps {
  onCompleteSession?: () => void;
}

export function usePomodoro({ onCompleteSession }: UsePomodoroProps) {
  const [mode, setMode] = useState<PomodoroMode>(50);
  const [timeLeft, setTimeLeft] = useState<number>(50 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isZen, setIsZen] = useState<boolean>(false);
  const [holdProgress, setHoldProgress] = useState<number>(0);

  // Referencias para intervalos y Wake Lock
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Usamos any aquí porque los tipos de WakeLock no siempre están en los default types de TS
  const wakeLockRef = useRef<any>(null);

  // 1. Manejo del Temporizador Principal
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (onCompleteSession) onCompleteSession();
    }
    
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onCompleteSession]);

  // 2. Manejo de Wake Lock (Mantener pantalla encendida en Modo Zen)
  useEffect(() => {
    const requestWakeLock = async () => {
      if (isZen && typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
        try {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        } catch (err) {
          console.error('Error con Wake Lock:', err);
        }
      } else if (!isZen && wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    };
    
    requestWakeLock();

    // Cleanup por si el componente se desmonta mientras está en Zen
    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(console.error);
        wakeLockRef.current = null;
      }
    };
  }, [isZen]);

  // 3. Funciones de Control
  const toggleTimer = () => setIsRunning((prev) => !prev);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode * 60);
  };

  const handleModeChange = (newMode: PomodoroMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode * 60);
  };

  const enterZenMode = () => setIsZen(true);

  // 4. Lógica del botón "Mantener presionado para salir"
  const startHoldExit = () => {
    let current = 0;
    holdIntervalRef.current = setInterval(() => {
      current += 10;
      setHoldProgress(current);
      
      if (current >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setIsZen(false);
        setHoldProgress(0);
      }
    }, 20);
  };

  const cancelHoldExit = () => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setHoldProgress(0);
  };

  // 5. Utilidad de formato
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Retornamos todo lo que el componente necesita para renderizar
  return {
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
  };
}