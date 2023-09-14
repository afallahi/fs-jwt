import useAuth from "./useAuth";
import axios from '../api/axios';

const REFRESH_URL = '/api/v1/auth/refresh-token';

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get(REFRESH_URL);

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        })
        return response.data.accessToken;

    }

    return refresh;

}

export default useRefreshToken;