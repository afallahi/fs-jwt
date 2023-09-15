import useAuth from "./useAuth";
import axios from '../api/axios';

const REFRESH_URL = '/api/v1/auth/refresh-token';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const payload = { refresh_token: auth.refreshToken };

        const response = await axios.post(REFRESH_URL,
            JSON.stringify(payload), {
                headers: {'Content-Type': 'application/json'}
            }
        );

        setAuth(prev => {
            return { ...prev, accessToken: response.data.access_token }
        })

        return response.data.access_token;
    }

    return refresh;

}

export default useRefreshToken;