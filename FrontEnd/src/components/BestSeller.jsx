import { useContext, useEffect, useState } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';
import AuthContext from '../Context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const BestSeller = () => {
    const { products } = useContext(AuthContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProducts = products.filter((item) => item.bestseller);
        setBestSeller(bestProducts.slice(0, 5));
    }, [products]); // Added products to dependency array

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
        }),
    };

    return (
        <div className="my-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                className="text-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <Title text1="BEST" text2="SELLERS" className="text-4xl" />
                <p className="w-3/4 mx-auto mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                    Our bestsellers are here to elevate your wardrobe. Dive in and find your new favorites today!
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8"
                layout
            >
                <AnimatePresence>
                    {bestSeller.map((item, index) => (
                        <motion.div
                            key={item.id || index}
                            custom={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                                transition: { duration: 0.3 },
                            }}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            <ProductItem
                                id={item.id} // Changed from _id to id
                                image={
                                    item.photos?.find((photo) => photo.is_main)?.image ||
                                    item.photos?.[0]?.image ||
                                    item.image?.[0]
                                }
                                name={item.name}
                                price={item.price}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default BestSeller;
