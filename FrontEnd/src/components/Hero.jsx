import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, duration: 0.8, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const buttonVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.6 } },
    hover: { scale: 1.1, backgroundColor: '#ef4444', transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-[60vh] sm:h-[80vh] bg-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Dual Image Background */}
      <div className="flex flex-col sm:flex-row h-full">
        <motion.div
          className="flex-1 relative"
          variants={imageVariants}
        >
          <img
            src="https://img.chelseafc.com/image/upload/f_auto,w_1440,c_fill,g_faces,q_90/editorial/news/2022/10/05/Third_Kit_Launch_Article_Hero_2880x1620.jpg"
            alt="Hero Left"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </motion.div>
        <motion.div
          className="flex-1 relative"
          variants={imageVariants}
        >
          <img
            src="https://assets.goal.com/images/v3/bltec28ecddab56e0ac/City_home_22_(2).jpg?auto=webp&format=pjpg&width=3840&quality=60"
            alt="Hero Right"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </motion.div>
      </div>

      {/* Centered CTA */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-8"
        variants={buttonVariants}
      >
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
          Discover Your Style
        </h2>
        <Link to="/collection">
          <motion.button
            className="px-8 py-4 bg-red-500 text-white text-lg font-semibold rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            SHOP NOW
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
