import LogoutButton from "../pages/login/Logout";

interface Props {
    setPage: ((page: string) => void);
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
}
    
function Meny(props: Props) {
    
    return ( 
        <div className="header">
            {props.isLoggedIn && (
                <>
                    <button className='button' onClick={() => props.setPage("start")}>Start</button>
                    <button className='button' onClick={() => props.setPage("statistics")}>Statistik</button>
                </>
            )}
            {!props.isLoggedIn && (
                <button className='button' onClick={() => props.setPage("register")}>Registrera dig</button>
            )}
            {props.isLoggedIn ? (
               <LogoutButton setIsLoggedIn={props.setIsLoggedIn} setPage={props.setPage} />
            ) : (
                <button className='button' onClick={() => props.setPage("login")}>Logga in</button>
            )}
        </div>
     );
}

export default Meny;