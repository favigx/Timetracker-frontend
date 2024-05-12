import { useState, useEffect } from 'react';
import Task from '../../interface/Interface';
import Sessions from './Sessions'; 
import { jwtDecode } from "jwt-decode";
import { formatTime } from './formatTime';

function Statistics() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showTasks, setShowTasks] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem('token') || '';
        const decodedToken = jwtDecode(token);
        const id = decodedToken.sub;
  
            fetch(`https://goldfish-app-5o3ju.ondigitalocean.app/tasksbytime/${id}`,  {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setTasks(data));
        
    }, []);

    const selectTask = (task: Task) => {
        setSelectedTask(task);
        setShowTasks(false); 
    };

    const goBack = () => {
        setSelectedTask(null);
        setShowTasks(true); 
    };

    return ( 
        <div className='body'>
            <div className='statisticMessage'>
                {showTasks ? (
                    <>
                        {tasks.map((task: Task) =>(
                            <div key={task.id}>
                                <button onClick={() => selectTask(task)}>{task.taskName + " " + "total tid: " + (task.totalTime !== null ? formatTime(task.totalTime) : 'Ingen tid')}</button>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <button onClick={goBack}>Gå tillbaka till alla uppgifter</button>
                        <Sessions taskId={selectedTask?.id || ''} taskName={selectedTask?.taskName || ''} />
                    </>
                )}
            </div>
        </div>
    );
}

export default Statistics;