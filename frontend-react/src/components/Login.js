import { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { Link, useLocation, useNavigate} from 'react-router-dom';

const LOGIN_URL = '/api/v1/auth/login';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [user, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username: user, password: password}), {
                    headers: {'Content-Type': 'application/json'}
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.access_token;
            const refreshToken = response?.data?.refresh_token;
            setAuth({user, accessToken, refreshToken});
            setUser('');
            setPassword('');
            navigate(from, {replace: true});
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 400) {
                setErrMsg('Invalid Credentials')
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized Request')
            } else {
                setErrMsg('Login Failed')
            }
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor='password'>Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Login</button>
            </form>
            <p>
                Don't have Account?<br />
                <span className='line'>
                    <Link to="/register">Register</Link>
                </span>
            </p>
        </section>    
)
}

export default Login;