import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: "",
    status: "published",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return toast.error("You must be logged in");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", bookData.title);
      formData.append("author", bookData.author);
      formData.append("price", bookData.price);
      formData.append("status", bookData.status);
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        return toast.error(errorData.message || "Failed to add book");
      }

      await res.json();
      toast.success("Book added successfully!");
      setBookData({ title: "", author: "", price: "", status: "published" });
      setImageFile(null);
      setPreview(null);
      navigate("/dashboard/librarian/my-books");
    } catch (err) {
      console.error("Add book error:", err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          className="w-full border px-3 py-2 rounded"
          value={bookData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          className="w-full border px-3 py-2 rounded"
          value={bookData.author}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          min="0"
          step="0.01"
          className="w-full border px-3 py-2 rounded"
          value={bookData.price}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={bookData.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img src={preview} className="w-32 h-32 object-cover rounded mt-2" />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-6 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
