import { useRef, useState, useEffect } from "react";
import axios from './api/axios';

const REGISTER_URL = "/api/v1/auth/register";

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect( () => {
        setValidName(user);
    }, [user])

    useEffect( () => {
        setValidPwd(password)
    }, [password])

    useEffect(() => {
        setErrMsg('');
    }, [user, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({username: user, password: password}),
                {
                    headers: { 'Content-type': 'application/json'},
                }

            );
            setSuccess(true);
            setUser('');
            setPassword('');
        } catch(error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else {
                setErrMsg('Registration Failed');
            }

        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Login</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">
                            Password:
                        </label>
                        <input 
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />

                        <button disabled={!validName || !validPwd ? true : false}>Sign Up</button>
                        <p>
                            Already registered?
                            <br />
                            <span className="line">
                                <a href="#">Login</a>
                            </span>
                        </p>

                    </form>
                </section>
            )}
        </>
    )
}

export default Register;