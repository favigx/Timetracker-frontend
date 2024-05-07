import { useState, useEffect } from 'react';
import SessionData from './interface/SessionData';

interface TimerProps {
    onStart: (sessionData: SessionData) => void;
    onStop: (sessionData: SessionData) => void;
}


const Timer = ({ onStart, onStop }: TimerProps) => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [stopped, setStopped] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<string>(''); 
    const [stopTime, setStopTime] = useState<string>(''); 
    const [sessionDate, setSessionDate] = useState<Date>(new Date()); 

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
        const currentDate = new Date();
        const startTimeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setStartTime(startTimeString);
        onStart({
            startTime: startTimeString,
            stopTime,
            sessionDate: sessionDate.toLocaleDateString('sv-SE'), 
            totalTime: time,
            time: 0,
            taskName: ''
        });
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const stopTimer = () => {
        setIsRunning(false);
        const currentDate = new Date();
        const stopTimeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setStopTime(stopTimeString);
        onStop({
            startTime,
            stopTime: stopTimeString,
            sessionDate: currentDate.toLocaleDateString('sv-SE'), 
            totalTime: time,
            time: 0,
            taskName: ''
        });
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