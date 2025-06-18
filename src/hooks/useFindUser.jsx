import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useLocation } from "react-router";
import useAxiosSecure from "./useAxiosSecure";

const useFindUser = (id) => {
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const { loading, user } = useContext(AuthContext);
    const { data: singleUser, refetch } = useQuery({
        queryKey: ['singleUser'],
        enabled: !loading,
        queryFn: async () => {
            if (id.includes('unoo') && id.length !== 24) {
                return { name: 'Unoo', photo: 'https://i.ibb.co/1JtW839p/eid5.jpg', uid: '23423423423' };
            }
            else {
                const res = await axiosSecure.get(`/users/uid/${id}?email=${user.email}`);
                return res.data;
            }
        }
    })
    useEffect(() => {
        refetch()
    }, [refetch, location.pathname])
    return singleUser;
};

export default useFindUser;