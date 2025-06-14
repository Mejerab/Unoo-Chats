import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetUser = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const {data: getUser} = useQuery({
        queryKey: ['user'],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        }
    })
    return getUser;
};

export default useGetUser;