import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const COLORS = ["#4f46e5", "#059669", "#f59e0b", "#ef4444"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    users: {},
    orders: {},
    revenue: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await axiosSecure.get("/admin/stats");

        setStats({
          users: res.data?.users || {},
          orders: res.data?.orders || {},
          revenue: Array.isArray(res.data?.revenue)
            ? res.data.revenue
            : [],
        });
      } catch (error) {
        console.error("Failed to load admin stats:", error);

        setStats({
          users: {},
          orders: {},
          revenue: [],
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [axiosSecure]);

  if (loading) return <p>Loading admin statistics...</p>;

  /* ---------- SAFE DATA TRANSFORMS ---------- */
  const usersData = Object.entries(stats.users).map(
    ([key, value]) => ({
      name: key,
      value,
    })
  );

  const ordersData = Object.entries(stats.orders).map(
    ([key, value]) => ({
      status: key,
      count: value,
    })
  );

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* ===== USERS PIE CHART ===== */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Users by Role</h2>

        {usersData.length === 0 ? (
          <p>No user data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={usersData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {usersData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ===== ORDERS BAR CHART ===== */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">
          Orders by Status
        </h2>

        {ordersData.length === 0 ? (
          <p>No order data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ===== REVENUE LINE CHART ===== */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">
          Revenue Over Time
        </h2>

        {stats.revenue.length === 0 ? (
          <p>No revenue data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#059669"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
