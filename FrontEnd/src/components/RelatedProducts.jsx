import { useContext, useEffect, useState } from 'react';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import AuthContext from '../Context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(AuthContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            // Filter by category and subcategory
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            // Limit to 5 items
            setRelated(productsCopy.slice(0, 5));
        }
    }, [products, category, subCategory]);

    // Animation variants for items
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1, // Staggered entry
                duration: 0.5,
                ease: 'easeOut',
            },
        }),
        exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
    };

    return (
        <div className="my-24 px-4 sm:px-6 lg:px-8">
            {/* Title Section */}
            <motion.div
                className="flex justify-center items-center text-4xl py-6 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <Title text1="Related" text2="Products" />
            </motion.div>

            {/* Products Grid */}
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8 mt-8"
                layout
            >
                <AnimatePresence>
                    {related.length > 0 ? (
                        related.map((item, index) => (
                            <motion.div
                                key={item.id || index} // Use _id if available, fallback to index
                                custom={index}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                                    transition: { duration: 0.3 },
                                }}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <ProductItem
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    image={
                                        item.photos?.find((photo) => photo.is_main)?.image ||
                                        item.photos?.[0]?.image ||
                                        item.image?.[0]
                                    }
                                />
                            </motion.div>
                        ))
                    ) : (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="col-span-full text-center text-gray-500 text-lg"
                        >
                            No related products found.
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default RelatedProducts;
