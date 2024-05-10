

function LogoutButton({ setIsLoggedIn, setPage }: { setIsLoggedIn: (loggedIn: boolean) => void; setPage: (page: string) => void; }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setPage('login');
    
        
        fetch("http://localhost:8080/logout", {
            method: "GET",
            credentials: "same-origin"
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    };

    return (
        <button onClick={handleLogout}>Logga ut</button>
    );
}

export default LogoutButton;