import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role, loading } = useRole();

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-6">
        {user && (
          <img src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} 
               className="w-14 h-14 rounded-full border mb-4" />
        )}
        <h2 className="text-xl items-center font-bold mb-6">Dashboard</h2>

        

        {role === "user" && (
          <>
            <NavLink
              to="/dashboard/my-orders"
              className={({ isActive }) => `block mb-2 p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              My Orders
            </NavLink>
            <NavLink
              to="/dashboard/wishlist"
              className={({ isActive }) => `block mb-2 p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              Wishlist
            </NavLink>
            <NavLink
              to="/dashboard/my-profile"
              className={({ isActive }) => `block mb-2 p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              Profile
            </NavLink>
          </>
        )}

        {role === "librarian" && (
          <>
            <NavLink
              to="/dashboard/librarian/add-book"
              className={({ isActive }) => `block mb-2 p-5 rounded hover:bg-gray-500 ${isActive ? "bg-gray-700" : ""}`}
            >
              Add Book
            </NavLink>
            <NavLink
              to="/dashboard/librarian/my-books"
              className={({ isActive }) => `block mb-2 p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              My Books
            </NavLink>
            <NavLink
              to="/dashboard/librarian/orders"
              className={({ isActive }) => `block mb-2 p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              Orders
            </NavLink>
          </>
        )}

        {role === "admin" && (
          <>
            <NavLink
              to="/dashboard/admin/users"
              className={({ isActive }) => `block mb-2 p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              All Users
            </NavLink>
            <NavLink
              to="/dashboard/admin/manage-books"
              className={({ isActive }) => `block mb-2 p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              Manage Books
            </NavLink>
            <NavLink
              to="/dashboard/admin/profile"
              className={({ isActive }) => `block mb-2 p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
            >
              Profile
            </NavLink>
          </>
        )}
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

