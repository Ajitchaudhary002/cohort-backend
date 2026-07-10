import { createBrowserRouter } from 'react-router';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Feed from './features/post/pages/Feed';
import CreatePost from './features/post/pages/CreatePost';
import Profile from './features/profile/pages/Profile'
import FollowerList from './features/profile/components/FollowerList';
import FollowingList from './features/profile/components/FollowingList';
import FollowRequests from './features/profile/components/FollowRequests';
import Posts from './features/profile/components/Posts';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <Feed />
    },
    {
        path: '/create-post',
        element: <CreatePost />
    },

    {
        path: "/profile",
        element: <Profile />,
        children: [
            {
                path: "followers",
                element: <FollowerList />
            },
            {
                path: "following",
                element: <FollowingList />
            },
            {
                path: "follow-requests",
                element: <FollowRequests />
            },
            {
                path: 'posts',
                element: <Posts />
            }
        ]
    }
])

