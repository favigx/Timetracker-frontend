import LogoutButton from "../pages/login/Logout";
import LogoutAdminButton from "../pages/admin/LogoutAdmin";

interface Props {
    setPage: ((page: string) => void);
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
    isLoggedInAdmin: boolean;
    setIsLoggedInAdmin: (loggedInAdmin: boolean) => void;
    
}
    
function Meny(props: Props) {
    
    return (
        <div className="header">
            {!props.isLoggedIn && !props.isLoggedInAdmin && (
                <>
                    <button className='button' onClick={() => props.setPage("register")}>Registrera dig</button>
                    <button className='button' onClick={() => props.setPage("admin")}>Admin</button>
                    <button className='button' onClick={() => props.setPage("login")}>Logga in</button>
                </>
            )}
            {props.isLoggedIn && !props.isLoggedInAdmin && (
                <>
                    <button className='button' onClick={() => props.setPage("start")}>Start</button>
                    <button className='button' onClick={() => props.setPage("statistics")}>Statistik</button>
                    <LogoutButton setIsLoggedIn={props.setIsLoggedIn} setPage={props.setPage} />
                </>
            )}
            {props.isLoggedInAdmin && (
                <>
                    <LogoutAdminButton setIsLoggedInAdmin={props.setIsLoggedInAdmin} setPage={props.setPage} />
                </>
            )}
        </div>
    );
}

export default Meny;