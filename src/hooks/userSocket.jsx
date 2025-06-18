import { useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../Provider/AuthProvider";

const UseSocket = () => {
    const { user } = useContext(AuthContext);
    const socket = io(
        // 'https://unoo-chats-server.onrender.com'
        'http://localhost:5000'
        , {
        query: { uid: user?.uid },
         transportOptions: { polling: { withCredentials: true } }
    })
    return socket;
};

export default UseSocket;