import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div className="font text-white bg-slate-900 overflow-hidden min-h-screen flex items-center justify-center flex-col">
            <img className="w-1/5" src="https://i.ibb.co.com/mCLXx8Hb/make-me-a-uno-reverse-png-image.png" alt="" />
            <div className="text-[#8b5cf6] text-center mt-6">
                <h4 className="font-semibold text-4xl">{error.status}</h4>
                <p className="font-medium text-3xl text-white">{error.statusText}</p>
                <Link to='/' className="btn mt-3 rounded-full overflow-hidden border-[#8b5cf6] border-2 shadow-none bg-transparent text-white px-8 button2 relative h-[52px]"><span className="z-50">Go Back</span></Link>
            </div>
        </div>
    );
};

export default ErrorPage;