import { useContext, useEffect,  useState } from 'react'
import ProductItem  from '../components/ProductItem'
import Title from '../components/Title'
import AuthContext from '../Context/AuthContext'

const RelatedProducts = ({category,subCategory}) => {

    const { products } = useContext(AuthContext);
    const [ related,setRelated ] = useState([]);

    useEffect(() => {

        if (products.length > 0) {
            
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item)=> category === item.category);
            productsCopy = productsCopy.filter((item)=> subCategory === item.subCategory);

            setRelated(productsCopy.slice(0,5));
        }
    },[products])

  return (
    <div className='my-24'>
        <div className='flex justify-center items-center text-3xl py-2'>
            <Title text1="Related" text2="Products"/>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            { related.map((item,index) => (
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))}
        </div>
        
    </div>
  )
}

export default RelatedProducts
