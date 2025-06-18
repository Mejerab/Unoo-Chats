import { useForm } from "react-hook-form";
import { BsThreeDots } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import useGetUser from "../../hooks/useGetUser";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useLocation } from "react-router";
import moment from "moment/moment";
import useFindUser from "../../hooks/useFindUser";
import Chats from "./Chats";
import { RxCross2 } from "react-icons/rx";
import useHostingUrl from "../../hooks/useHostingUrl";
import Edit from "./options/Edit";
import Delete from "./options/Delete";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseSocket from "../../hooks/userSocket";

const Inbox = () => {
    const { loading, user, setLoading } = useContext(AuthContext);
    const socket = UseSocket();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const hostingURL = useHostingUrl();
    const {
        register,
        handleSubmit,
        reset
    } = useForm();
    const getUser = useGetUser();
    const [inputImage, setInputImage] = useState(null);
    const [load, setLoad] = useState(false);
    const image = document.getElementById('image');
    useEffect(() => {
        socket.on('updatedChats', (data) => {
            const msg = document.getElementById(data.chat_id);
            msg.innerText = data.text;
            msg.classList.add('mt-7')
            const div = document.createElement('div');
            div.innerText = 'Edited';
            div.classList = `text-white absolute -top-6 left-0`;
            msg.appendChild(div);
        })
        return () => {
            socket.off('updatedChats')
        }
    }, [])
    useEffect(() => {
        socket.on('chatDelete', (data) => {
            if (data.image === null) {
                const image = document.getElementById(`image_${data.chat_id}`);
                image.innerHTML = `<p className='text-gray-300 font-semibold italic p-6'>Chat deleted by user</p>`;
            }
            if (data.text === '') {
                const msg = document.getElementById(data.chat_id);
                const editButton = document.getElementById(`edit_${data.chat_id}`);
                const deleteButton = document.getElementById(`delete_${data.chat_id}`);
                msg.innerText = 'Chat deleted by user';
                msg.classList = `text-gray-300 font-semibold italic p-3`;
                editButton.classList = 'hidden';
                deleteButton.classList = 'hidden';
            }
        })
        return () => {
            socket.off('chatDeleted');
        }
    }, [])
    image?.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const render = new FileReader();
            render.onload = (e) => {
                setInputImage(e.target.result)
                document.getElementById('text').focus();
            }
            render.readAsDataURL(file);
        }
    })
    const handleText = async (data) => {
        if (data.text || data?.image?.length) {
            setLoad(true);
            const textInfo = {
                userUid: user?.uid,
                text: data.text,
                time: moment().format('LLL'),
                source: location.pathname.includes('/e/unoo') ? `unoo` : [location.pathname.slice(9), user.uid].sort().join('_')
            }
            if (inputImage) {
                if (data.image[0].type === 'image/jpeg' || data.image[0].type === 'image/png' || data.image[0].type === 'image/jpg') {
                    const imageData = { image: data.image[0] };
                    const imageRes = await axiosPublic.post(hostingURL, imageData, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }, withCredentials: false
                    })
                    textInfo.image = imageRes.data.data.display_url;
                }
            }
            if (textInfo.text || textInfo.image) {
                socket.emit('chats', textInfo)
                setInputImage(null);
                reset();
                setLoad(false);
            }
        }
    }
    const { data: databaseChats, isLoading, refetch } = useQuery({
        queryKey: ['chats'],
        enabled: !loading && !!getUser?._id,
        queryFn: async () => {
            let path;
            if (location.pathname.slice(9).includes('unoo')) {
                path = 'unoo';
            }
            else {
                path = [location.pathname.slice(9), user?.uid].sort().join('_');
            }
            const res = await axiosSecure.get(`/chats/source/${path}?email=${user.email}`);
            return res.data;
        }
    })
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (loading || isLoading) {
            <div className="flex justify-center items-center w-full min-h-screen"><span className="loading loading-spinner text-[#8b5cf6] loading-xl"></span></div>
        }
        refetch();
    }, [loading, isLoading, refetch, location.pathname, databaseChats, messages])
    useEffect(() => {
        socket.on('chats', (msg) => {
            const path = location.pathname.slice(9);
            if (msg.source === 'unoo' && path === 'unoo') {
                setMessages((prev) => [...prev, msg]);
            }
            else if (msg.source === [path, user?.uid].sort().join('_')) {
                setMessages((prev) => [...prev, msg])
            }
        })
        return () => {
            socket.off('chats');
        }
    }, [user, location.pathname, setLoading])
    useEffect(() => {
        const chatBox = document.getElementById('container');
        chatBox.scrollTo({
            top: chatBox.scrollHeight,
            behavior: "smooth"
        })
    }, [messages, loading, isLoading, refetch])
    useEffect(() => {
        setMessages([]);
    }, [databaseChats?.length])
    const findUser = useFindUser(location.pathname.slice(9));
    useEffect(() => {
        socket.on('userOnline', (id) => {
            const container = document.getElementById(`in_${id}`);
            if (container) {
                const exist = document.getElementById(`onn_${id}`)
                if (!exist) {
                    const div = document.createElement('div');
                    div.id = `onn_${id}`;
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
            const element = document.getElementById(`onn_${id}`);
            if (element) {
                element.classList = ``;
            }
        })
        return () => {
            socket.off('userOffline');
        }
    }, [])
    return (
        <div className="col-span-4 flex flex-col h-full relative">
            <div className="w-full h-[55px] flex justify-between items-center p-6 px-3 bg-[#00000033] absolute top-0 backdrop-blur-xs z-40">
                {
                    findUser ?
                        <div className=" flex gap-x-4 items-center">
                            <div id={`in_${findUser.uid}`} className="relative">
                                <img className="w-10 h-10 rounded-full indicator object-cover" src={findUser?.photo ? findUser.photo : 'nothing'} alt="" />
                                {findUser.online ? <div id={`onn_${findUser.uid}`} className="w-[12px] h-[12px] rounded-full bg-green-400 border-2 border-white absolute bottom-0.5 right-0 z-30"></div> : ''}
                            </div>
                            <div className="mt-2">
                                <h4 className="font-medium leading-[15px]">{findUser?.name}</h4>
                                <p className="text-gray-400">{findUser.name === 'Unoo' ? 'Group Chat' : findUser.lastOnline ? moment(findUser.lastOnline).fromNow(): 'Online'}</p>
                            </div>
                        </div> :
                        <span className="loading loading-spinner text-[#8b5cf6] loading-xl"></span>
                }
                <button className="text-xl text-[#8b5cf6] cursor-pointer"><BsThreeDots /></button>
            </div>
            <div className="bg-[url(https://i.ibb.co.com/Q7zbr52c/imggg.png)] w-full">
                <div className="h-full w-full bg-[#00000099]">
                    <div id="container" className="px-4 pt-16 h-[84.3vh] space-y-3 pb-4 flex-1 overflow-y-scroll overflow-x-hidden tra">
                        {
                            isLoading ?
                                <div className="flex justify-center items-center w-full min-h-[70vh]"><span className="loading loading-spinner text-[#8b5cf6] loading-xl"></span></div> :
                                getUser && databaseChats?.map(chat =>
                                    <div className={`flex group ${chat.userUid === getUser.uid ? 'flex-row-reverse' : 'flex-row'} items-center`} key={chat._id}>
                                        <Chats chat={chat} />
                                        {chat.userUid === getUser.uid ? <div className='flex-1 ml-auto mr-4 invisible opacity-0 group-hover:opacity-100 group-hover:visible'>
                                            <div className={`w-fit ml-auto space-x-1 flex ${chat.edited && 'mt-7'}`}>
                                                {chat.text ? <Edit chat={chat} user={user} /> : ''}
                                                {chat.deleted ? '' : <Delete chat={chat} user={user} />}
                                            </div>
                                        </div> : ''}
                                    </div>
                                )
                        }
                        {
                            getUser && messages ?
                                messages?.map((chat, idx) =>
                                    <div className={`flex group ${chat.userUid === getUser.uid ? 'flex-row-reverse' : 'flex-row'} items-center`} key={idx}>
                                        <Chats chat={chat} />
                                        {chat.userUid === getUser.uid ? <div className='flex-1 ml-auto mr-4 invisible opacity-0 group-hover:opacity-100 group-hover:visible'>
                                            <div className="w-fit ml-auto space-x-1 flex">
                                                {chat.text ? <Edit chat={chat} /> : ''}
                                                {chat?.deleted ? '' : <Delete chat={chat} />}
                                            </div>
                                        </div> : ''}
                                    </div>
                                ) : ''
                        }
                    </div>
                </div>
            </div>
            <div className="relative w-full h-full">
                {
                    inputImage ?
                        <div className="absolute bottom-0 left-0 w-full z-40 bg-[#00000099]">
                            <div className="relative w-fit">
                                <img className="w-fit m-3 max-w-[150px] !max-h-[150px] object-cover rounded-lg border-2 border-[#8b5cf6]" src={inputImage} alt="" />
                                <button className="cursor-pointer absolute -top-1.5 right-1.5 p-0.5 rounded-full bg-[#8b5cf6] text-slate-900 hover:bg-slate-900 hover:text-[#8b5cf6] transition-colors" onClick={() => setInputImage(null)}><RxCross2 /></button>
                            </div>
                        </div>
                        : ''
                }
            </div>
            <form autoComplete="off" onSubmit={handleSubmit(handleText)} className="z-40 h-[46px] bg-[#060911] relative">
                <input {...register('text')} autoFocus id="text" name="text" type="text" className="input w-[99.8%] focus:outline-none h-[45px] bg-transparent border border-[#8b5cf6] text-white placeholder:text-[#ffffff99] pr-12" placeholder="Aa" />
                <input {...register('image')} type="file" id="image" accept="image/*" className="hidden" />
                <label htmlFor="image" className="cursor-pointer z-40"><svg className="absolute bottom-3 right-12 z-40" aria-label="Add Photo or Video" fill="#8b5cf6" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Add Photo or Video</title><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="#8b5cf6" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="#8b5cf6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg></label>
                {load ? <span className="loading loading-spinner text-[#8b5cf6] absolute bottom-2 right-3 loading-lg"></span> :
                    <button className="z-40 cursor-pointer absolute bottom-4 right-3"><IoSend className="text-[#8b5cf6] text-xl -rotate-45" /></button>}
            </form>
        </div>
    );
};

export default Inbox;