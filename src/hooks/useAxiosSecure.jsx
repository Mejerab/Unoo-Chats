import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: 
    // 'https://unoo-chats-server.onrender.com'
    'http://localhost:5000'
    ,
    withCredentials: true
})
const useAxiosSecure = () => {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            return res;
        }, error=>{
            console.log('Error in interceptor', error);
            if (error.response.status === 401 || error.response.status === 403) {
                logout()
                .then(()=>navigate('/lettingin?login'))
                .catch(err=>console.log(err))
            }
        })
    }, [logout, navigate])
    return axiosSecure;
};

export default useAxiosSecure;