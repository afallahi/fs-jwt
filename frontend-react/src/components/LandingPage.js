import { Link } from "react-router-dom"

const LandingPage = () => {

    return (
        <section>
            <h1>Links</h1>
            <br />
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>

            <br />
            <p>Protected</p>
            <Link to="/home">Home</Link>

        </section>
    )

}

export default LandingPage;