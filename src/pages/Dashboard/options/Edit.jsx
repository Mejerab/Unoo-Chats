import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Edit = ({ chat, user }) => {
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.editedText.value;
        chat.text = text;
        chat.edited = true;
        const {_id, ...edit} = chat;
        const res = await axiosSecure.patch(`/chats/edit/${chat.chat_id}?email=${user?.email}`, edit);
        setIsOpen(false);
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    })
    return (
        <div id={`edit_${chat.chat_id}`}>
            <button onClick={() => setIsOpen(true)} className="cursor-pointer p-1.5 rounded-full bg-[#8b5cf6] text-slate-900 hover:bg-slate-900 hover:text-[#8b5cf6] transition-colors"><MdModeEditOutline /></button>
            <Dialog open={isOpen} as="div" className="relative z-[100] focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full w-screen bg-[#00000099] z-[200] items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-xl rounded-xl bg-[#0f172b99] p-14 backdrop-blur-2xl duration-300 ease-out "
                        >
                            <form autoComplete="off" onSubmit={handleSubmit} className="relative">
                                <input defaultValue={chat.text} autoFocus name="editedText" type="text" className="input w-full focus:outline-none h-[45px] bg-transparent border-2 rounded-lg font-medium text-base border-[#8b5cf6] text-white placeholder:text-[#ffffff99] pr-12" placeholder="Aa" />
                                <button className="z-40 cursor-pointer absolute bottom-4 right-3"><IoSend className="text-[#8b5cf6] text-xl -rotate-45" /></button>
                            </form>
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
    );
};

export default Edit;