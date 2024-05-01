import { useState, useEffect } from 'react'

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

    const [selectedTask, setSelectedTask] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/tasks")
        .then(res => res.json())
        .then(data => setTasks(data));
    })

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
    

    return ( 
        <div className='body'>
            <div className='welcomeMessage'>
                <p>Timetracker</p>
            </div>
            <div>
                <form onSubmit={saveTask}>
                <input className="inputForm" type="text" value={newTask.taskName} onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}></input>
                <button type="submit">Skapa uppgift</button>
                </form>
            </div>
            <div>
                <h2>Uppgifter</h2>
                {tasks.map((task: Task) =>(
                    <div key={task.taskName}>
                        <button onClick={() =>{
                            setSelectedTask(task.taskName);
                            console.log(task.taskName);
                        }}>{task.taskName}</button></div>
                ))}
            </div>
        </div>
    );
}

export default Start;