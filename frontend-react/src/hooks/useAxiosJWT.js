import useRefreshToken from "./userefreshToken";
import useAuth from './useAuth';
import {useEffect} from "react";
import axios from '../api/axios';


const useAxiosJWT = () => {

    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect( () => {
        const reqIntercept = axios.interceptors.request.use (
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const resIntercept = axios.interceptors.response.use(
            response => response, async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axios(prevRequest);
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axios.interceptors.request.eject(reqIntercept);
            axios.interceptors.response.eject(resIntercept);
        }

    }, [auth, refresh])

}

export default useAxiosJWT;