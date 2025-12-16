import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";

// Pages - Public
import Home from "../Pages/Home";
import AllBooks from "../Pages/AllBooks";
import BookDetails from "../Pages/BookDetails";
import Login from "../pages/Login";
import Register from "../Pages/Register";
import PaymentSuccess from "../Pages/PaymentSuccess";

// Pages - User Dashboard
import MyOrders from "../dashboard/user/MyOrders";
import MyProfile from "../dashboard/user/MyProfile";
import Invoices from "../dashboard/user/Invoices";
import Wishlist from "../dashboard/user/Wishlist";

// Pages - Librarian Dashboard
import AddBook from "../dashboard/librarian/AddBook";
import MyBooks from "../dashboard/librarian/MyBooks";
import Orders from "../dashboard/librarian/Orders";
import EditBook from "../dashboard/librarian/EditBook";

// Pages - Admin Dashboard
import AdminUsers from "../dashboard/admin/AdminUsers";
import ManageBooks from "../dashboard/admin/ManageBooks";
import AdminProfile from "../dashboard/admin/AdminProfile";

// Pages - Seller Dashboard
import SellerDashboard from "../dashboard/Seller/SellerDashboard";
import SellerRequests from "../dashboard/Seller/SellerRequests";

// Routes
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import LibrarianRoute from "./LibrarianRoute";
import DashboardPage from "../Pages/DashboardPage";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "books", element: <AllBooks /> },
//       { path: "books/:id", element: <BookDetails /> },
//       { path: "login", element: <Login /> },
//       { path: "register", element: <Register /> },
//     ],
//   },
//   {
//     path: "/dashboard",
//     element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
//     children: [
     
//        { index: true, element: <DashboardPage /> },
//       { path: "my-orders", element: <MyOrders /> },
//       { path: "my-profile", element: <MyProfile /> },
//       { path: "invoices", element: <Invoices /> },
//       { path: "wishlist", element: <Wishlist /> },
//       { path: "payment/:id", element: <PaymentSuccess /> },

//       // Librarian routes
//       { path: "librarian/add-book", element: <LibrarianRoute><AddBook /></LibrarianRoute> },
//       { path: "librarian/my-books", element: <LibrarianRoute><MyBooks /></LibrarianRoute> },
//       { path: "librarian/edit-book/:id", element: <LibrarianRoute><EditBook /></LibrarianRoute> },
//       { path: "librarian/orders", element: <LibrarianRoute><Orders /></LibrarianRoute> },

//       // Admin routes
//       { path: "admin/users", element: <AdminRoute><AdminUsers /></AdminRoute> },
//       { path: "admin/manage-books", element: <AdminRoute><ManageBooks /></AdminRoute> },
//       { path: "admin/profile", element: <AdminRoute><AdminProfile /></AdminRoute> },

//       // Seller routes
//       { path: "seller/dashboard", element: <SellerDashboard /> },
//       { path: "seller/requests", element: <SellerRequests /> },
//     ],
//   },
// ]);

// export default router;
// router.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <AllBooks /> },
      { path: "books/:id", element: <BookDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "invoices", element: <Invoices /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "payment/:id", element: <PaymentSuccess /> },

      // Librarian routes as a parent
      {
        path: "librarian",
        element: <LibrarianRoute />,
        children: [
          { path: "add-book", element: <AddBook /> },
          { path: "my-books", element: <MyBooks /> },
          { path: "edit-book/:id", element: <EditBook /> },
          { path: "orders", element: <Orders /> },
        ],
      },

      // Admin routes
      { path: "admin/users", element: <AdminRoute><AdminUsers /></AdminRoute> },
      { path: "admin/manage-books", element: <AdminRoute><ManageBooks /></AdminRoute> },
      { path: "admin/profile", element: <AdminRoute><AdminProfile /></AdminRoute> },

      // Seller routes
      { path: "seller/dashboard", element: <SellerDashboard /> },
      { path: "seller/requests", element: <SellerRequests /> },
    ],
  },
]);

export default router;
