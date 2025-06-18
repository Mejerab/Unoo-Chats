import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user, login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [loadi, setLoadi] = useState(false);
    const handleLogin = e => {
        setLoadi(true);
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        login(email, password)
            .then(() => {
                Swal.fire({
                    title: 'Success',
                    text: 'You successfully Logged in to your account in Unoo Chats.',
                    icon: 'success',
                    background: 'rgba(15, 23, 43, 0.8)',
                    color: '#ffffff',
                    customClass: {
                        confirmButton: 'swalButton',
                        icon: 'icoon'
                    },
                    confirmButtonText: 'Continue'
                })
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: 'Error',
                    text: 'We faced some problems to log you in.\n Try again later.',
                    icon: 'error',
                    background: 'rgba(15, 23, 43, 0.8)',
                    color: '#ffffff',
                    customClass: {
                        confirmButton: 'swalButton'
                    },
                    confirmButtonText: 'Continue'
                })
            })
        setLoadi(false);
    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then(async (result) => {
                try {
                    const email = result.user.email;
                    const findRes = await axiosSecure.get(`/users/${email}`);
                    if (findRes.data === '') {
                        const userInfo = {
                            name: result.user.displayName,
                            email: result.user.email,
                            photo: result.user.photoURL,
                            uid: result.user.uid
                        }
                        const postRes = await axiosPublic.post('/users', userInfo);
                        Swal.fire({
                            title: 'Success',
                            text: 'You successfully Logged in to your account in Unoo Chats.',
                            icon: 'success',
                            background: 'rgba(15, 23, 43, 0.8)',
                            color: '#ffffff',
                            customClass: {
                                confirmButton: 'swalButton',
                                icon: 'icoon'
                            },
                            confirmButtonText: 'Continue'
                        })
                        return navigate('/chats');
                    }
                    else {
                        Swal.fire({
                            title: 'Success',
                            text: 'You successfully Logged in to your account in Unoo Chats.',
                            icon: 'success',
                            background: 'rgba(15, 23, 43, 0.8)',
                            color: '#ffffff',
                            customClass: {
                                confirmButton: 'swalButton',
                                icon: 'icoon'
                            },
                            confirmButtonText: 'Continue'
                        })
                        return navigate('/chats');
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: 'Error',
                    text: 'We faced some problems to log you in.\n Try again later.',
                    icon: 'error',
                    background: 'rgba(15, 23, 43, 0.8)',
                    color: '#ffffff',
                    customClass: {
                        confirmButton: 'swalButton'
                    },
                    confirmButtonText: 'Continue'
                })
            })
    }
    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-4">
            <img className="w-44" src="https://i.ibb.co.com/dJK6bDd6/logo.png" alt="" />
            <form onSubmit={handleLogin} className="w-full text-center space-y-7">
                <input required type="email" name="email" className="input w-full focus:border-0 focus:outline-0 input-bordered h-[56px] text-[#000000F2] placeholder:text-[#676767] rounded-xl font-medium" placeholder="Email Address" />
                <div className="relative">
                    <input required type={show ? 'text' : 'password'} name="password" className="input w-full relative focus:border-0 focus:outline-0 input-bordered h-[56px] text-[#000000F2] placeholder:text-[#676767] rounded-xl font-medium" placeholder="Password" />
                    {!show ? <FaEye onClick={() => { setShow(!show); }} className="text-xl cursor-pointer absolute top-[18px] right-4 text-[#50ffd1] z-50" /> : <FaEyeSlash onClick={() => setShow(!show)} className="text-xl cursor-pointer absolute top-[18px] right-4 text-[#50ffd1] z-50" />}
                </div>
                {user ? <div className="tooltip w-full" disabled data-tip="You are already logged in !">
                    <button disabled className="btn overflow-hidden button relative !bg-gray-400 text-black rounded-full h-[50px] w-full bg-"><span className="z-20">Login</span></button>
                </div> :
                    loadi ? <button disabled className="btn overflow-hidden button relative hover:text-white text-black rounded-full h-[50px] w-full !bg-white"><span className="z-20 loading loading-spinner text-[#8b5cf6] loading-xl"></span></button> :
                        <button className="btn overflow-hidden button relative hover:text-white text-black rounded-full h-[50px] w-full"><span className="z-20">Login</span></button>
                }
            </form>
            <p className='text-sm '>Do not <Link to='?signup' className='underline cursor-pointer'>have an account</Link> ?</p>
            <div className='flex w-full items-center gap-x-3'>
                <div className='w-full h-[2px] rounded-full bg-gray-500'></div>
                <span>Or</span>
                <div className='w-full h-[2px] rounded-full bg-gray-500'></div>
            </div>
            {user ? <div className="tooltip w-full" disabled data-tip="You are already logged in !">
                <button onClick={() => handleGoogleLogin()} disabled className='btn w-full rounded-full h-[45px] relative text-black !bg-gray-400'><FcGoogle className='text-2xl absolute left-3 top-[10px]' />Continue with Google</button> </div> :
                loadi ?
                    <button className='btn w-full rounded-full h-[45px] relative hover:bg-gray-300'><FcGoogle className='text-2xl absolute left-3 top-[10px]' /><span className="loading loading-spinner text-[#8b5cf6] loading-xl"></span></button> :
                    <button onClick={() => { handleGoogleLogin(); setLoadi(true) }} className='btn w-full rounded-full h-[45px] relative hover:bg-gray-300'><FcGoogle className='text-2xl absolute left-3 top-[10px]' />Continue with Google</button>}
        </div>
    );
};

export default Login;