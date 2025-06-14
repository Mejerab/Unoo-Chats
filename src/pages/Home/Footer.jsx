import { Link } from 'react-router';
import Ballpit from '../../Styles/BallPrint';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
    return (
        <div id='footer' className=''>
            <div className='relative'>
                <div style={{ position: 'relative', overflow: 'hidden', height: '300px', width: '100%' }}>
                    <Ballpit
                        count={100}
                        gravity={1.5}
                        friction={0.9}
                        wallBounce={1}
                        followCursor={false}
                        colors={['#8b5cf6', '#8b5cf6', '#8b5cf6']}
                        maxSize={0.5}
                    />
                </div>
                <footer className="absolute top-0 left-0 h-full bg-transparent footer sm:footer-horizontal text-neutral-content p-10">
                    <aside>
                        <img className='w-40 -ml-6' src="https://i.ibb.co.com/dJK6bDd6/logo.png" alt="" />
                        <p>
                            <b>Unoo Chats</b>
                            <br />
                            Providing reliable tech from 2025.
                        </p>
                    </aside>
                    <nav>
                        <h6 className="font-semibold text-lg text-[#8b5cf6]">Connect with me</h6>
                        <div className="grid grid-flow-col gap-4">
                            <Link to='https://www.facebook.com/profile.php?id=100092038001931'><div className='w-[30px] h-[30px] flex justify-center items-center tra rounded-full bg-transparent hover:bg-[#8b5cf6]'><FaFacebookF className='text-lg tra -ml-0.5'/></div></Link>
                            <Link to='https://www.instagram.com/mejerabxd/?next=%2F'><div className='w-[30px] h-[30px] flex justify-center items-center tra rounded-full bg-transparent hover:bg-[#8b5cf6]'><FaInstagram className='text-lg tra'/></div></Link>
                            <Link to='https://www.linkedin.com/in/meherab-hossean-omi-430868329'><div className='w-[30px] h-[30px] flex justify-center items-center tra rounded-full bg-transparent hover:bg-[#8b5cf6]'><FaLinkedinIn className='text-lg tra'/></div></Link>
                        </div>
                    </nav>
                </footer>
            </div>
            <div className='py-3 border-t border-white'>
                <div className='max-w-[1320px] mx-auto'>
                    <p className='text-center'>&copy;: All Rights reserved by Mr. Omi</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;