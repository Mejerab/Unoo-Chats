import { useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../Provider/AuthProvider";

const UseSocket = () => {
    const {user} = useContext(AuthContext);
    const socket = io('http://localhost:5000', {
        query: { uid: user?.uid }
    });
    return socket;
};

export default UseSocket;