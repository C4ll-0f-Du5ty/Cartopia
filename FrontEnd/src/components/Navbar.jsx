// import { useState, useContext } from "react";
// import ProfileDropDown from "./ProfileDropDown";
// import { Link } from "react-router-dom";
// import AuthContext from "../Context/AuthContext";


// const Navbar = () => {
//     const [menuState, setMenuState] = useState(false);
//     const { search, setSearch, getCartCount } = useContext(AuthContext);

//     const navigation = [
//         { title: "Home", path: "/" },
//         { title: "Collection", path: "/collection" },
//         { title: "About", path: "/about" },
//         { title: "Contact", path: "/contact" },
//     ];

//     return (
//         <nav className="bg-white border-b z-10 relative">
//             <div className="flex items-center space-x-6 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
//                 <div className="flex-none lg:flex-initial">
//                     <Link to="/">
//                         <img
//                             src="https://www.floatui.com/logo.svg"
//                             width={120}
//                             height={50}
//                             alt="Float UI logo"
//                         />
//                     </Link>
//                 </div>
//                 <div className="flex-1 flex items-center justify-between">
//                     <div
//                         className={`bg-white absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${menuState ? "" : "hidden"
//                             }`}
//                     >
//                         <ul className="mt-4 space-y-6 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0 text-base font-semibold">
//                             {navigation.map((item, idx) => (
//                                 <li key={idx} className="text-gray-600 hover:text-blue-600">
//                                     <Link to={item.path}>{item.title}</Link>
//                                 </li>
//                             ))}
//                         </ul>
//                         <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden" />
//                     </div>

//                     <div className="flex-1 flex items-center justify-end space-x-4 sm:space-x-6">

//                         {/* Search navigation */}
//                         <form className="flex items-center space-x-2 border rounded-md p-2 hover:border-blue-700">

//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-6 w-6 flex-none text-gray-400"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                                 />
//                             </svg>

//                             <input value={search} onChange={(e) => setSearch(e.target.value)}
//                                 className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 text-sm sm:w-auto"
//                                 type="text"
//                                 placeholder="Search"
//                             />
//                         </form>

//                         <Link to="/cart">
//                             <button className="relative outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600 bg-gray-100 z-30">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 24 24"
//                                     width="24"
//                                     height="24"
//                                     fill="none"
//                                     className="h-10 w-10 bg-slate-100 p-1.5 rounded-full border-b border-2 text-gray-500"
//                                 >
//                                     <path
//                                         d="M3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L20.1271 17.0194C19.7282 19.3991 19.5287 20.5889 18.7143 21.2945C17.9 22 16.726 22 14.3782 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194Z"
//                                         stroke="currentColor"
//                                         strokeWidth="1.5"
//                                     />
//                                     <path
//                                         d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5"
//                                         stroke="currentColor"
//                                         strokeWidth="1.5"
//                                     />
//                                 </svg>
//                                 <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
//                                     {getCartCount()}
//                                 </span>
//                             </button>
//                         </Link>

//                         <Link>
//                             <ProfileDropDown class="hidden lg:block z-40" />
//                             <button
//                                 className="outline-none text-gray-400 block lg:hidden"
//                                 onClick={() => setMenuState(!menuState)}
//                             >
//                                 {menuState ? (
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 24 24"
//                                         width={24}
//                                         height={24}
//                                         strokeWidth={2}
//                                         stroke="currentColor"
//                                         fill="none"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         className="w-6 h-6"
//                                     >
//                                         <path d="M18 6L6 18M6 6l12 12" />
//                                     </svg>
//                                 ) : (
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="h-6 w-6"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                         strokeWidth={2}
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             d="M4 6h16M4 12h16m-7 6h7"
//                                         />
//                                     </svg>
//                                 )}
//                             </button></Link>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;



import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProfileDropDown from "./ProfileDropDown";
import AuthContext from "../Context/AuthContext";

