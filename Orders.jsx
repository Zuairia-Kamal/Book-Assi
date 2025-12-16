import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  
  const fetchOrders = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return; 
      const token = localStorage.getItem("accessToken")
const res = await fetch("http://localhost:3000/orders", {
      headers: { Authorization: `Bearer ${token}` }
    });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();

      const res = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Order update failed");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (id) => {
    await handleStatusChange(id, "cancelled");
  };

  if (loading)
    return <p className="text-center py-10 text-xl">Loading orders...</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
            <tr>
              <th className="px-4 py-2 border">Book</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Order Date</th>
              <th className="px-4 py-2 border">Payment</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-gray-700 dark:text-gray-200">
                <td className="px-4 py-2 border">{order.bookName}</td>
                <td className="px-4 py-2 border">{order.userName}</td>
                <td className="px-4 py-2 border">{order.email}</td>
                <td className="px-4 py-2 border">
                  {new Date(order.date).toLocaleDateString()}
                </td>

                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.paymentStatus === "paid"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                <td className="px-4 py-2 border">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-100"
                    disabled={order.status === "cancelled"}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="px-4 py-2 border flex gap-2">
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
