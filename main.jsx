// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { Toaster } from 'react-hot-toast'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import router from './routes/routes.jsx'
// import { AuthProvider } from './context/AuthProvider.jsx'
// import { RouterProvider } from 'react-router-dom'

// const queryClient = new QueryClient()

// createRoot(document.getElementById('root')).render(
//   <div>
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <RouterProvider router={router} />
//         <Toaster position='top-right' reverseOrder={false} />
//       </AuthProvider>
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   </div>
// )
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import router from "./routes/routes"; // Import the router object

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min cache
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} /> {/* Correct usage */}
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
