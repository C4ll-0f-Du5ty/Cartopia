import { createContext, useState, useEffect, useMemo } from 'react'
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {

    const temp = localStorage.getItem("authTokens")
    let [authTokens, setAuthTokens] = useState(() => temp ? JSON.parse(temp) : null)
    let [user, setUser] = useState(() => temp ? jwtDecode(temp) : null)
    let [loading, setLoading] = useState(true)
    const url = 'http://127.0.0.1:8000'
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    // Fetch products from backend
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${url}/products/`);
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            toast.error("Failed to fetch products");
            console.error(error);
        }
    };

    // Fetch categories from backend
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${url}/products/category/`);
            if (!response.ok) throw new Error('Failed to fetch categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            toast.error('Failed to fetch categories');
            console.error(error);
        }
    };

    // Memoized category map
    const categoryMap = useMemo(() => {
        const map = {};
        categories.forEach((cat) => {
            if (!cat.parent_category) {
                map[cat.id] = { ...cat, subcategories: [] };
            } else {
                const parentId = cat.parent_category.id;
                if (!map[parentId]) {
                    map[parentId] = { ...cat.parent_category, subcategories: [] };
                }
                map[parentId].subcategories.push(cat);
            }
        });
        return map;
    }, [categories]);

    let loginUser = async (e) => {
        console.log("Welcome");
        try {
            const response = await fetch(`${url}/api/token/`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    'username': e.target.username.value,
                    'password': e.target.password.value,
                }),
            });
            const data = await response.json();
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
                setLoading(true);
                return true;
            } else {
                toast.error("Wrong Credentials", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        setLoading(false)
        // history.push('/login')
    }

    let updateToken = async () => {
        console.log("updated!!")
        try {
            let response = await fetch("http://localhost:8000/api/token/refresh/",
                {
                    method: "POST",
                    headers: {
                        'content-type': "application/json",
                    },
                    body: JSON.stringify(
                        {
                            'refresh': authTokens?.refresh
                        }
                    )
                }
            )
            const data = await response.json()
            if (response.status === 200) {
                setAuthTokens(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem("authTokens", JSON.stringify(data))
            }
            else {
                logoutUser()
            }
        }
        catch {
            console.log("server is down")
        }

        if (loading) {
            setLoading(false)
        }
    }

    const currency = '$';
    const delivery_fee = 2;
    const [search, setSearch] = useState('');
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please select a size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    toast.error(error);
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

    }

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);

            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    toast.error(error);
                    // Handle the error here, e.g., log it or display an error message
                }
            }
        }

        return totalAmount;
    };




    // end --------------------------------------------------------------------------------------------

    console.log(categoryMap)
    let contextData = {
        user: user,
        url: url,
        authTokens: authTokens,
        loginUser: loginUser, // return the function here
        logoutUser: logoutUser,
        updateToken: updateToken,
        navigate: navigate,
        products: products,
        categories: categories,
        categoryMap: categoryMap,
        currency: currency,
        delivery_fee: delivery_fee,
        search: search,
        setSearch: setSearch,
        cartItems: cartItems,
        addToCart: addToCart,
        updateQuantity: updateQuantity,
        getCartAmount: getCartAmount,
        getCartCount: getCartCount
    };

    useEffect(() => {

        if (loading) {
            updateToken()
            fetchProducts();
            fetchCategories();
        }
        const interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, 1000 * 60 * 4);

        return () => clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
