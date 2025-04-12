import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const OurPolicy = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: 'easeOut' },
    }),
    hover: { scale: 1.05, boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' },
  };

  const policies = [
    {
      icon: assets.exchange_icon,
      title: 'Easy Exchange & Return',
      desc: 'We offer hassle-free exchanges and returns.',
    },
    {
      icon: assets.quality_icon,
      title: '7 Days Quality Guarantee',
      desc: 'We provide a 7-day quality guarantee.',
    },
    {
      icon: assets.support_img,
      title: '24/7 Support',
      desc: 'We provide 24/7 support.',
    },
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div
        className="flex flex-col sm:flex-row justify-around gap-8 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
      >
        {policies.map((policy, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md w-full sm:w-64 h-64 text-center text-gray-700 transition-shadow duration-300"
          >
            <img src={policy.icon} alt={policy.title} className="w-12 h-12 mb-5" />
            <p className="font-semibold text-lg">{policy.title}</p>
            <p className="text-gray-500 mt-2 text-sm">{policy.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default OurPolicy;
