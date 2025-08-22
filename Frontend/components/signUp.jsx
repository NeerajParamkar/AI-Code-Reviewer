import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignUp = ({openLogin, setOpenlogin,setFname,setcheckAuth}) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [login,setLogin]=useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 

  const handleSubmit =async (e) => {
    e.preventDefault();
    let userName = formData.userName
    let email =formData.email
    let password=formData.password
    if(!login){
        try {
              const profilebackend=await axios.post("http://localhost:3000/profie",{
              userName,email,password
            },{ withCredentials: true })
            if (profilebackend.data.success) {
              localStorage.setItem("token", profilebackend.data.token);
              setFname(profilebackend.data.user.userName[0].toUpperCase())
              setcheckAuth(true)
              toast.success("🎉 Account created successfully!");
              setOpenlogin(false)
            } else {
              toast.error(profilebackend.data.message);
            }
            } catch (error) {
              toast.error(error.message)
            }
    } else {
       try {
              const profilebackend=await axios.post("http://localhost:3000/login",{
              email,password
            },{ withCredentials: true })
            if (profilebackend.data.success) {
              setFname(profilebackend.data.getUser.userName[0].toUpperCase())
              setcheckAuth(true)
              setOpenlogin(false)
              toast.success(profilebackend.data.message);
            } else {
              toast.error(profilebackend.data.message);
            }
            } catch (error) {
              toast.error(error.response?.data?.message || error.message);
            }
    }
    
    
    // here you can call your backend API to save user
  };

  return (
    <div className="absolute z-9000 w-full h-screen flex items-center justify-center ">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <button onClick={()=>setOpenlogin(false)} className="bg-gray-300 p-2 rounded-full ml-[95%] cursor-pointer">X</button>
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {login ? "Login" :"Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          {login ? (""):( <div>
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>)}
         

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition duration-300"
          >
            {login ? "Login" :"Sign Up"}
          </button>
        </form>

        {/* Footer */}
        {login ?(<p className="mt-6 text-center text-gray-600 text-sm">
          dont have account?{" "}
          <a onClick={()=>setLogin(false)} className="text-purple-600 font-semibold hover:underline cursor-pointer">
            Register here
          </a>
        </p>):(<p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a onClick={()=>setLogin(true)} className="cursor-pointer text-purple-600 font-semibold hover:underline">
            Log in
          </a>
        </p>)}
      </div>
    </div>
  );
};

export default SignUp;
