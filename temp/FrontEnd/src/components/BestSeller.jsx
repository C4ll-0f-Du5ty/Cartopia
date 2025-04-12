import { useContext, useEffect, useState } from 'react'
import Title from './Title';
import ProductItem from './ProductItem';

import AuthContext from '../Context/AuthContext';

const BestSeller = () => {

    const {products} = useContext(AuthContext)
    console.log(products)
    const [bestSeller,setBestSeller] = useState([]);

    useEffect(() => {
        const bestproducts = products.filter((item)=>(item.bestseller));
        setBestSeller(bestproducts.slice(0,5))
    }, []);

  return (
    <div className='my-8'>
        <div className='text-center py-8 text-3xl'>
            <Title text1 ={'BEST'} text2={'SELLER'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Our bestsellers are here to elevate your wardrobe. Dive in and find your new favorites today!
            </p>
        </div>

        {/* Rendering Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((item, index) => (
                    <div key={index} className="h-full flex flex-col">
                        <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
                    </div>
                ))}
            </div>

    </div>
  )
}

export default BestSeller
