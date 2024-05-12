import { useState, useEffect } from 'react';
import SessionData from '../../interface/SessionData';
import { formatTime } from './formatTime';

function Sessions({ taskId, taskName }: { taskId: string, taskName: string }) {
    const [sessions, setSessions] = useState<SessionData[]>([]);

    useEffect(() => {
        fetch (`http://localhost:8080/session/${taskId}`)
        .then(res => res.json())
        .then(data => setSessions(data));
    }, [taskId]);

    console.log(taskName);
    

    return ( 
        <div className='body'>
            <div className='statisticMessage'>
                <h2>Statistik för uppgift: {taskName}</h2>
                <div>

                    {sessions.map((session: SessionData) => (
                        <div key={session.startTime}>
                            <p>Starttid: {session.startTime}</p>
                            <p>Sluttid: {session.stopTime}</p>
                            <p>Datum: {session.sessionDate}</p>
                            <p>Tid: {formatTime(session.time)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sessions;