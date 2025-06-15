import { useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../Provider/AuthProvider";

const UseSocket = () => {
    const {user} = useContext(AuthContext);
    const socket = io('https://unoo-chats-server.vercel.app', {
        withCredentials: true,
        query: { uid: user?.uid }
    });
    return socket;
};

export default UseSocket;