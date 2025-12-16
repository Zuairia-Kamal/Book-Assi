import React from "react";
import { Link } from "react-router-dom";

export default function LibrarianDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Librarian Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
  to="/dashboard/librarian/add-book"
  className="p-4 border rounded-lg shadow hover:shadow-lg transition"
>
  Add Book
</Link>

<Link
  to="/dashboard/librarian/my-books"
  className="p-4 border rounded-lg shadow hover:shadow-lg transition"
>
  My Books
</Link>

<Link
  to="/dashboard/librarian/orders"
  className="p-4 border rounded-lg shadow hover:shadow-lg transition"
>
  Orders
</Link>

      </div>
    </div>
  );
}
