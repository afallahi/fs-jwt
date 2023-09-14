import axios from "../api/axios";
import useAxiosJWT from "../hooks/useAxiosJWT";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


const Users = () => {
    const axiosJwt = useAxiosJWT();
    const [users, setUsers] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect( () => {
        const controller = new AbortController();
        let isMounted = true;

        const getUsers = async () => {
            try {
                const response = await axios.get('/api/v1/user/all', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (error) {
                console.error(error);
                navigate("/login", {state: { from: location }, replace: true})
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2> Users List </h2>

            {users?.length ? (
                    <ul>
                        {users.map( (user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users found</p>
            }
        </article>
    )
}

export default Users;