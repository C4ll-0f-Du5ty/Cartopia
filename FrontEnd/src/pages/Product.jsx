import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import RelatedProducts from '../components/RelatedProducts';
import AuthContext from '../Context/AuthContext';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(AuthContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.forEach((item) => {
      if (item.id == productId) {
        setProductData(item);
        // Set the default image to the main photo, fallback to first photo or image
        const mainImage = item.photos?.find((photo) => photo.is_main)?.image ||
          item.photos?.[0]?.image ||
          item.image?.[0];
        setImage(mainImage);
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return (
    <AnimatePresence>
      {productData ? (
        <motion.div
          key="product"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="border-t-2 pt-10 bg-gradient-to-b from-gray-50 to-white min-h-screen"
        >
          {/* ------- Product Data ------- */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-12">
            {/* ------- Product Image Gallery ------- */}
            <motion.div
              className="flex-1 flex flex-col gap-6"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Main Image */}
              <motion.div
                className="relative w-full bg-white rounded-xl shadow-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={image}
                  alt={productData.name}
                  className="w-full h-[400px] sm:h-[500px] object-contain rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute top-4 right-4 bg-white/80 px-2 py-1 rounded-full text-sm text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {productData.photos?.findIndex((photo) => photo.image === image) + 1} / {productData.photos?.length}
                </motion.div>
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {productData.photos?.map((item, index) => (
                  <motion.div
                    key={index}
                    onClick={() => setImage(item.image)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${image === item.image ? 'border-red-500' : 'border-gray-200'}`}
                    whileHover={{ scale: 1.1, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src={item.image} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* -------- Product Details -------- */}
            <motion.div
              className="flex-1 flex flex-col gap-6"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h1
                className="text-3xl font-bold text-gray-900"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                {productData.name}
              </motion.h1>
              <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                    className="w-4 h-4"
                  />
                ))}
                <p className="text-sm text-gray-600">(122 reviews)</p>
              </motion.div>
              <motion.p
                className="text-4xl text-red-600 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                {currency}
                {productData.price.toLocaleString()}
              </motion.p>
              <motion.p
                className="text-gray-600 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                {productData.description}
              </motion.p>
              {productData.sizes && (
                <motion.div
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  <p className="text-sm font-medium text-gray-700">Select Size</p>
                  <div className="flex gap-3 flex-wrap">
                    {productData.sizes.map((item, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setSize(item)}
                        className={`border-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${item === size ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
              <motion.button
                onClick={() => addToCart(productData.id, size)}
                className="mt-4 bg-red-600 text-white py-3 px-8 rounded-full text-base font-semibold shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Add to Cart
              </motion.button>
              <motion.hr
                className="my-8 border-gray-200"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              />
              <motion.div
                className="text-sm text-gray-600 flex flex-col gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <p>100% original product.</p>
                <p>Cash on delivery available.</p>
                <p>Easy return and exchange within 7 days.</p>
              </motion.div>
            </motion.div>
          </div>

          {/* ------- Product Reviews ------- */}
          <motion.div
            className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <div className="flex gap-2 border-b">
              <motion.button
                className="px-6 py-3 text-sm font-medium text-gray-900 bg-white border-b-2 border-red-500"
                whileHover={{ backgroundColor: '#f3f4f6' }}
                transition={{ duration: 0.2 }}
              >
                Description
              </motion.button>
              <motion.button
                className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900"
                whileHover={{ backgroundColor: '#f3f4f6' }}
                transition={{ duration: 0.2 }}
              >
                Reviews (122)
              </motion.button>
            </div>
            <motion.div
              className="bg-white p-6 rounded-b-lg shadow-md text-gray-600 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              <p>
                We offer a tailored shopping experience with personalized product recommendations
                based on your preferences and browsing history. Our advanced algorithms help you
                find exactly what you need, quickly and easily. Our dedicated customer service team
                is available around the clock to assist you with any queries, issues, or feedback.
              </p>
              <p className="mt-4">
                Join our loyalty program and earn points with every purchase. Redeem your points
                for discounts, special offers, and exclusive access to new products. The more you
                shop, the more you save! Many of our products come with a manufacturer’s warranty.
              </p>
            </motion.div>
          </motion.div>

          {/* --------- Related Products --------- */}
          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </motion.div>
      ) : (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-screen flex items-center justify-center bg-gray-50"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-t-red-500 border-gray-200 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Product;
