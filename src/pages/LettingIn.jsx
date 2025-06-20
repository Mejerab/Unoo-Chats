import { useEffect, useRef } from "react";
import ParticleRing from "../hooks/AnimationHook";
import { gsap } from "gsap";
import { useLocation, useNavigate } from 'react-router';
import Login from "./Home/Login";
import SignUp from "./Home/SignUp";

const LettingIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const slideRef = useRef(null);
    const rightRef = useRef(null);
    useEffect(() => {
        gsap.fromTo(slideRef.current, {
            x: -600,
            opacity: 0,
            autoAlpha: 0
        },
            {
                x: 0,
                autoAlpha: 1,
                opacity: 1,
                duration: 1.7,
                ease: 'power3.inOut',
            })
        gsap.fromTo(rightRef.current, {
            x: 600,
            opacity: 0,
            autoAlpha: 0
        },
            {
                x: 0,
                autoAlpha: 1,
                opacity: 1,
                duration: 1.7,
                ease: 'power3.inOut',
            })
        if (!location.search.includes('?login')) {
            if (!location.search.includes('?signup')) {
                navigate('?login')
            }
        }
    }, [location.search, navigate])


    return (
        <div className="min-h-screen bg-slate-900 relative flex text-white">
            {location.search === '?login' && <div ref={slideRef} className={`absolute top-0 left-0 h-screen backdrop-blur-xl z-50 w-[30%] bg-transparent p-20 } ${location.search === '?login' && 'duration-1000'}`}>
                <Login />
            </div>}
            <div className="w-full ml-auto">
                <ParticleRing />
            </div>
            {location.search === '?signup' && <div ref={rightRef} className={`absolute top-0 right-0 h-screen backdrop-blur-xl z-50 w-[30%] bg-transparent p-20  ${location.search === '?signup' && 'duration-1000'}`}>
                <SignUp />
            </div>}
            <h1 className={`absolute top-[50%] duration-1000 delay-1000 ${location.search === '?signup' ? 'left-[40%] -translate-x-[70%]' : 'left-[60%] -translate-x-[20%]'} -translate-y-[50%] text-slate-200 font-medium md:text-5xl pointer-events-none text-center leading-[70px]`}>
                Welcome To <br /> <span className="text-[#50ffd1]">UNOO</span> Chats
            </h1>
        </div>
    );
};

export default LettingIn;