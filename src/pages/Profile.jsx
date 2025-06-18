import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import useHostingUrl from "../hooks/useHostingUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { IoPencil } from "react-icons/io5";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Profile = () => {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const {
        register,
        handleSubmit,
    } = useForm();
    const { user, loading } = useContext(AuthContext);
    const displayImage = document.getElementById('displayImage');
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const hostingURL = useHostingUrl();
    const input = document.getElementById('imageInput');
    input?.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const render = new FileReader();
            render.onload = function (e) {
                displayImage.src = e.target.result;
            }
            render.readAsDataURL(file);
        }
    })
    const { data: getUser, isLoading } = useQuery({
        queryKey: ['user'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        }
    })
    useEffect(() => {
        if (loading || isLoading) {
            <div className="flex justify-center items-center w-full min-h-screen"><span className="loading loading-spinner text-[#8b5cf6] loading-xl"></span></div>
        }
    }, [loading, isLoading])
    const onSubmit = async (data) => {
        setLoad(true);
        const editInfo = {
            name: data.name,
            email: user?.email,
            photo: getUser?.photoURL
        }
        if (data.photo.length) {
            if (data.photo[0].type === 'image/jpeg' || data.photo[0].type === 'image/png' || data.photo[0].type === 'image/jpg') {
                const imageData = { image: data.photo[0] };
                const imageRes = await axiosPublic.post(hostingURL, imageData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }, withCredentials: false
                })
                editInfo.photo = imageRes.data.data.display_url;
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: 'A image file should be selected.',
                    icon: 'error',
                    background: 'rgba(15, 23, 43, 0.8)',
                    color: '#ffffff',
                    customClass: {
                        confirmButton: 'swalButton'
                    },
                    confirmButtonText: 'Continue'
                })
            }
        }
        const res = await axiosSecure.patch(`/users/patch/${getUser?._id}?email=${getUser?.email}`, editInfo)
        if (res.data.modifiedCount) {
            Swal.fire({
                title: 'Success',
                text: 'You successfully Updated your profile in Unoo Chats.',
                icon: 'success',
                background: 'rgba(15, 23, 43, 0.8)',
                color: '#ffffff',
                customClass: {
                    confirmButton: 'swalButton'
                },
                confirmButtonText: 'Continue'
            })
            navigate('/chats')
        }
        setLoad(false);
    }
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <img className="w-40 mx-auto" src="https://i.ibb.co.com/dJK6bDd6/logo.png" alt="" />
            <form onSubmit={handleSubmit(onSubmit)} className="w-2/4 space-y-6">
                <h5 className="text-center mt-6 font-medium text-3xl">Profile Information</h5>
                <div className="flex items-center gap-5">
                    <input {...register('name')} defaultValue={getUser?.name} type="text" className="input border border-[#8b5cf6] text bg-transparent w-full" placeholder="Name" />
                    <input defaultValue={user.email} disabled type="text" className="disabled:bg-transparent disabled:text-[#676767] disabled:border-[#8b5cf6] input border border-[#8b5cf6] text bg-transparent w-full" placeholder="email" />
                </div>
                <div className="flex justify-center items-center">
                    <input {...register('photo')} id="imageInput" type="file" className="hidden" />
                    <label className="relative group" htmlFor="imageInput">
                        <img id="displayImage" className="w-64 h-64 rounded-full border-4 border-[#8b5cf6] mx-auto object-cover" src={getUser?.photo} alt="" />
                        <IoPencil className="text-[35px] opacity-0 invisible group-hover:opacity-100 group-hover:visible tra absolute -top-1 right-0 bg-white p-2 rounded-full text-[#8b5cf6]" />
                    </label>
                </div>
                {load ?
                <button className="bg-[#8b5cf6] w-full rounded-xl btn border-0 text-white"><span className="loading loading-spinner text-white loading-xl"></span> </button>
                    :
                    <button className="bg-[#8b5cf6] w-full rounded-xl btn border-0 text-white">Save</button>}
            </form>
        </div>
    );
};

export default Profile;