const Navbar = () => {
    const [menuState, setMenuState] = useState(false);
    const { search, setSearch, getCartCount } = useContext(AuthContext);

    const navigation = [
        // { title: "Home", path: "/" },
        { title: "Collection", path: "/collection" },
        { title: "About", path: "/about" },
        { title: "Contact", path: "/contact" },
    ];

    const navVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const menuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
        hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3 } },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
        }),
    };

    return (
        <motion.nav
            className="bg-white border-b shadow-md w-full top-0 z-50 relative"
            initial="hidden"
            animate="visible"
            variants={navVariants}
        >
            <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
                {/* Custom "Cartopia" Logo */}
                <motion.div
                    className="absolute left-4 top-4"
                    variants={logoVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                >
                    <Link to="/" className="flex items-center">
                        <motion.svg
                            width="40"
                            height="40"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                            initial={{ rotate: -10, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <path
                                d="M10 30 L20 10 L30 30"
                                stroke="#2563eb"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <circle cx="20" cy="20" r="16" stroke="#2563eb" strokeWidth="2" fill="none" />
                        </motion.svg>
                        <div className="flex">
                            {"Cartopia".split("").map((letter, idx) => (
                                <motion.span
                                    key={idx}
                                    custom={idx}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="text-2xl font-bold text-gray-800"
                                    whileHover={{ color: "#2563eb", y: -2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </Link>
                </motion.div>

                {/* Navigation Links */}
                <div className="flex-1 flex items-center justify-between gap-4 ml-40">
                    <AnimatePresence>
                        <motion.div
                            className={`absolute top-full left-0 w-full bg-white p-4 sm:p-6 shadow-lg lg:static lg:flex lg:items-center lg:p-0 lg:shadow-none ${menuState ? "block" : "hidden lg:flex"
                                }`}
                            variants={menuVariants}
                            initial="hidden"
                            animate={menuState || window.innerWidth >= 1024 ? "visible" : "hidden"}
                            exit="exit"
                        >
                            <ul className="space-y-4 lg:flex lg:space-y-0 lg:space-x-6 lg:items-center text-base font-medium">
                                {navigation.map((item, idx) => (
                                    <motion.li
                                        key={idx}
                                        whileHover={{ scale: 1.05, color: "#2563eb" }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-gray-700"
                                    >
                                        <Link to={item.path}>{item.title}</Link>
                                    </motion.li>
                                ))}
                            </ul>
                            <ProfileDropDown className="mt-6 pt-6 border-t lg:hidden" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Right Section */}
                    <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
                        {/* Search Bar */}
                        <motion.form
                            className="hidden sm:flex items-center border rounded-full p-2 bg-gray-50 hover:border-blue-500 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400 mx-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-20 sm:w-32 lg:w-48 bg-transparent outline-none text-gray-600 placeholder-gray-400 text-sm"
                                type="text"
                                placeholder="Search products..."
                            />
                        </motion.form>

                        {/* Cart Icon */}
                        <Link to="/cart">
                            <motion.button
                                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    className="text-gray-600"
                                >
                                    <path
                                        d="M3.87289 17.0194L2.66933 9.83981C2.48735 8.75428 2.39637 8.21152 2.68773 7.85576C2.9791 7.5 3.51461 7.5 4.58564 7.5H19.4144C20.4854 7.5 21.0209 7.5 21.3123 7.85576C21.6036 8.21152 21.5126 8.75428 21.3307 9.83981L20.1271 17.0194C19.7282 19.3991 19.5287 20.5889 18.7143 21.2945C17.9 22 16.726 22 14.3782 22H9.62182C7.27396 22 6.10003 22 5.28565 21.2945C4.47127 20.5889 4.27181 19.3991 3.87289 17.0194Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                                <motion.span
                                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                >
                                    {getCartCount()}
                                </motion.span>
                            </motion.button>
                        </Link>

                        {/* Profile and Menu Toggle */}
                        <div className="flex items-center space-x-3">
                            <ProfileDropDown className="hidden lg:block" />
                            <motion.button
                                className="lg:hidden text-gray-600 focus:outline-none"
                                onClick={() => setMenuState(!menuState)}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                {menuState ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    </svg>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
