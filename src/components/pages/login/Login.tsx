import { useState } from 'react';

interface Login{
   username: string;
   password: string;
}

interface Props {
    setIsLoggedIn: (loggedIn: boolean) => void;
    setPage: (page: string) => void;
 }

 function Login({ setIsLoggedIn, setPage }: Props) {
    const [newLogin, setNewLogin] = useState<Login>({
       username: "",
       password: ""
    });
    

  const loginUser = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();

   fetch("https://goldfish-app-5o3ju.ondigitalocean.app/loginuser", {
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

       setPage("start");
       
   })
   .catch(error => {
       console.error("Error logging in:", error);
   });
};

    return ( 
        <div className="login">
           <form onSubmit={loginUser}>
           <label>
                Användarnamn<br />
                <input className="inputForm" type="text" required value={newLogin.username} onChange={(e) => setNewLogin({ ...newLogin, username: e.target.value })}></input>
            </label><br /><br />
            <label>
                Lösenord<br />
                <input className="inputForm" type="password" required value={newLogin.password} onChange={(e) => setNewLogin({ ...newLogin, password: e.target.value })}></input>
            </label><br /><br />
           <button type="submit">Logga in</button>
           </form>
        </div>
     );
}

export default Login;