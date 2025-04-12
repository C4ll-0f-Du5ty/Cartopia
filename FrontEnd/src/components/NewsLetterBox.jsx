import { motion } from 'framer-motion';

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Add subscription logic here if needed
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-3xl font-semibold text-gray-800 mb-2">
          Subscribe Now & Get 20% Off
        </p>
        <p className="text-gray-600 mb-6">
          Join our newsletter and enjoy 20% off your first order.
        </p>
      </motion.div>
      <motion.form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 mx-auto flex items-center gap-3 border border-gray-300 bg-white rounded-full p-2 shadow-sm"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full flex-1 px-4 py-3 text-gray-800 outline-none bg-transparent rounded-full"
          required
        />
        <motion.button
          type="submit"
          className="bg-red-500 text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          SUBSCRIBE
        </motion.button>
      </motion.form>
    </div>
  );
};

export default NewsLetterBox;
