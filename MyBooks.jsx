import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";


const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
const auth = getAuth();
  const fetchBooks = async () => {
    try {
      const token = await auth.currentUser.getIdToken(); 
      const res = await fetch("http://localhost:3000/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEdit = (id) => {
    navigate(`/dashboard/librarian/edit-book/${id}`);
  };

const handleToggleStatus = async (id, currentStatus) => {
  try {
    const token = await auth.currentUser.getIdToken(); 

    if (!token) {
      alert("Not logged in");
      return;
    }

    const publish = currentStatus !== "published";

    const res = await fetch(`http://localhost:3000/books/${id}/publish`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ publish }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    // UI update
    setBooks(prev =>
      prev.map(book =>
        book._id === id
          ? { ...book, status: data.status }
          : book
      )
    );

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};


  if (loading) return <p className="text-center py-10 text-xl">Loading books...</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        My Books
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Author</th>
              <th className="px-4 py-2 border">Price ($)</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
<tbody>
  {books.map((book) => (
    <tr key={book._id} className="text-gray-700 dark:text-gray-200">
      <td>
        <img
          src={book.image || "https://placehold.co/80x100?text=No+Image"}
          alt={book.title}
          className="w-16 h-20 object-cover rounded"
        />
      </td>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.price}</td>
      <td>
        <span
          className={`px-2 py-1 rounded text-white ${
            book.status === "published" ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          {book.status}
        </span>
      </td>
      <td>{book.orders?.length || 0}</td> 
      <td className="flex gap-2">
        <button onClick={() => handleEdit(book._id)} className="btn btn-blue">
          Edit
        </button>
        <button
          onClick={() => handleToggleStatus(book._id, book.status)}
          className={`px-3 py-1 rounded text-white ${
            book.status === "published"
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {book.status === "published" ? "Unpublish" : "Publish"}
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default MyBooks;
