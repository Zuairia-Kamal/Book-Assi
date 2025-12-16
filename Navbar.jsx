// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
// import { useAuth } from "../context/AuthProvider";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [dashOpen, setDashOpen] = useState(false);
//   const [libOpen, setLibOpen] = useState(false);
//   const [dark, setDark] = useState(false);

//   const { user, logOut } = useAuth();

//   const toggleTheme = () => {
//     setDark(!dark);
//     document.documentElement.classList.toggle("dark");
//   };

//   return (
//     <nav className="border-b dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
//       <div className="container mx-auto flex justify-between items-center px-4 py-4">
        
//         {/* Logo */}
//         <Link to="/" className="font-bold text-xl text-gray-800 dark:text-gray-100">
//           📚 Books for BookLover
//         </Link>

//         {/* ----------- DESKTOP MENU ----------- */}
//         <div className="hidden md:flex gap-6 items-center">

//           <Link
//             to="/"
//             className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
//           >
//             Home
//           </Link>

//           <Link
//             to="/books"
//             className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
//           >
//             Books
//           </Link>
//           {/* Librarian Dashboard Dropdown (side-by-side) */}
// {user && (
//   <div className="relative">
//     <button
//       onClick={() => {
//         setLibOpen(!libOpen);
//         setDashOpen(false);
//       }}
//       className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
//     >
//       Library Dashboard <ChevronDown size={18} />
//     </button>

//     {libOpen && (
//       <div className="absolute left-0 mt-2 bg-white dark:bg-gray-800 shadow-md rounded-lg w-48 p-2 z-20">
//         <Link to="/dashboard/librarian/my-books" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//           My Books
//         </Link>
//         <Link to="/dashboard/librarian/add-book" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//           Add Book
//         </Link>
//         <Link to="/dashboard/librarian/orders" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//           Orders
//         </Link>
//       </div>
//     )}
//   </div>
// )}

//           {/* User Dashboard Dropdown */}
//           {user && (
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setDashOpen(!dashOpen);
//                   setLibOpen(false);
//                 }}
//                 className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
//               >
//                 Dashboard <ChevronDown size={18} />
//               </button>

//               {dashOpen && (
//                 <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-md rounded-lg w-44 p-2 z-20">
//                   <Link to="/dashboard" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//                     Overview
//                   </Link>
//                   <Link to="/dashboard/my-orders" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//                     My Orders
//                   </Link>
//                   <Link to="/dashboard/my-profile" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//                     My Profile
//                   </Link>
//                   <Link to="/dashboard/invoices" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//                     Payments
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Library Dashboard Dropdown (ONLY for librarians) */}
//           {user?.role === "librarian" && (
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setLibOpen(!libOpen);
//                   setDashOpen(false);
//                 }}
//                 className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
//               >
//                 Library Dashboard <ChevronDown size={18} />
//               </button>

//               {libOpen && (
//                 <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-md rounded-lg w-48 p-2 z-20">
//                   <Link to="/dashboard/librarian/my-books" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//                     My Books
//                   </Link>
//                   <Link to="/dashboard/librarian/add-book" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//                     Add Book
//                   </Link>
//                   <Link to="/dashboard/librarian/orders" className="block px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//                     Orders
//                   </Link>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Login / Logout */}
//           {!user ? (
//             <Link
//               to="/login"
//               className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
//             >
//               Login
//             </Link>
//           ) : (
//             <button
//               onClick={logOut}
//               className="text-red-500 hover:text-red-700"
//             >
//               Logout
//             </button>
//           )}

//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {dark ? <Sun /> : <Moon />}
//           </button>

//           {/* Avatar */}
//           {user && (
//             <img
//               src={user.photoURL}
//               className="w-9 h-9 rounded-full border"
//               alt="User"
//             />
//           )}
//         </div>
        

//         {/* ----------- MOBILE MENU BUTTON ----------- */}
//         <button
//           className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* ----------- MOBILE MENU ----------- */}
//       {open && (
//         <div className="md:hidden flex flex-col px-4 pb-4 gap-3 border-t dark:border-gray-700 bg-white dark:bg-gray-900">

//           <Link to="/" className="py-2">Home</Link>
//           <Link to="/books" className="py-2">Books</Link>

