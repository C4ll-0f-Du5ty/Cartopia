// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useContext, useState, useEffect } from 'react';
// import AuthContext from '../Context/AuthContext';
// import { toast } from 'react-toastify';

// function Merchant({ children }) {
//     const { user } = useContext(AuthContext);
//     const [redirect, setRedirect] = useState(false); // Control redirection

//     useEffect(() => {
//         if (user?.user_type != "merchant") {
//             toast.error("You're not authorized", {
//                 position: "top-center",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });

//             // Delay the redirect to give the toast time to show
//             const timer = setTimeout(() => {
//                 setRedirect(true);
//             }, 1000); // 1-second delay

//             return () => clearTimeout(timer); // Cleanup timer on unmount
//         }
//     }, [user]);

//     if (redirect) {
//         console.log(user)

//         return <Navigate to={'/profile'} replace />;
//     }

//     return !user ? children || <Outlet /> : null; // Don't render anything until the delay is over
// }

// export default Merchant;


import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../Context/AuthContext';
import { toast } from 'react-toastify';

function Merchant({ children }) {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    let counter = 0
    useEffect(() => {
        if (!user) {
            // Handle unauthenticated users
            setIsAuthorized(false);
            setLoading(false);
            return;
        }

        // Check merchant permissions
        if (user?.user_type === "merchant") {
            setIsAuthorized(true);
        } else if (counter == 0) {
            setIsAuthorized(false);
            // Show unauthorized message with delay
            toast.error("You're not authorized", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            counter++;
        }
        setLoading(false);
    }, [user]);

    if (loading) {
        return null; // Show nothing while loading
    }

    if (!isAuthorized) {
        return <Navigate to="/profile" replace state={{ from: location }} />;
    }

    return children || <Outlet />;
}

export default Merchant;
