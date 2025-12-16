import { useAuth } from "../../context/AuthProvider";
import useWishlist from "../../hooks/useWishlist"; // make sure this path is correct

const Wishlist = () => {
  const { user, loading } = useAuth();
  const { wishlist = [], removeFromWishlist } = useWishlist(user); // default to []

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  // Ensure wishlist is an array before rendering
  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

  if (safeWishlist.length === 0) {
    return <p className="text-center">No books in wishlist</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {safeWishlist.map((book) => (
          <div
            key={book._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="h-48 w-full object-cover rounded mb-3"
            />

            <h3 className="font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>

            <button
              onClick={() => removeFromWishlist(book._id)}
              className="mt-3 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
