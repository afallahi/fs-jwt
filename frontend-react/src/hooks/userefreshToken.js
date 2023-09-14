import useAuth from "./useAuth";
import axios from '../api/axios';

const REFRESH_URL = '/api/v1/auth/refresh-token';

const useRefreshToken = () => {

    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post(REFRESH_URL,
            JSON.stringify({ refresh_token: auth.refreshToken }), {
                headers: {'Content-Type': 'application/json'}
            }
        );


        setAuth(prev => {
            return { ...prev, accessToken: response.data.accessToken }
        })
        return response.data.accessToken;

    }

    return refresh;

}

export default useRefreshToken;