
// import './App.css'
// import { AuthProvider } from './Context/AuthContext.jsx'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { ToastContainer} from 'react-toastify';
// import SignIn from './Auth/SignIn.jsx'
// import Home from './pages/Home.jsx'
// function App() {


//   return (
//     <>
//     <Router>
//       <AuthProvider>
//         <Routes>

//           <Route element={<SignIn />} path='/login'/>
//           <Route element={<Home />} path='/'/>
//         </Routes>

//       </AuthProvider>
//       </Router>
//     </>
//         <ToastContainer />
//   )
// }

// export default App



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './admin/AdminPage'
import { AuthProvider } from './Context/AuthContext'
import LogIn from './Auth/LogIn'
import UserProfile from './Auth/Profile/UserProfile'
import UserCard from './components/Cards/UserCard'
import AddProductForm from './Merchant/AddProductForm'
import PrivateRoute from './Private/privateRoute'
import Temp from './Merchant/Temp'
import Register from './Auth/Register'
import Merchant from './Private/Merchant'
import Error from './Private/Error'

const App = () => {
  return (

    <div className='px-4 sm:px-6 lg:px-8 md:px-7'>

      {/* Conditionally render Navbar and Footer for non-admin routes */}
      <Router>
        <AuthProvider>
          <Routes>
            {/* Routes that require Navbar and Footer */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/collection" element={<Collection />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/place-order" element={<PlaceOrder />} />
                    <Route path="/login" element={<Error><LogIn /></Error>} />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path='/profile' element={<PrivateRoute><UserProfile /></PrivateRoute>} />
                    <Route path='/card' element={<UserCard />} />
                    {/* <Route path='/temp' element={<Temp />} /> */}
                    <Route path='/add/' element={<PrivateRoute > <Merchant><AddProductForm /> </Merchant> </ PrivateRoute>} />
                    <Route path='/register/' element={<Error ><Register /> </Error >} />

                  </Routes>
                  <Footer />
                </>
              }
            />

            {/* Admin route without Navbar and Footer */}
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
