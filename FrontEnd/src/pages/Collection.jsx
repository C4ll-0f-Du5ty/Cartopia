import { useContext, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import AuthContext from '../Context/AuthContext';

const Collection = () => {
  const { products, categoryMap, search } = useContext(AuthContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Compute all descendant IDs for each category
  const descendantMap = useMemo(() => {
    const map = {};

    const getDescendants = (catId) => {
      const descendants = [];
      const cat = categoryMap[catId];
      if (cat?.subcategories?.length > 0) {
        cat.subcategories.forEach((subCat) => {
          descendants.push(subCat.id);
          descendants.push(...getDescendants(subCat.id));
        });
      }
      return descendants;
    };

    Object.keys(categoryMap).forEach((catId) => {
      map[catId] = getDescendants(catId);
    });

    // console.log('Descendant Map:', map);
    return map;
  }, [categoryMap]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      const newSelected = prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId];

      const cat = categoryMap[categoryId];
      // console.log('Toggled Category:', cat);

      if (cat?.subcategories?.length > 0 && !prev.includes(categoryId)) {
        setOpenCategories((prevOpen) =>
          prevOpen.includes(categoryId) ? prevOpen : [...prevOpen, categoryId]
        );
      }

      // close the Category when unChecked
      // if (prev.includes(categoryId)) {
      //   setOpenCategories((prevOpen) => prevOpen.filter((c) => c !== categoryId));
      // }

      // console.log('Selected Categories:', newSelected);
      return newSelected;
    });
  };

  const toggleSubCategorySection = (categoryId) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]
    );
    // console.log('Open Categories:', openCategories);
  };

  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) => {
        const itemCategoryId = item.category;
        const matches = selectedCategories.some((selectedId) => {
          return (
            itemCategoryId === selectedId ||
            descendantMap[selectedId]?.includes(itemCategoryId)
          );
        });
        return matches;
      });
    }

    switch (sortType) {
      case 'low-high':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'high-low':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }

    // console.log('Filtered Products:', filtered);
    setFilterProducts((prev) =>
      JSON.stringify(prev) !== JSON.stringify(filtered) ? filtered : prev
    );
  }, [products, selectedCategories, search, sortType, categoryMap, descendantMap]);

  // Render category tree recursively
  const renderCategory = (cat, depth = 0) => {
    // Always use the full category object from categoryMap
    const fullCat = categoryMap[cat.id] || cat;
    // console.log(`Rendering ${fullCat.name} (ID: ${fullCat.id}):`, fullCat);

    return (
      <div key={fullCat.id} style={{ marginLeft: `${depth * 1.5}rem` }}>
        <label className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
          <input
            type="checkbox"
            value={fullCat.id}
            checked={selectedCategories.includes(fullCat.id)}
            onChange={() => toggleCategory(fullCat.id)}
            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
          />
          {fullCat.name}
        </label>
        {fullCat?.subcategories?.length > 0 && (
          <>
            <motion.button
              onClick={() => toggleSubCategorySection(fullCat.id)}
              className="ml-6 text-xs text-blue-500 hover:underline flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              {openCategories.includes(fullCat.id) ? 'Hide' : 'Show'} Subcategories
              <motion.span
                animate={{ rotate: openCategories.includes(fullCat.id) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {openCategories.includes(fullCat.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 flex flex-col gap-2"
                >
                  {fullCat.subcategories.map((subCat) => renderCategory(subCat, depth + 1))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Filter Section */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-w-64 bg-white p-4 rounded-lg shadow-lg border border-gray-200"
      >
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl font-semibold flex items-center cursor-pointer gap-2 text-gray-800 hover:text-blue-600 transition-colors"
        >
          FILTERS
          <motion.img
            src="/path/to/dropdown_icon.png"
            className={`h-4 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            animate={{ rotate: showFilter ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </p>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showFilter || window.innerWidth >= 640 ? 'auto' : 0,
            opacity: showFilter || window.innerWidth >= 640 ? 1 : 0,
          }}
          className="border border-gray-200 p-4 mt-6 rounded-lg overflow-hidden"
        >
          <p className="mb-3 text-sm font-medium text-gray-700">CATEGORIES</p>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            {Object.values(categoryMap)
              .filter((cat) => !cat.parent_category)
              .map((cat) => renderCategory(cat))}
          </div>
        </motion.div>
      </motion.div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <Title text1={'ALL'} text2={'PRODUCTS'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-200 text-sm px-3 py-2 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price Low</option>
            <option value="high-low">Sort by: Price High</option>
          </select>
        </div>

        <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" layout>
          <AnimatePresence>
            {filterProducts.map((item) => (
              <motion.div
                key={item.id || item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
              >
                {console.log('item', item)}
                <ProductItem
                  id={item.id || item._id}
                  image={
                    item.photos?.filter((photo) => photo.is_main)[0]?.image
                    // ||
                    // item.photos?.[0]?.image ||
                    // item.image?.[0]
                  }
                  name={item.name}
                  price={parseFloat(item.price)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Collection;
