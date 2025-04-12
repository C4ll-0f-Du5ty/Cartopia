// import PropTypes from 'prop-types';
import { Mail, Phone, UserIcon, LinkIcon } from 'lucide-react';
import {useContext, useState, useEffect} from 'react'
import AuthContext from '../../Context/AuthContext';

function UserCard() {

    const {authTokens} = useContext(AuthContext)
    const [user, setUser] = useState()
    useEffect(() => {
        // Fetch user profile from API
        async function fetchProfile() {
          const response = await fetch("http://localhost:8000/users/profile/", {
            headers: { Authorization: `Dusty ${authTokens?.access}` },
          });
          const data = await response.json();
          setUser(data?.['0']);
    
        //   setImagePreview(data?.['0']?.['profile_picture']);
        }
        fetchProfile();
      }, []);
  return (
    <div className="relative max-w-md mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
      
      {/* Card Content */}
      <div className="relative z-10">
        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={user?.profile_picture} 
              alt={user?.name}
              className="relative w-24 h-24 rounded-full border-4 border-white/10 object-cover shadow-xl"
            />
          </div>
          
          {/* User? Info */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
            <p className="text-pink-100 font-medium">{user?.role}</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white">
                #{user?.username}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{user?.stats?.followers}</p>
            <p className="text-sm text-pink-100">Followers</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{user?.stats?.following}</p>
            <p className="text-sm text-pink-100">Following</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
            <p className="text-2xl font-bold text-white">{user?.stats?.posts}</p>
            <p className="text-sm text-pink-100">Posts</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-pink-200" />
            <span className="text-white/90">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-pink-200" />
            <span className="text-white/90">{user?.phone}</span>
          </div>
        </div>

        {/* Social Links */}
        {/* <div className="mt-6 flex gap-4">
          {user.socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <social.icon className="w-5 h-5 text-white" />
            </a>
          ))}
        </div> */}
      </div>
    </div>
  );
};

// UserCard.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     role: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired,
//     avatar: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
//     stats: PropTypes.shape({
//       followers: PropTypes.number,
//       following: PropTypes.number,
//       posts: PropTypes.number,
//     }),
//     socials: PropTypes.arrayOf(
//       PropTypes.shape({
//         url: PropTypes.string,
//         icon: PropTypes.elementType,
//       })
//     ),
//   }).isRequired,
// };

export default UserCard;
