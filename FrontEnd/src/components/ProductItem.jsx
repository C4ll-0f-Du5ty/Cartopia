import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductItem = ({ id, image, name, price }) => {
    const currency = '$';

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Link to={`/product/${id}`} onClick={handleClick}>
            <motion.div
                className="text-gray-700 cursor-pointer h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                    y: -10,
                    boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                    borderColor: '#ef4444',
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                <div className="overflow-hidden h-48 sm:h-64 relative">
                    <motion.img
                        src={image}
                        alt={name}
                        className="object-cover h-full w-full"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        New
                    </motion.div>
                </div>
                <motion.div
                    className="p-4 flex-shrink-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
                    <motion.p
                        className="font-semibold text-lg text-red-500"
                        whileHover={{ color: '#f87171' }}
                        transition={{ duration: 0.2 }}
                    >
                        {currency}
                        {price.toLocaleString()}
                    </motion.p>
                </motion.div>
            </motion.div>
        </Link>
    );
};

export default ProductItem;
