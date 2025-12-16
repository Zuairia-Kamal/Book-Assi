import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthProvider";

const MyOrders = () => {
  const { user } = useAuth();
  const { axiosInstance, loading } = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosInstance.get("/my-orders");
      return res.data;
    },
  });

  // 🔴 PAY
  const handlePay = async (order) => {
    const res = await axiosInstance.post("/create-checkout-session", {
      orderId: order._id,
      bookTitle: order.bookTitle,
      price: order.price,
    });

    window.location.replace(res.data.url);
  };

  // 🔴 CANCEL
  const handleCancel = async (orderId) => {
    await axiosInstance.patch(`/orders/${orderId}/cancel`);
    refetch(); // ✅ THIS IS WHY IT UPDATES
  };

  if (isLoading || loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Book</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.bookTitle}</td>

              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td>{order.status}</td>

              <td>{order.paymentStatus}</td>

              <td className="space-x-2">
                {/* ✅ CANCEL */}
                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="btn btn-error btn-sm"
                  >
                    Cancel
                  </button>
                )}

                {/* ✅ PAY */}
                {order.status === "pending" &&
                  order.paymentStatus === "unpaid" && (
                    <button
                      onClick={() => handlePay(order)}
                      className="btn btn-success btn-sm"
                    >
                      Pay Now
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
