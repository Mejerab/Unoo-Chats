import { Outlet, useLocation, useNavigate } from "react-router";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import 'tippy.js/dist/tippy.css';
const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    useEffect(() => {
        if (location.pathname === '/lettingin' && user) {
            navigate('/chats');
        }
    }, [location.pathname, user, navigate])
    gsap.registerPlugin(TextPlugin);
    return (
        <div className="font text-white bg-slate-900 overflow-hidden">
            <Outlet />
        </div>
    );
};

export default Layout;