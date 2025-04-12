import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import AuthContext from '../Context/AuthContext';

const Collection = () => {

  const { products,search } = useContext(AuthContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    
    if (category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev=> [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev=> [...prev, e.target.value])
    }
  }


  const applyFilter = () => {
    
    let productsCopy = products.slice();

    if (search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ">
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>  
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Filter content goes here */}
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-mono text-gray-700'>
            <p className='flex gap-2'>
              <input  type="checkbox" value={'nike'} onChange={toggleCategory}/>NIKE
            </p>
            <p className='flex gap-2'>
              <input  type="checkbox" value={'adidas'} onChange={toggleCategory}/>ADIDAS
            </p>
            <p className='flex gap-2'>
              <input  type="checkbox" value={'puma'} onChange={toggleCategory}/>PUMA
            </p>
          </div>
        </div>
        {/* Sub Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          {/* Filter content goes here */}
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-mono text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" value={'player'} onChange={toggleSubCategory}/>Player
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'outlet'} onChange={toggleSubCategory}/>OutLet
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" value={'fan'} onChange={toggleSubCategory}/>Fan
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Title text1={'ALL'} text2={'PRODUCTS'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Price Low</option>
            <option value="high-low">Sort by: Price High</option>
          </select>
        </div>

        {/*Map Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item,index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default Collection;
