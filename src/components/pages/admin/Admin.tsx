import { useState } from 'react';

interface Admin{
   username: string;
   password: string;
}

interface Props {
    setIsLoggedInAdmin: (loggedInAdmin: boolean) => void;
    setPage: (page: string) => void;
 }

 function Admin({ setIsLoggedInAdmin, setPage }: Props) {
    const [newLoginAdmin, setNewLoginAdmin] = useState<Admin>({
       username: "",
       password: ""
    });
    

  const loginAdmin = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();

   fetch("https://goldfish-app-5o3ju.ondigitalocean.app/loginadmin", {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify({ ...newLoginAdmin })
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

       setIsLoggedInAdmin(true);

       setPage("users");
       
   })
   .catch(error => {
       console.error("Error logging in:", error);
   });
};

    return ( 
        <div className="login">
           <form onSubmit={loginAdmin}>
            <h2>Admin inloggning</h2>
           <label>
                Användarnamn<br />
                <input className="inputForm" type="text" required value={newLoginAdmin.username} onChange={(e) => setNewLoginAdmin({ ...newLoginAdmin, username: e.target.value })}></input>
            </label><br /><br />
            <label>
                Lösenord<br />
                <input className="inputForm" type="password" required value={newLoginAdmin.password} onChange={(e) => setNewLoginAdmin({ ...newLoginAdmin, password: e.target.value })}></input>
            </label><br /><br />
           <button type="submit">Logga in</button>
           </form>
        </div>
     );
}

export default Admin;