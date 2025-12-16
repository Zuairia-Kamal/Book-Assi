
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
// import { useAuth } from "../context/AuthProvider";
// import { useEffect } from "react";

// const Login = () => {
//   const navigate = useNavigate();
//   const { signIn, signUp, signInWithGoogle } = useAuth(); // Firebase auth functions
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Email/password login
//   const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const userCredential = await signIn(email, password);
//     const token = await userCredential.user.getIdToken();

//     // Add/update user in backend
//     await fetch("http://localhost:3000/user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         email: userCredential.user.email,
//         name: userCredential.user.displayName,
//         photo: userCredential.user.photoURL,
 
//       }),
//     });

//     // Fetch user role and info
//     const res = await fetch(`http://localhost:3000/user?email=${userCredential.user.email}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const userData = await res.json();
//      setUser({
//       firebaseUser: currentUser, // Firebase user object
//       backend: data,             // Your backend info (role, etc.)
//     });

//     toast.success("Login successful!");
//     navigate("/dashboard"); // redirect
//   } catch (err) {
//     console.error(err);
//     toast.error("Login failed!");
//   }
// };

//   // Google login
// const handleGoogleLogin = async () => {
//   try {
//     await signInWithGoogle();  // triggers popup and updates user in context
//     toast.success("Google login successful!");
//     navigate("/profile");    // redirect after login
//   } catch (err) {
//     console.error(err);
//     toast.error("Google login failed!");
//   }
// };



//   const handleFacebookLogin = () => {
//     toast("Facebook login clicked!");
//   };

//   return (
//     <div className="relative min-h-screen w-full">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url('/your-books-background.jpg')" }}
//       ></div>

//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

//       <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
//         <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
//           <h2 className="text-2xl font-semibold text-center mb-6">
//             Log in or sign up in seconds
//           </h2>

//           {/* Google */}
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full border rounded-lg flex items-center gap-3 py-3 px-4 mb-3 hover:bg-gray-100 transition"
//           >
//             <FcGoogle size={22} /> Continue with Google
//           </button>

//           {/* Facebook */}
//           <button
//             onClick={handleFacebookLogin}
//             className="w-full border rounded-lg flex items-center gap-3 py-3 px-4 mb-3 hover:bg-gray-100 transition"
//           >
//             <FaFacebook className="text-blue-600" size={20} /> Continue with Facebook
//           </button>

//           {/* Email + Password Form */}
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div>
//               <label className="block font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 className="w-full border rounded-lg px-3 py-2"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block font-medium mb-1">Password</label>
//               <input
//                 type="password"
//                 className="w-full border rounded-lg px-3 py-2"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               Login
//             </button>
//           </form>

//           <p className="text-center text-xs mt-6 text-gray-500">
//             By continuing, you agree to our Terms of Use and Privacy Policy.
//           </p>

//           <p className="text-center mt-4 text-sm">
//             Don't have an account?{" "}
//             <a href="/register" className="text-blue-600 hover:underline">
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// src/Pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signIn(email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Login failed!");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Google login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed!");
    }
  };

  const handleFacebookLogin = () => {
    toast("Facebook login clicked!");
  };

  return (
    <div className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/your-books-background.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Log in or sign up
          </h2>

          {/* Google login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border rounded-lg flex items-center gap-3 py-3 px-4 mb-3 hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>

          {/* Facebook login */}
          <button
            onClick={handleFacebookLogin}
            className="w-full border rounded-lg flex items-center gap-3 py-3 px-4 mb-3 hover:bg-gray-100 transition"
          >
            <FaFacebook className="text-blue-600" size={20} /> Continue with Facebook
          </button>

          {/* Email/password form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-xs mt-6 text-gray-500">
            By continuing, you agree to our Terms of Use and Privacy Policy.
          </p>

          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
