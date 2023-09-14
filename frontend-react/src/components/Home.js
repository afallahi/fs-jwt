import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate('/landingpage');
    }

    return (
        <section>
            <h1>Home</h1><br />
            <p>You are logged in!</p>

            <div className="flexGrow">
                <button onClick={logout}>Log Out</button>
            </div>
        </section>
        
    )
}

export default Home;