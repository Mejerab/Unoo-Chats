import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation } from "react-router";

const useFindUser = (id) => {
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const { loading } = useContext(AuthContext);
    const { data: user, refetch } = useQuery({
        queryKey: ['singleUser'],
        enabled: !loading,
        queryFn: async () => {
            if (id.includes('unoo') && id.length !== 24) {
                return { name: 'Unoo', photo: 'https://i.ibb.co/1JtW839p/eid5.jpg', uid: '23423423423' };
            }
            else {
                const res = await axiosPublic.get(`/users/uid/${id}`);
                return res.data;
            }
        }
    })
    useEffect(() => {
        refetch()
    }, [refetch, location.pathname])
    return user;
};

export default useFindUser;