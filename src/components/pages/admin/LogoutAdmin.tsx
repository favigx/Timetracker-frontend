import { jwtDecode } from "jwt-decode";

function LogoutAdminButton({ setIsLoggedInAdmin, setPage }: { setIsLoggedInAdmin: (loggedInAdmin: boolean) => void; setPage: (page: string) => void; }) {
    const handleLogoutAdmin = () => {

        const token = localStorage.getItem('token') || '';
        const decodedToken = jwtDecode(token);
        const id = decodedToken.sub;
        
        localStorage.removeItem('token');
        setIsLoggedInAdmin(false);
        setPage('login');
    
        
        fetch(`https://goldfish-app-5o3ju.ondigitalocean.app/logoutadmin/${id}`, {
            method: "POST", 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to logout");
            }
            console.log("Logout successful");
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    };

    return (
        <button onClick={handleLogoutAdmin}>Logga ut</button>
    );
}

export default LogoutAdminButton;