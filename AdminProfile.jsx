
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";

const AdminProfile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user?.email) return;
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/user?email=${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProfileData(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile data");
      }
    };

    fetchProfile();
  }, [user]);

  if (!profileData) return <p>Loading profile...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <div className="flex flex-col gap-2">
        <p><strong>Name:</strong> {profileData.name || user.displayName}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>Role:</strong> {profileData.role || "admin"}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
