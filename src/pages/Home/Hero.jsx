import ImageTrail from './../../Styles/ImageTrail'
import Squares from "../../Styles/Squares";
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router';

const Hero = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="relative">
            <Squares />
            <div className="absolute top-0 left-0 w-full h-full">
                <div style={{ height: '600px', position: 'relative', overflow: 'hidden' }}>
                    <ImageTrail
                        // key={key}
                        items={[
                            'https://i.ibb.co/gQ8bCdW/2.jpg',
                            'https://i.ibb.co/HLXCFj3S/2b1b0ad0-2c0a-4c9a-9b63-76c380cd1042.jpg',
                            'https://i.ibb.co/sd17DQtV/eid.jpg',
                            'https://i.ibb.co/21N5Z2sw/eid5.jpg',
                            'https://i.ibb.co/KxBsBn83/eid4.jpg',
                            // ...
                        ]}
                        variant={1}
                    />
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-1/2 z-[100] text-center space-y-5">
                <h3 className="text-[#8b5cf6] leading-[1.2] text-5xl uppercase font-semibold">Welcome to the<br /> Unoo Chats</h3>
                <p>Connect with your friends and family through us.</p>
                <Link to={user ? '/chats' : '/lettingin?login'} className="btn rounded-full overflow-hidden border-[#8b5cf6] border-2 shadow-none bg-transparent text-white px-8 button2 relative h-[52px]"><span className="z-50">Get Into Chatting</span></Link>
            </div>
        </div>
    );
};

export default Hero;