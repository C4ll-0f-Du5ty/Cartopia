import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


import p_img1 from '../assets/p_img1.jpg'
import p_img2_1 from '../assets/p_img2_1.jpg'
import p_img2_2 from '../assets/p_img2_2.jpg'
import p_img2_3 from '../assets/p_img2_3.jpg'
import p_img2_4 from '../assets/p_img2_4.jpg'
import p_img3 from '../assets/p_img3.jpg'
import p_img4 from '../assets/p_img4.jpg'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {

    const temp = localStorage.getItem("authTokens")
    let [authTokens, setAuthTokens] = useState(() => temp ? JSON.parse(temp) : null)
    let [user, setUser] = useState(() => temp ? jwtDecode(temp) : null)
    let [loading, setLoading] = useState(true)

    let loginUser = async (e) => {
        console.log("Welcome")
        let response = await fetch("http://127.0.0.1:8000/api/token/",
            {
                method: "POST",
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify(
                    {
                        'username': e.target.username.value,
                        'password': e.target.password.value,
                    }
                )
            }
        )
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data))
            setLoading(true)
            return true
        }
        else {
            toast.error("Wrong Credentials", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        setLoading(false)
        // history.push('/login')
    }

    let updateToken = async () => {
        console.log("updated!!")
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

        if (loading) {
            setLoading(false)
        }
    }


    // For E-Commerce: -------------------------------------------------------------------------------

    const products = [
        {
            _id: "aaaaa",
            name: "Arsenal Shirt - Black ",
            description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
            price: 5,
            image: [p_img1],
            category: "adidas",
            subCategory: "fan",
            sizes: ["S", "M", "L"],
            date: 1716634345448,
            bestseller: true
        },
        {
            _id: "aaaab",
            name: "Carlsberg Shirt - Red",
            description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
            price: 5,
            image: [p_img2_1,p_img2_2,p_img2_3,p_img2_4],
            category: "nike",
            subCategory: "fan",
            sizes: ["M", "L", "XL"],
            date: 1716621345448,
            bestseller: true
        },
        {
            _id: "aaaac",
            name: "Emirates Shirt - Red and White",
            description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
            price: 17,
            image: [p_img3],
            category: "puma",
            subCategory: "player",
            sizes: ["S", "L", "XL"],
            date: 1716234545448,
            bestseller: true
        },
        {
            _id: "aaaad",
            name: "AIA Shirt - Light Blue",
            description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
            price: 7,
            image: [p_img4],
            category: "nike",
            subCategory: "fan",
            sizes: ["S", "M", "XXL"],
            date: 1716621345448,
            bestseller: true
        }
    ]

    const currency = '$';
    const delivery_fee = 2;
    const [search, setSearch] = useState('');
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async (itemId,size) => {

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

    const updateQuantity = async(itemId, size, quantity) => {

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


    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser, // return the function here
        logoutUser: logoutUser,
        updateToken: updateToken,
        navigate: navigate,
        products: products,
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
            console.log(loading)
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
