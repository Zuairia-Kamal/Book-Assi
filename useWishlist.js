// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";

// const useWishlist = (user) => {
//   const [wishlist, setWishlist] = useState([]);

//   // Fetch wishlist from backend
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       if (!user?.email) return;

//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch(`http://localhost:3000/wishlist?email=${user.email}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch wishlist");

//         const data = await res.json();
//         // Ensure wishlist is always an array
//         setWishlist(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching wishlist:", err);
//         setWishlist([]);
//       }
//     };

//     fetchWishlist();
//   }, [user?.email]);

//   // Remove book from wishlist
//   const removeFromWishlist = async (bookId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`http://localhost:3000/wishlist/${bookId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error("Failed to remove book");

//       setWishlist((prev) => prev.filter((book) => book._id !== bookId));
//       toast.success("Book removed from wishlist!");
//     } catch (err) {
//       console.error("Error removing book:", err);
//       toast.error("Could not remove book from wishlist");
//     }
//   };

//   return { wishlist, removeFromWishlist };
// };

// export default useWishlist;
import { useState, useEffect } from "react";

const useWishlist = (email) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(`http://localhost:3000/wishlist?email=${email}`);
        if (!res.ok) throw new Error("Failed to fetch wishlist");
        const data = await res.json();
        setWishlist(data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [email]);

  return { wishlist, loading };
};

export default useWishlist;
