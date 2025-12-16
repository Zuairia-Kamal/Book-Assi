import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";

const EditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const auth = getAuth();
  const fetchBook = async () => {
    const token = await auth.currentUser.getIdToken();

    const res = await fetch(`http://localhost:3000/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setBook(data);
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

const handleSave = async () => {
  try {
    const token = await user.firebaseUser.getIdToken();

    const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 401 || response.status === 403) {
      throw new Error("Unauthorized Access!");
    }

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    alert("Book updated!");
    navigate("/dashboard/admin/books");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

  if (!book) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Edit Book</h2>

      <label className="block mb-2">Title</label>
      <input
        name="title"
        value={book.title}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      <label className="block mb-2">Price</label>
      <input
        name="price"
        value={book.price}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      <label className="block mb-2">Category</label>
      <input
        name="category"
        value={book.category}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      <label className="block mb-2">Description</label>
      <textarea
        name="description"
        value={book.description}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditBook;
