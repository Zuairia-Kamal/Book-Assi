import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => console.log("Failed to load books"));
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-serif font-bold text-center mb-10 text-stone-800">
        All Books
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        {books.map((book) => (
          <div
  key={book._id}
  className="
    rounded-2xl
    overflow-hidden
    border border-[#bba58c]
    shadow-[0_6px_18px_rgba(0,0,0,0.25)]
    hover:shadow-[0_16px_32px_rgba(0,0,0,0.35)]
    hover:-translate-y-2
    transition-all duration-300
    bg-gradient-to-br from-[#f7f0e5] via-[#f2e6d4] to-[#eaddc7]
    relative
  "
  style={{
    backgroundImage:
      "url('https://www.toptal.com/designers/subtlepatterns/uploads/old_map.png')",
    backgroundBlendMode: "multiply",
    backgroundSize: "cover",
  }}
>
  <img
  src={
    book.cover ||
    book.image ||
    book.imageUrl ||
    book.coverImage ||
    "https://placehold.co/600x800?text=No+Image"
  }
  alt={book.title}
  className="h-64 w-full object-cover border-b border-[#bfa88b]"
/>


  <div className="p-5">
    <h2 className="text-xl font-semibold text-[#4b2e1e] font-serif drop-shadow-sm">
      {book.title}
    </h2>

    <p className="text-[#6b4f3f] mt-1 italic">{book.author}</p>

    <p className="text-[#8b3a2a] font-bold mt-3 text-lg drop-shadow">
      ${book.price}
    </p>

    <Link to={`/books/${book._id}`}>
      <button
        className="
          mt-5 w-full
          px-4 py-2
          bg-[#8e3b2f]
          text-[#f6e7d2]
          rounded-xl
          shadow-md
          hover:bg-[#742c23]
          hover:shadow-lg
          transition-all duration-300
          font-semibold
          tracking-wide
        "
      >
        View Details
      </button>
    </Link>
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default AllBooks;
