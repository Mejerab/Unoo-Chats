import { useState } from "react";
import useGetUser from "../../hooks/useGetUser";
import UserInfo from "./UserInfo";
import { Link } from "react-router";
import { Dialog, DialogPanel } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";

const Chats = ({ chat }) => {
    const [isOpen, setIsOpen] = useState(false);
    const getUser = useGetUser();
    const regex = /^(.*?)(https?:\/\/(?:www\.)?[^\s]+)(.*)$/;
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    })
    return (
        <div className={`flex max-w-3/4 w-fit justify-center gap-x-3 ${chat.userUid === getUser?.uid ? 'ml-auto' : ''} ${chat.edited ? 'items-end' : 'items-center'}`}>
            {chat.userUid === getUser.uid ? '' : <div className="!h-[43px]"><UserInfo uid={chat.userUid} /></div>
            }
            <div className="flex flex-col items-end gap-y-2">
                {
                    chat.image ?
                        <div className={`tooltip ${chat.userUid === getUser?.uid ? 'tooltip-left' : 'tooltip-right'} z-30 font-medium border-4 max-w-xs border-[#8b5cf6] rounded-lg`}>
                            <div className="tooltip-content">
                                <div className="">{chat?.time}</div>
                            </div>
                            <div id={`image_${chat.chat_id}`}>
                                <img src={chat.image} onClick={() => { setIsOpen(true) }} className="rounded-lg cursor-pointer" alt="" />
                                <Dialog open={isOpen} as="div" className="relative z-[100] focus:outline-none" onClose={close}>
                                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                        <div className="flex min-h-full w-screen bg-[#00000099] z-[200] items-center justify-center p-4">
                                            <DialogPanel
                                                transition
                                                className="w-full max-w-xl rounded-xl bg-[#0f172b99] p-14 backdrop-blur-2xl duration-300 ease-out "
                                            >
                                                <img className="w-fit mx-auto rounded-lg" src={chat.image} alt="" />
                                                <div className="mt-4">
                                                    <button className="absolute -top-2 cursor-pointer -right-2 p-2 rounded-full hover:bg-slate-900 hover:text-[#8b5cf6] tra bg-[#8b5cf6] text-slate-900"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <RxCross2 className="text-2xl" />
                                                    </button>
                                                </div>
                                            </DialogPanel>
                                        </div>
                                    </div>
                                </Dialog>
                            </div>
                        </div> : ''
                }
                {chat.deleted && <span id={`deleted_${chat.chat_id}`} className="text-gray-300 bg-[#00000099] font-semibold border rounded-full italic p-3 border-[#8b5cf6]">Chat deleted by user</span>}
                {
                    chat.text ? <div className={`tooltip ${chat.edited && 'mt-6'} ${chat.userUid === getUser?.uid ? 'tooltip-left bg-[#00000099] border-[#8b5cf6]' : 'tooltip-right  bg-[#8b5cf6] border-[#00000099]'} relative z-30 font-medium border w-fit rounded-full p-3`}>
                        <div className="tooltip-content">
                            <div className="">{chat?.time}</div>
                        </div>
                        {chat.edited && <span className="text-white absolute -top-6 left-0">Edited</span>}
                        {
                            chat.text.split(regex).map((part, idx) =>
                                regex.test(part) ?
                                    <Link id={chat.chat_id} key={idx} className={`${chat?.userUid === getUser?.uid ? 'text-[#8b5cf6]' : 'text-[#00000099]'} hover:underline`} target="_blank" to={part}>{part}</Link> : <span id={chat.chat_id} key={idx}>{part}</span>
                            )
                        }
                    </div> : ''
                }
            </div>
        </div >
    );
};

export default Chats;