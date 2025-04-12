import { useState, useEffect, useContext } from "react";
import { Card, CardContent } from "./../../components/ui/card";
import { motion } from "framer-motion";
import { Camera, Phone, Mail } from "lucide-react";
import AuthContext from './../../Context/AuthContext'
import { toast } from 'react-toastify'
import UserCard from './../../components/Cards/UserCard'


export default function UserProfile() {
  const { authTokens } = useContext(AuthContext)
  const [profile, setProfile] = useState({
    profilePicture: "",
    username: "",
    email: "",
    address: "",
  });
  const [imagePreview, setImagePreview] = useState(profile?.profilePicture);
  // const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Fetch user profile from API
    async function fetchProfile() {
      const response = await fetch("http://localhost:8000/users/profile/", {
        headers: { Authorization: `Dusty ${authTokens?.access}` },
      });
      const data = await response.json();
      setProfile(data?.['0']);

      setImagePreview(data?.['0']?.['profile_picture']);
    }
    fetchProfile();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append('profile_picture', file)
      console.log(file)
      const response = await fetch("http://localhost:8000/users/picture/", {
        method: "POST",
        headers: { Authorization: `Dusty ${authTokens?.access}` },
        body: formData,
      });
      if (response.ok) {
        toast('Profile image updated successfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast('Failed to update profile image.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };


  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-white">
      <d style={{ marginBottom: '50%' }}>
        <Card className="w-full max-w-64 shadow-xl rounded-2xl p-6 bg-gray-500" style={{ marginBottom: '50%' }}>
          <CardContent className="flex flex-col items-center">
            <motion.div
              className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700"
              whileHover={{ scale: 1.1 }}
            >
              <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
              <label className="absolute bottom-2 right-2 bg-gray-700 p-2 rounded-full cursor-pointer hover:bg-gray-600">
                <Camera size={20} className="text-white" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </motion.div>

            <div className="mt-4 text-center">
              <h2 className="text-xl font-semibold">{profile?.username || "User"}</h2>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-pink-200" />
                <span className="text-white/90">{profile?.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        </d>
      </div>
      {/* <UserCard profile={profile && profile}/> */}
    </>
  );
}
