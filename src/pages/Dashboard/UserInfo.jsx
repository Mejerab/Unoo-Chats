import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserInfo = ({ uid }) => {
    const { loading, user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    
    const { data: info } = useQuery({
        queryKey: ['user', uid],
        enabled: !loading && !!uid,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/uid/${uid}?email=${user.email}`);
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