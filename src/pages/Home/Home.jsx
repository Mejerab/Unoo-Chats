import { Link } from "react-router";
import GooeyNav from "../../Styles/GooeyNav";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Hero from "./Hero";
import Footer from "./Footer";


const Home = () => {
    const items = [
        { label: "Home", href: "#" },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
    ];
    const { user } = useContext(AuthContext);
    return (
        <div>
            <div className="navbar max-w-[1320px] mx-auto">
                <div className="navbar-start">
                    <img className="w-36" src="https://i.ibb.co.com/dJK6bDd6/logo.png" alt="" />
                </div>
                <div className="navbar-center">
                    <GooeyNav
                        items={items}
                        particleCount={15}
                        particleDistances={[90, 10]}
                        particleR={100}
                        initialActiveIndex={0}
                        animationTime={600}
                        timeVariance={300}
                        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                    />
                </div>
                <div className="navbar-end">
                    <Link to={user ? '/chats' : '/lettingin?login'} className="btn rounded-full overflow-hidden border-[#8b5cf6] border-2 shadow-none bg-transparent text-white px-8 button2 relative h-[52px]"><span className="z-50">Get Into Chatting</span></Link>
                </div>
            </div>
            <Hero />
            <div className="h-[300px]">
                other sectiuons
            </div>
            <Footer />
        </div>
    );
};

export default Home;