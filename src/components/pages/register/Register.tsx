import { useState} from 'react';

interface User{
    username: string;
    password: string;
    name: string;
    email: string;
}

function Register() {

    const [newUser, setNewUser] = useState<User>({
        username: "",
        password: "",
        name: "",
        email: ""
    });

    const saveUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch("http://localhost:8080/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...newUser })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Kunde inte spara användare!");
                }
                setNewUser({ ...newUser});
            })
            .catch(error => {
                console.error("Error saving task:", error);
            });
    };


    return ( 
        <div className="register">
           <h2>Registrera dig</h2>
           <form onSubmit={saveUser}>
                        <input className="inputForm" type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}></input>
                        <input className="inputForm" type="text" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}></input>
                        <input className="inputForm" type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}></input>
                        <input className="inputForm" type="text" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}></input>
                        <button type="submit">Registrera</button>
                    </form>
        </div>
     );
}

export default Register;