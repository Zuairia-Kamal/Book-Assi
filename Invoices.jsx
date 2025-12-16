import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Invoices = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const res = await axiosSecure.get("/invoices");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const invoices = Array.isArray(data) ? data : [];

  if (isLoading) return <p>Loading invoices...</p>;
  if (error) return <p>Failed to load invoices</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {invoices.length === 0 && (
          <tr>
            <td colSpan="3">No invoices found</td>
          </tr>
        )}

        {invoices.map(inv => (
          <tr key={inv._id}>
            <td>{inv.orderId}</td>
            <td>${inv.amount}</td>
            <td>{new Date(inv.createdAt).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Invoices;
