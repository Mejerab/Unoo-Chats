import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL:
        'https://unoo-chats-server.onrender.com'
        //'http://localhost:5000'
    ,
    withCredentials: true
})
const useAxiosSecure = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    axiosSecure.interceptors.response.use(res => {
        return res;
    }, async (error) => {
        console.log('Error in interceptor', error);
        if (error.response.status === 401 || error.response.status === 403) {
            // console.log('erroring');
            logout()
            .then(()=>navigate('/lettingin?login'))
            .catch(err=>console.log(err))
        }
    })
    return axiosSecure;
};

export default useAxiosSecure;