import { useState, useEffect } from 'react';
import Timer from '../../Timer';

interface Task {
    taskName: string;
    comment: string;
    totalTime: number | null;
}

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
                        onStop={() => {}}
                    />
                    <button onClick={goBack}>Gå tillbaka till alla uppgifter</button>
                </div>
            )}
        </div>
    );
}

export default Start;