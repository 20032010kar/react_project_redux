import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";

import HomePage from "./pages/home.js";
import ProfilePage from "./pages/react_features/profile.js";
import RootLayout from "./root_layout.js"; 

import { ThemeContext, ThemeProvider } from "./context/theme-context.js";
import { AuthProvider } from "./context/auth-context.js";

import AuthRoute from "./components/auth/auth-route.js";
import CounterPage from "./pages/REDUX_HOMEWORK/counter-page.js";

const NotFoundPage = () => (
    <div>
        <h1 className="text-7xl text-red-950 uppercase font-bold">404 Not Found.</h1>
        <Link to="/">Go home</Link>
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'profile/:id',
                element: <ProfilePage />
            },
            {
                path: 'profile',
                element: <ProfilePage />
            },
            {
                path: 'redux-counter',
                element: <CounterPage />
            },
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
]);

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;