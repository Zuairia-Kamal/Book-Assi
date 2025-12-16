import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleRoleChange = async (newRole) => {
    try {
      await axiosSecure.patch("/update-role", { email: user.email, role: newRole });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.role}</td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => handleRoleChange("admin")}
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        >
          Make Admin
        </button>
        <button
          onClick={() => handleRoleChange("librarian")}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Make Librarian
        </button>
      </td>
    </tr>
  );
};

export default UserDataRow;

