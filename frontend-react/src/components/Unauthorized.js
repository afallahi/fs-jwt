import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <section>
            <h1>Unauthorized</h1>
            <div className="flexGrow">
                <button onClick={goToLogin}>Login</button>
            </div>
        </section>
    )
}

export default Unauthorized;