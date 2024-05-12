import { useState, useEffect } from 'react';
import SessionData from '../../interface/SessionData';
import { formatTime } from './formatTime';

function Sessions({ taskId, taskName }: { taskId: string, taskName: string }) {
    const [sessions, setSessions] = useState<SessionData[]>([]);

    useEffect(() => {
        fetch (`https://goldfish-app-5o3ju.ondigitalocean.app/session/${taskId}`)
        .then(res => res.json())
        .then(data => setSessions(data));
    }, [taskId]);

    const groupSessionsByWeekAndDay = (sessions: SessionData[]): Map<number, { sessions: SessionData[], totalWeekTime: number }> => {
        const groupedSessions = new Map<number, { sessions: SessionData[], totalWeekTime: number }>();
        sessions.forEach(session => {
            const sessionDate = new Date(session.sessionDate);
            const weekNumber = getWeekNumber(sessionDate);
            if (!groupedSessions.has(weekNumber)) {
                groupedSessions.set(weekNumber, { sessions: [], totalWeekTime: 0 });
            }
            const weekData = groupedSessions.get(weekNumber);
            if (weekData) {
        
                if (!weekData.sessions.some(s => s.startTime === session.startTime)) {
                    weekData.sessions.push(session);
                    weekData.totalWeekTime += session.time;
                }
            }
        });
        return groupedSessions;
    };
    const getWeekNumber = (date: Date): number => {
        const yearStart = new Date(date.getFullYear(), 0, 1); 
        const weekStart = new Date(yearStart); 
        const firstDayOffset = yearStart.getDay(); 
        const daysToMonday = (firstDayOffset === 0 ? 6 : firstDayOffset - 1); 
        weekStart.setDate(yearStart.getDate() + daysToMonday); 
    
        const diffInDays = Math.floor((date.getTime() - weekStart.getTime()) / (1000 * 3600 * 24)); 
        const weekNumber = Math.ceil((diffInDays + 1) / 7);
    
        return weekNumber;
    };


    const groupedSessions = groupSessionsByWeekAndDay(sessions);

    return ( 
        <div className='body'>
            <div className='statisticMessage'>
                <h2>Statistik för uppgift: {taskName}</h2>
                <div>
                    {[...groupedSessions.entries()].map(([weekNumber, { sessions: weekSessions, totalWeekTime }]) => (
                        <div key={weekNumber}>
                            <h2>Vecka {weekNumber}</h2>
                            <p>Din totala tid den här veckan är: {formatTime(totalWeekTime)}</p>
                            {[...weekSessions.map(session => session.sessionDate)].map((sessionDate, index) => (
                                <div key={index}>
                                    <h3>{sessionDate}</h3>
                                    {weekSessions.filter(session => session.sessionDate === sessionDate).map((session: SessionData) => (
                                        <div key={session.startTime}>
                                            <p>Starttid: {session.startTime}</p>
                                            <p>Sluttid: {session.stopTime}</p>
                                            <p>Total tid för session: {formatTime(session.time)}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Sessions;