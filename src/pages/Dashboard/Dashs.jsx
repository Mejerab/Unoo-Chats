import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { NavLink } from "react-router";
import "tippy.js/dist/tippy.css";
import UseSocket from "../../hooks/userSocket";
import moment from "moment";

const Dashs = () => {
    const axiosPublic = useAxiosPublic();
    const socket = UseSocket();
    const { user, loading } = useContext(AuthContext);
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })
    useEffect(() => {
        if (isLoading) {
            <div className="flex justify-center items-center w-full min-h-screen"><span className="loading loading-spinner text-[#8b5cf6] loading-xl"></span></div>
        }
    }, [isLoading])
    const friends = users?.filter(use => use?.email !== user?.email);
    useEffect(() => {
        socket.on('userOnline', (id) => {
            const container = document.getElementById(`line_${id}`);
            if (container) {
                const exist = document.getElementById(`on_${id}`)
                if (!exist) {
                    const div = document.createElement('div');
                    div.id = `on_${id}`;
                    div.classList = 'w-[11px] h-[11px] border-2 border-white rounded-full bg-green-400 absolute bottom-0.5 right-0';
                    container.appendChild(div);
                }
            }
        })
        return () => {
            socket.off('userOnline');
        }
    }, [])
    useEffect(() => {
        socket.on('userOffline', (id) => {
            const element = document.getElementById(`on_${id}`);
            if (element) {
                element.classList = ``;
            }
        })
        return () => {
            socket.off('userOffline');
        }
    }, [])
    return (
        <div className="h-full bg-[#00000022] overflow-y-scroll pt-6 p-3 space-y-4">
            <NavLink to='/chats/e/unoo' className="btn justify-start gap-x-4 border-2 focus:bg-[#8b5cf6] hover:bg-[#8b5cf6] tra border-[#8b5cf6] text-white bg-transparent rounded-xl h-[55px] w-full">
                <img className="w-10 h-10 rounded-full object-cover" src="https://i.ibb.co/1JtW839p/eid5.jpg" alt="" />
                <div>
                    <h5>Unoo</h5>
                </div>
            </NavLink>
            {
                friends?.map(friend =>
                    <NavLink to={`/chats/e/${friend.uid}`} key={friend._id} className="btn justify-start gap-x-4 border-2 focus:bg-[#8b5cf6] hover:bg-[#8b5cf6] tra border-[#8b5cf6] text-white bg-transparent rounded-xl h-[55px] w-full">
                        {
                            friend &&
                            <div id={`line_${friend.uid}`} className="relative">
                                <img className="w-10 h-10 rounded-full object-cover" src={friend.photo} alt="" />
                                {friend?.online ? <div id={`on_${friend.uid}`} className="w-[11px] h-[11px] border-2 border-white rounded-full bg-green-400 absolute bottom-0.5 right-0"></div> : null}
                            </div>
                        }
                        <div className="text-left">
                            <h5>{friend.name}</h5>
                            <p className="text-gray-400 text-xs font-normal">{friend.name === 'Unoo' ? 'Group Chat' : friend.lastOnline ? moment(friend.lastOnline).fromNow() : 'Online'}</p>
                        </div>
                    </NavLink>
                )
            }
            <button onClick={async () => {
                const re = await axiosPublic.delete('/chats');
                console.log(re.data);
            }}>Delete</button>
        </div>
    );
};

export default Dashs;