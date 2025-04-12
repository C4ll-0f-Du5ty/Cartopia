import {useState, useContext} from 'react'
import AuthContext from '../Context/AuthContext'
const Login = () => {

    const [showError, setShowError] = useState(false);
    const { loginUser, navigate } = useContext(AuthContext)

    const [currentState,setCurrentState] = useState('Login');

    const from = location.state?.from?.pathname || '/'; // Previous page or default to home

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if form data is valid
        if (!e.target.username.value || !e.target.password.value) {
            setShowError(true);

        } else {
            // Submit form data
            // console.log('Form submitted:', e.target.username.value, e.target.password.value);
            setShowError(false);
            loginUser(e).then(() => {
                navigate(from, { replace: true }); // Redirect to the previous page
            });
        }
        // loginUser
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <form onSubmit={onSubmitHandler} className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl mt-10 sm:px-10">
    {showError ? (<div
            className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
            role="alert"
            >
            <p className="font-bold">Error</p>
            <p className="text-sm">
                {showError}
            </p>
            </div>) : (<div></div>)
        }
    <div className="w-full">
        <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">{currentState}</h1>
            <p className="mt-2 text-gray-500">
            {
                        currentState === 'Login' 
                        ? <p onChange={() => setCurrentState('Sing Up')} >Please Login your account to get started</p>
                        :<p onChange={() => setCurrentState('Login')} >Create an account to get started</p>
            }
            </p>
        </div>
        <div className="mt-5">
            <form action="" onSubmit={handleSubmit}>
               {currentState === 'Login' ? '':<div className="relative mt-6">
                    <input type="text" name="name" id="name" placeholder="Full Name" required className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                    <label htmlFor="name" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Full Name</label>
                </div>} 
                <div className="relative mt-6">
                    <input type="username" name="username" id="username" placeholder="Email Address" required className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="NA" />
                    <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                </div>
                <div className="relative mt-6">
                    <input type="password" name="password" id="password" placeholder="Password" required className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                    <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                </div>
                <div className="mt-4 text-left">
                    <a href="/forgot-password" className="text-sm text-gray-600 hover:underline">Forgot Password?</a>
                </div>
                <div className="my-6">
                    <button type="submit" className="w-full rounded-md bg-blue-500 active:bg-blue-700 px-3 py-4 text-white ">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
                </div>
                <p className="text-center text-sm text-gray-500">Already have an account?
                    {
                        currentState === 'Login' 
                        ? <button onClick={() => setCurrentState('Sing Up')} className=" ml-2 text-sm text-gray-600 hover:underline">Create account</button>
                        :<button onClick={() => setCurrentState('Login')} className=" ml-2 text-sm text-gray-600 hover:underline">Login</button>
                    }
                </p>
            </form>
        </div>
    </div>
</form>

  )
}

export default Login
