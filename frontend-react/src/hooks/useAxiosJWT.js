import useRefreshToken from "./useRefreshToken";
import useAuth from './useAuth';
import {useEffect} from "react";
import axiosJwt from '../api/axios';


const useAxiosJWT = () => {

    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect( () => {
        const reqIntercept = axiosJwt.interceptors.request.use (
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config;
            }, (error) => Promise.reject(error)
        )

        const resIntercept = axiosJwt.interceptors.response.use(
            response => response, async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosJwt(prevRequest);
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosJwt.interceptors.request.eject(reqIntercept);
            axiosJwt.interceptors.response.eject(resIntercept);
        }

    }, [auth, refresh])

    return axiosJwt;

}

export default useAxiosJWT;