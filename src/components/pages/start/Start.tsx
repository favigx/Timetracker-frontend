import { useState, useEffect } from 'react';
import Timer from '../../Timer';
import Task from '../../interface/Interface';
import SessionData from '../../interface/SessionData';


function Start() {
    const [newTask, setNewTask] = useState<Task>({
        taskName: "",
        comment: "",
        totalTime: null
    });

    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/tasks")
            .then(res => res.json())
            .then(data => setTasks(data));
    });

    const saveTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch("http://localhost:8080/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...newTask })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Kunde inte spara uppgift!");
                }
                setNewTask({ ...newTask, taskName: "" });
            })
            .catch(error => {
                console.error("Error saving task:", error);
            });
    };

    const selectTask = (task: Task) => {
        setSelectedTask(task);
    };

    const goBack = () => {
        setSelectedTask(null);
    };
    
    const onStopTimer = (sessionData: SessionData) => {
        const { startTime, stopTime, sessionDate, totalTime} = sessionData;
    
    
        fetch(`http://localhost:8080/tasksession/${selectedTask?.taskName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                startTime: startTime,
                stopTime: stopTime,
                sessionDate: sessionDate,
                time: totalTime,
                taskName: selectedTask?.taskName
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunde inte skapa en ny session!");
            }
        })
        .catch(error => {
            console.error("Error creating session:", error);
        });
    
    
        fetch(`http://localhost:8080/tasktime/${selectedTask?.taskName}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                totalTime: totalTime
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunde inte spara tiden!");
            }
        })
        .catch(error => {
            console.error("Error saving time:", error);
        });
    };

    return ( 
        <div className='body'>
          
            {!selectedTask ? (
                <div>
                    <form onSubmit={saveTask}>
                        <input className="inputForm" type="text" value={newTask.taskName} onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}></input>
                        <button type="submit">Skapa uppgift</button>
                    </form>
                    <div>
                        <h2>Uppgifter</h2>
                        {tasks.map((task: Task) =>(
                            <div key={task.taskName}>
                                <button onClick={() => selectTask(task)}>{task.taskName}</button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <h1>{selectedTask.taskName}</h1>
                    </div>
                    <Timer
                        onStart={() => {}}
                        onStop={onStopTimer}
                    />
                    <button onClick={goBack}>Gå tillbaka till alla uppgifter</button>
                </div>
            )}
        </div>
    );
}

export default Start;