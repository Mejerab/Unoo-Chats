import axios from "axios";

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: 
        'https://unoo-chats-server.onrender.com'
        //'http://localhost:5000'
        ,
        withCredentials: true
    })
    return axiosPublic;
};

export default useAxiosPublic;