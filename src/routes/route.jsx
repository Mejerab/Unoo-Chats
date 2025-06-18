import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import LettingIn from "../pages/LettingIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import Inbox from "../pages/Dashboard/Inbox";
import Profile from "../pages/Profile";
import Home from "../pages/Home/Home";
import { Modal } from "@mui/material";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/lettingin',
                element: <LettingIn />,
            },
            {
                path: '/profile',
                element: <PrivateRoutes><Profile /></PrivateRoutes>,
            },
        ],
    },
    {
        path: '/chats',
        element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
        children: [
            {
                path: 'e/unoo',
                element: <PrivateRoutes><Inbox /></PrivateRoutes>
            },
            {
                path: 'e/:uid',
                element: <PrivateRoutes><Inbox /></PrivateRoutes>
            }
        ]
    }
]);
export default router;