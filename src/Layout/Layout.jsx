import { Outlet, useLocation, useNavigate } from "react-router";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import 'tippy.js/dist/tippy.css';
const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    if (location.pathname==='/lettingin'&&user) {
        navigate('/chats');
    }
    gsap.registerPlugin(TextPlugin);
    return (
        <div className="font text-white bg-slate-900 overflow-hidden">
            <Outlet />
        </div>
    );
};

export default Layout;