import React from "react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/dashboard/my-orders"
          className="p-4 border rounded-lg shadow hover:shadow-lg transition"
        >
          My Orders
        </Link>

        <Link
          to="/dashboard/my-profile"
          className="p-4 border rounded-lg shadow hover:shadow-lg transition"
        >
          My Profile
        </Link>

        <Link
          to="/dashboard/invoices"
          className="p-4 border rounded-lg shadow hover:shadow-lg transition"
        >
          Invoices
        </Link>

        <Link
          to="/dashboard/wishlist"
          className="p-4 border rounded-lg shadow hover:shadow-lg transition"
        >
          My Wishlist
        </Link>
      </div>
    </div>
  );
}
