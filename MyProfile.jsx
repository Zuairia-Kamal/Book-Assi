

import { useAuth } from "../../context/AuthProvider";

const MyProfile = () => {
  const { user } = useAuth();

  if (!user) return <p className="p-6 text-center">No profile data found.</p>;

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="rounded-xl shadow p-6 space-y-4 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="profile"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <p className="text-xl font-semibold">{user.displayName}</p>
            <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-lg font-semibold mb-2">Account Details</p>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Role: </span>
              {user.role || "User"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
