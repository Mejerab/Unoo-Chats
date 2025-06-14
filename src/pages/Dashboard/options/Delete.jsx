import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Delete = ({chat, user}) => {
    const axiosSecure =useAxiosSecure();
    const handleDelete = async(chat) =>{
        const data ={
            deleted: true
        }
        if (chat.text) {
            data.text = '';
        }
        if (chat.image) {
            data.image = null;
        }
        const res = await axiosSecure.patch(`/chats/delete/${chat.chat_id}?email=${user?.email}`, data);
        console.log(res.data);
    }
    return (
        <div>
            <button onClick={()=>{handleDelete(chat);}} className="cursor-pointer p-1.5 rounded-full bg-[#8b5cf6] text-slate-900 hover:bg-slate-900 hover:text-[#8b5cf6] transition-colors"><MdDelete /></button>
        </div>
    );
};

export default Delete;