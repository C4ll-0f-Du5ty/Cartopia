import { useState, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../Context/AuthContext";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/"; // Previous page or default to home

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const response = await loginUser(e); // Assuming loginUser handles username/password from event
      if (response) {
        navigate(from, { replace: true });
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.4, ease: "easeOut" },
    }),
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  const errorVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 sm:p-6"
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
        whileHover={{ boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" }}
        transition={{ duration: 0.3 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-8 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Sign In to Your Account
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
              >
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div custom={0} variants={formItemVariants} initial="hidden" animate="visible">
            <label className="block mb-2 text-sm font-medium text-gray-700">Your Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
              required
            />
          </motion.div>

          <motion.div custom={1} variants={formItemVariants} initial="hidden" animate="visible">
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
              required
            />
          </motion.div>

          <motion.div custom={2} variants={formItemVariants} initial="hidden" animate="visible">
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={loading}
              transition={{ duration: 0.3 }}
              className={`w-full p-3 rounded-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ${loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </motion.div>

          <motion.p
            className="text-center text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Don’t have an account?{" "}
            <NavLink to="/register" className="text-blue-600 hover:underline">
              Sign up
            </NavLink>
          </motion.p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LogIn;
