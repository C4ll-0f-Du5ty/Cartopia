import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../Context/AuthContext";

const ProfileDropDown = ({ className }) => {
    const [state, setState] = useState(false);
    const profileRef = useRef();
    const { logoutUser, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };

    let navigation = [];
    if (user?.user_type === "merchant") {
        navigation = [
            { title: "Profile", path: "/profile" },
            { title: "Add Product", path: "/add" },
            { title: "Orders", path: "/orders" },
            { title: "Log Out", path: "/", onClick: logoutUser },
        ];
    } else if (user) {
        navigation = [
            { title: "Profile", path: "/profile" },
            { title: "Orders", path: "/orders" },
            { title: "Log Out", path: "/", onClick: logoutUser },
        ];
    } else {
        navigation = [
            { title: "Orders", path: "/orders" },
            { title: "Login", path: "/login" },
            { title: "Register", path: "/register" },
        ];
    }

    useEffect(() => {
        const handleDropDown = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setState(false);
            }
        };
        document.addEventListener("click", handleDropDown);
        return () => document.removeEventListener("click", handleDropDown);
    }, []);

    const handleNavigation = (item) => {
        if (item.onClick) item.onClick();
        navigate(item.path);
        setState(false);
    };

    return (
        <div className={`relative ${className}`}>
            <motion.button
                ref={profileRef}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                onClick={() => setState(!state)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600"
                >
                    <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" />
                    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" />
                </svg>
            </motion.button>
            <AnimatePresence>
                {state && (
                    <motion.ul
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg text-sm z-50"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {navigation.map((item, idx) => (
                            <motion.li
                                key={idx}
                                whileHover={{ backgroundColor: "#f1f5f9", x: 5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <button
                                    onClick={() => handleNavigation(item)}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                                >
                                    {item.title}
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileDropDown;