//           {/* User Dashboard (mobile) */}
//           {user && (
//             <>
//               <h3 className="font-semibold mt-3">Dashboard</h3>
//               <Link to="/dashboard" className="py-2 px-2">Overview</Link>
//               <Link to="/dashboard/my-orders" className="py-2 px-2">My Orders</Link>
//               <Link to="/dashboard/my-profile" className="py-2 px-2">My Profile</Link>
//               <Link to="/dashboard/invoices" className="py-2 px-2">Payments</Link>
//             </>
//           )}

//           {/* Library Dashboard (mobile) */}
//           {user?.role === "librarian" && (
//             <>
//               <h3 className="font-semibold mt-3">Library Dashboard</h3>
//               <Link to="/dashboard/librarian/my-books" className="py-2 px-2">
//                 My Books
//               </Link>
//               <Link to="/dashboard/librarian/add-book" className="py-2 px-2">
//                 Add Book
//               </Link>
//               <Link to="/dashboard/librarian/orders" className="py-2 px-2">
//                 Orders
//               </Link>
//             </>
//           )}

//           {/* Login / Logout */}
//           {!user ? (
//             <Link to="/login" className="py-2"></Link>
//           ) : (
//             <button onClick={logOut} className="py-2 text-red-500">
//               Logout
//             </button>
//           )}

//           <button
//             onClick={toggleTheme}
//             className="mt-2 flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {dark ? <Sun /> : <Moon />} Theme
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [dark, setDark] = useState(false);

  const { user, logout } = useAuth();
  const role = user?.role;

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 relative z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">

        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-gray-800 dark:text-gray-100">
          📚 BookCourier For BookLover
        </Link>
         

        {/* ---------- DESKTOP ---------- */}
        <div className="hidden md:flex items-center gap-6">

          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/books" className="nav-link">Books</NavLink>

          {/* USER DASHBOARD */}
          {user && (
            <div className="relative">
              <button onClick={() => toggleDropdown("user")} className="nav-link flex items-center gap-1">
                Dashboard <ChevronDown size={16} />
              </button>

              {dropdown === "user" && (
                <div className="dropdown">
                  <Link to="/dashboard">Overview</Link>
                  <Link to="/dashboard/my-orders">My Orders</Link>
                  <Link to="/dashboard/my-profile">Profile</Link>
                  <Link to="/dashboard/invoices">Payments</Link>
                </div>
              )}
            </div>
          )}

          {/* LIBRARIAN DASHBOARD */}
          {role === "librarian" && (
            <div className="relative">
              <button onClick={() => toggleDropdown("librarian")} className="nav-link flex items-center gap-1">
                Librarian <ChevronDown size={16} />
              </button>

              {dropdown === "librarian" && (
                <div className="dropdown">
                  <Link to="/dashboard/librarian/my-books">My Books</Link>
                  <Link to="/dashboard/librarian/add-book">Add Book</Link>
                  <Link to="/dashboard/librarian/orders">Orders</Link>
                </div>
              )}
            </div>
          )}

          {/* ADMIN DASHBOARD */}
          {role === "admin" && (
            <div className="relative">
              <button onClick={() => toggleDropdown("admin")} className="nav-link flex items-center gap-1">
                Admin <ChevronDown size={16} />
              </button>

              {dropdown === "admin" && (
                <div className="dropdown">
                  <Link to="/dashboard/admin/users">Users</Link>
                  <Link to="/dashboard/admin/manage-books">Books</Link>
                  <Link to="/dashboard/admin/profile">Profile</Link>
                </div>
              )}
            </div>
          )}

          {/* AUTHY */}
          {!user ? (
            <NavLink to="/login" className="nav-link">Login</NavLink>
          ) : (
            <button onClick={logout} className="text-red-500">Logout</button>
          )}

          {/* THEME */}
          <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            {dark ? <Sun /> : <Moon />}
          </button>

          {/* AVATAR
          {user && (
            <img src={user.photoURL} className="w-9 h-9 rounded-full border" />
          )} */}
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* ---------- MOBILE ---------- */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-4 space-y-2">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>

          {user && (
            <>
              <h3 className="font-semibold mt-2">Dashboard</h3>
              <Link to="/dashboard">Overview</Link>
              <Link to="/dashboard/my-orders">My Orders</Link>
            </>
          )}

          {role === "librarian" && (
            <>
              <h3 className="font-semibold mt-2">Librarian</h3>
              <Link to="/dashboard/librarian/my-books">My Books</Link>
            </>
          )}

          {role === "admin" && (
            <>
              <h3 className="font-semibold mt-2">Admin</h3>
              <Link to="/dashboard/admin/users">Users</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
