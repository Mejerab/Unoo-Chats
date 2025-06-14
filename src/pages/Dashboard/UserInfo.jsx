import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';

const UserInfo = ({ uid }) => {
    const { loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const { data: info } = useQuery({
        queryKey: ['user', uid],
        enabled: !loading && !!uid,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/uid/${uid}`);
            return res.data;
        }

    })
    return (
        <div>
            <Tippy content={<div className={`z-50 text-xs`}>
                    {info?.name}
                </div>}>
                <img className="w-9 h-9 rounded-full object-cover" src={info?.photo} alt="" />
            </Tippy>
        </div>
    );
};

export default UserInfo;