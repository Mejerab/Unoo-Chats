import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, Outlet, useNavigate } from "react-router";
import Dashs from "./Dashs";
import Inbox from "./Inbox";
import Drawer from '@mui/material/Drawer';
import { IoPencil } from "react-icons/io5";
import useGetUser from "../../hooks/useGetUser";
import UseSocket from "../../hooks/userSocket";

const Dashboard = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const getUser = useGetUser();
    const [open, setOpen] = useState(false);
    const socket = UseSocket();
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div className="w-full font text-white bg-slate-900 overflow-hidden h-screen">
            <div className="text-white backdrop-blur-3xl py-1 flex justify-between pr-6 items-center relative z-[100]">
                <Link to='/'><img className="w-44" src="https://i.ibb.co.com/dJK6bDd6/logo.png" alt="" /></Link>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border border-[#8b5cf6]">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={getUser?.photo} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content z-50 bg-[#00000099] border border-[#8b5cf6] rounded-box relative mt-3 w-48 p-2 shadow">
                            <Drawer open={open} onClose={toggleDrawer(false)}>
                                <div className="w-[300px] !bg-slate-900 text-white flex flex-col justify-center items-center h-full font-medium">
                                    <Link to='/profile' className="relative group cursor-pointer">
                                        <img src={getUser?.photo} className="rounded-full w-40 h-40 object-cover border-4 border-[#8b5cf6]" alt="" />
                                        <IoPencil className="text-[35px] opacity-0 invisible group-hover:opacity-100 group-hover:visible tra absolute -top-1 right-0 bg-white p-2 rounded-full text-[#8b5cf6]" />
                                    </Link>
                                    <h4 className="text-xl mt-4">{getUser?.name}</h4>
                                    <p className="text-[#676767]">{getUser?.email}</p>
                                </div>
                            </Drawer>
                            <li><button onClick={toggleDrawer(true)} className="hover:bg-[#8b5cf6]">Profile</button></li>
                            <li><button className="hover:bg-[#8b5cf6]">Settings</button></li>
                            <li><button className="hover:bg-[#8b5cf6]" onClick={() => { socket.emit('logoutUser', user.uid); logout(); navigate('/lettingin?login') }}>Logout</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-5 w-full">
                <Dashs />
                {
                    location.pathname === '/chats' &&
                    <div className="bg-black w-full col-span-4 flex justify-center items-center flex-col gap-y-4 h-[91.5vh]">
                        <img src="https://i.ibb.co/1G8YXhVD/UNO.jpg" className="rounded-xl w-16 rotate-12 border-white border-8" alt="" />
                        <p className="text-[#8b5cf6] text-xl font-medium">Let's start chatting.</p>
                    </div>
                }
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;