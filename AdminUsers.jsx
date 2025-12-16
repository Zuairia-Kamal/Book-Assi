import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log("Failed to load users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeAdmin = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "admin" }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: "admin" } : user
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error updating role");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin – Users List</h1>

      <div className="overflow-x-auto shadow rounded-xl">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found...
                </td>
              </tr>
            )}

            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td className="font-medium">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      user.role === "admin"
                        ? "bg-green-200 text-green-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-sm btn-outline"
                    >
                      Make Admin
                    </button>
                  )}

                  <Link
                    to={`/dashboard/user/${user._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
