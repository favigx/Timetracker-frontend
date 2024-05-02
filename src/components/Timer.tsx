import { useState, useEffect } from 'react'

interface TimerProps {
    onStart: () => void;
    onStop: (time: number) => void;
}

const Timer = ({ onStart, onStop }: TimerProps) => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [stopped, setStopped] = useState<boolean>(false);
    let interval: number | undefined;

    useEffect(() => {
        if (isRunning) {
            interval = window.setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const startTimer = () => {
        setIsRunning(true);
        onStart();
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const stopTimer = () => {
        setIsRunning(false);
        onStop(time);
        setStopped(true);
    };

    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div>
            {stopped ? (
                <p>Bra jobbat! Din tid den här gången blev: {formatTime(time)}</p>
            ) : ( 
                <>
                    <h1>{formatTime(time)}</h1>
                    <button onClick={startTimer}>Start</button>
                    <button onClick={pauseTimer}>Pause</button>
                    <button onClick={stopTimer}>Stop</button>
                </>
            )}
        </div>
    );
};

export default Timer;