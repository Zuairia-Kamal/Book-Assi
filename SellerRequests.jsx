import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";

const SellerRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/sellerRequests", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch seller requests");

        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching seller requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading seller requests...</p>;

  if (!requests.length) return <p>No seller requests found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Seller Requests</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Requested At</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="border px-4 py-2">{req.name}</td>
              <td className="border px-4 py-2">{req.email}</td>
              <td className="border px-4 py-2">{new Date(req.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2">{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerRequests;
