import useRefreshToken from "./useRefreshToken";
import useAuth from './useAuth';
import {useEffect} from "react";
import axiosJwt from '../api/axios';


const useAxiosJWT = () => {

    const { auth, setAuth } = useAuth();
    const refresh = useRefreshToken();

    useEffect( () => {
        const reqIntercept = axiosJwt.interceptors.request.use (
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config;
            }, 
            (error) => Promise.reject(error)
        )

        const resIntercept = axiosJwt.interceptors.response.use(
            (response) => {
                return response 
            }, 
            async (error) => {
                const originalRequest = error?.config;

                if (error.response) {
                    if(error?.response?.status === 401 && originalRequest._retry !== true) {
                        originalRequest._retry = true;

                        try {
                            const newAccessToken = await refresh();
                            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                            return axiosJwt(originalRequest);
                        } catch (err) {
                            if (err.response && err.response.data) {
                                return Promise.reject(err.response.data);
                            }

                            return Promise.reject(err);
                        }
                    }

                    if(error?.response?.status === 403 && error.response.data) {
                        return Promise.reject(error.response.data);
                    }

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