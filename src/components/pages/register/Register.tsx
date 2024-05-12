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

        fetch("https://goldfish-app-5o3ju.ondigitalocean.app/user", {
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
           <form onSubmit={saveUser}>
                        <label>
                            Användarnamn<br />
                            <input className="inputForm" type="text" required value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}></input>
                        </label><br /><br />
                        <label>
                            Lösenord<br />
                            <input className="inputForm" type="password" required value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}></input>
                        </label><br /><br />
                        <label>
                            Förnamn<br />
                            <input className="inputForm" type="text" required value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}></input>
                        </label><br /><br />
                        <label>
                            Mail<br />
                            <input className="inputForm" type="email" required value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}></input>
                        </label><br /><br />
                        <button type="submit">Registrera dig!</button>
                    </form>
        </div>
     );
}

export default Register;