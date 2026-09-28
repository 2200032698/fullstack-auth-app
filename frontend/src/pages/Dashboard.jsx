import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../services/api";


function Dashboard() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");


    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }


        getUsers(token)
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                setError(error.message);
            });

    }, [navigate]);


    function logout() {

        localStorage.removeItem("token");

        navigate("/login");
    }


    return (
        <div className="dashboard">

            <header>

                <h1>
                    Dashboard
                </h1>

                <button onClick={logout}>
                    Logout
                </button>

            </header>


            <main>

                <h2>
                    Registered Users
                </h2>


                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}


                <div className="users">

                    {users.map(user => (

                        <div
                            className="user-card"
                            key={user.id}
                        >

                            <h3>
                                {user.name}
                            </h3>

                            <p>
                                {user.email}
                            </p>

                        </div>

                    ))}

                </div>

            </main>

        </div>
    );
}


export default Dashboard;