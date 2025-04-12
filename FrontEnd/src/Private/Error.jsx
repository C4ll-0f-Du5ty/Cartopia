import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../Context/AuthContext';
import { toast } from 'react-toastify';

function ErrorRoute({ children }) {
    const { user } = useContext(AuthContext);
    const [redirect, setRedirect] = useState(false); // Control redirection

    let counter = 0
    useEffect(() => {
        if (user && counter == 0) {
            toast.error("You're authenticated!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            counter++;

            setRedirect(true);
            // Delay the redirect to give the toast time to show
            const timer = setTimeout(() => {
            }, 1000); // 1-second delay

            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, []);

    if (redirect) {
        console.log(user)

        return <Navigate to={'/profile'} replace />;
    }

    return !user ? children || <Outlet /> : null; // Don't render anything until the delay is over
}

export default ErrorRoute;
