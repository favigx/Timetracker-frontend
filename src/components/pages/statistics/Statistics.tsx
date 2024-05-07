import { useState, useEffect } from 'react';
import Task from '../../interface/Interface';
import Sessions from './Sessions'; 

function Statistics() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [showTasks, setShowTasks] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/tasksbytime")
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
                            <div key={task.taskName}>
                                <button onClick={() => selectTask(task)}>{task.taskName + " " + "total tid: " + task.totalTime}</button>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <button onClick={goBack}>Gå tillbaka till alla uppgifter</button>
                        <Sessions taskName={selectedTask?.taskName || ''} />
                    </>
                )}
            </div>
        </div>
    );
}

export default Statistics;