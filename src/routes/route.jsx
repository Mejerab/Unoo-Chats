import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import LettingIn from "../pages/LettingIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import Inbox from "../pages/Dashboard/Inbox";
import Profile from "../pages/Profile";
import Home from "../pages/Home/Home";
import { Modal } from "@mui/material";

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
                element: <Profile />,
            },
        ],
    },
    {
        path: '/chats',
        element: <Dashboard />,
        children: [
            {
                path: 'e/unoo',
                element: <Inbox />
            },
            {
                path: 'e/:uid',
                element: <Inbox />
            },
            {
                path: '/chats/image/:link',
                element: <Modal />
            }
        ]
    }
]);
export default router;