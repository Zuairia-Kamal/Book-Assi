
// import { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useWishlist";


// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// const useAxiosSecure = () => {
//   const { user, loading, logOut } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading) {
//       // Add token before sending any request
//       const reqInterceptor = axiosInstance.interceptors.request.use(
//         (config) => {
//           if (user?.accessToken) {
//             config.headers.Authorization = `Bearer ${user.accessToken}`;
//           }
//           return config;
//         },
//         (error) => Promise.reject(error)
//       );

//       // Handle expired / invalid token
//       const resInterceptor = axiosInstance.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//           const status = error?.response?.status;

//           if (status === 401 || status === 403) {
//             await logOut();
//             navigate("/login");
//           }

//           return Promise.reject(error);
//         }
//       );

//       // Clean up
//       return () => {
//         axiosInstance.interceptors.request.eject(reqInterceptor);
//         axiosInstance.interceptors.response.eject(resInterceptor);
//       };
//     }
//   }, [user, loading, navigate, logOut]);

//   return axiosInstance;
// };

// export default useAxiosSecure;
// import axios from "axios";
// import { useAuth } from "../context/AuthProvider";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:3000",
// });

// const useAxiosSecure = () => {
//   const { user, loading } = useAuth();

//   axiosSecure.interceptors.request.use(
//     async (config) => {
//       if (user) {
//         const token = await user.getIdToken();
//         config.headers.authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   return { axiosInstance: axiosSecure, loading };
// };

// export default useAxiosSecure;
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use(
      config => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    axiosSecure.interceptors.response.use(
      res => res,
      error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [user, logOut, navigate]);

  // ✅ IMPORTANT: return axiosSecure directly
  return axiosSecure;
};

export default useAxiosSecure;
