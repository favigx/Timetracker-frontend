import { useEffect, useState } from "react";

interface UserTimeData {
    [key: string]: string;
}

function Users() {
    const [userTime, setUserTime] = useState<UserTimeData>({});
    useEffect(() => {
        fetch("http://localhost:8080/admin/totaltime")
            .then(response => response.json())
            .then(data => {
                setUserTime(data);
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    return (
        <div className="userinfo">
            <h2>Användarinfo</h2>
            {Object.keys(userTime).map(key => (
                <p key={key}>
                    <strong>{key}:</strong> {userTime[key]}
                </p>
            ))}
        </div>
    );
}


export default Users;