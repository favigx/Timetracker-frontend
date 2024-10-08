import { useState, useEffect } from 'react';
import Timer from '../../Timer';
import Task from '../../interface/Interface';
import SessionData from '../../interface/SessionData';
import { jwtDecode } from "jwt-decode";



function Start() {
    const [newTask, setNewTask] = useState<Task>({
        id: "",
        taskName: "",
        comment: "",
        totalTime: null
        
    });

    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {

        const token = localStorage.getItem('token') || '';
        const decodedToken = jwtDecode(token);
        const id = decodedToken.sub;
  
            fetch(`https://goldfish-app-5o3ju.ondigitalocean.app/tasksforuser/${id}`,  {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setTasks(data));
        
    }, []);

    const saveTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('token') || '';
    const decodedToken = jwtDecode(token);
    const id = decodedToken.sub;


    fetch(`https://goldfish-app-5o3ju.ondigitalocean.app/task/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...newTask, id })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Kunde inte spara uppgift!");
        }
        setTasks([...tasks, newTask]);
        setNewTask({ ...newTask, taskName: "" });
        setSelectedTask(() => newTask);
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

    const deleteTask = (id: string) => {
        
        fetch(`https://goldfish-app-5o3ju.ondigitalocean.app/task/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunde inte ta bort uppgiften!");
            }
            setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => {
            console.error("Error deleting task:", error);
        });
    };
    
    const onStopTimer = (sessionData: SessionData) => {
        const { startTime, stopTime, sessionDate, totalTime} = sessionData;

        console.log("Selected Task:", selectedTask);

        const token = localStorage.getItem('token') || '';
    
        fetch(`https://goldfish-app-5o3ju.ondigitalocean.app/tasksession/${selectedTask?.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
    
    
        fetch(`https://goldfish-app-5o3ju.ondigitalocean.app/tasktime/${selectedTask?.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
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
                                <button onClick={() => deleteTask(task.id)}>Ta bort</button>
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