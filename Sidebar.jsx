
// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FiHome,
//   FiBook,
//   FiUser,
//   FiSettings,
//   FiMenu,
//   FiLogOut,
// } from "react-icons/fi";

// const Sidebar = ({ userRole = "user", onLogout }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   // Define sidebar links based on role
//   const links = [
//     { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
//     { name: "My Orders", path: "/dashboard/my-orders", icon: <FiBook /> },
//     { name: "My Profile", path: "/dashboard/my-profile", icon: <FiUser /> },
//     ...(userRole === "librarian"
//       ? [
//           { name: "Add Book", path: "/dashboard/librarian/add-book", icon: <FiBook /> },
//           { name: "My Books", path: "/dashboard/librarian/my-books", icon: <FiBook /> },
//           { name: "Orders", path: "/dashboard/librarian/orders", icon: <FiBook /> },
//         ]
//       : []),
//     ...(userRole === "admin"
//       ? [
//           { name: "All Users", path: "/dashboard/admin/users", icon: <FiUser /> },
//           { name: "Manage Books", path: "/dashboard/admin/manage-books", icon: <FiSettings /> },
//         ]
//       : []),
//   ];

//   return (
//     <div
//       className={`bg-gray-100 dark:bg-gray-900 h-screen p-4 flex flex-col transition-all duration-300 ${
//         isOpen ? "w-64" : "w-20"
//       }`}
//     >
//       {/* Hamburger toggle */}
//       <button
//         onClick={toggleSidebar}
//         className="mb-4 text-gray-800 dark:text-gray-200 focus:outline-none"
//       >
//         <FiMenu size={24} />
//       </button>

//       {/* Links */}
//       <nav className="flex-1 space-y-2">
//         {links.map((link) => (
//           <Link
//             key={link.name}
//             to={link.path}
//             className={`flex items-center p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors ${
//               location.pathname === link.path
//                 ? "bg-blue-500 text-white"
//                 : "text-gray-800 dark:text-gray-200"
//             }`}
//           >
//             <span className="mr-3 text-lg">{link.icon}</span>
//             {isOpen && <span>{link.name}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* Logout */}
//       <button
//         onClick={onLogout}
//         className="flex items-center p-2 mt-auto rounded-lg hover:bg-red-500 hover:text-white text-gray-800 dark:text-gray-200 transition-colors"
//       >
//         <FiLogOut className="mr-3" />
//         {isOpen && <span>Logout</span>}
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
