import { useState, useEffect } from 'react';

interface Login{
   username: string;
   password: string;
}

interface Props {
    setIsLoggedIn: (loggedIn: boolean) => void;
 }

 function Login({ setIsLoggedIn }: Props) {
    const [newLogin, setNewLogin] = useState<Login>({
       username: "",
       password: ""
    });

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();

   fetch("http://localhost:8080/test", {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({ ...newLogin })
   })
   .then(response => {
       if (!response.ok) {
           throw new Error("Kunde inte logga in!");
       }
       return response.text(); 
   })
   .then(token => {
       console.log("Received JWT token:", token);
     
       localStorage.setItem("token", token);

       setIsLoggedIn(true);
       
   })
   .catch(error => {
       console.error("Error logging in:", error);
   });
};

    return ( 
        <div className="login">
           <h2>Logga in</h2>
           <form onSubmit={loginUser}>
           <input className="inputForm" type="text" value={newLogin.username} onChange={(e) => setNewLogin({ ...newLogin, username: e.target.value })}></input>
           <input className="inputForm" type="password" value={newLogin.password} onChange={(e) => setNewLogin({ ...newLogin, password: e.target.value })}></input>
           <button type="submit">Logga in</button>
           </form>
        </div>
     );
}

export default Login;