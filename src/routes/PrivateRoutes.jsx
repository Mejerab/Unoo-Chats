import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import PropTypes from "prop-types";

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <div className="flex justify-center items-center w-full min-h-screen"><span className="loading loading-spinner text-[#8b5cf6] loading-xl"></span></div>;
    }
    if (user) {
        return children;
    }
    return <Navigate state={{form: location}} to='/lettingin?login'></Navigate>
}
PrivateRoutes.propTypes = {
    children: PropTypes.node
} 
export default PrivateRoutes;