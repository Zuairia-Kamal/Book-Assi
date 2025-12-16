import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // <-- NEW
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      toast.error("Password must be strong!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),  // <-- SEND ROLE
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          
          <input type="text" name="name" placeholder="Name" className="input input-bordered w-full"
            value={formData.name} onChange={handleChange} required />

          <input type="email" name="email" placeholder="Email" className="input input-bordered w-full"
            value={formData.email} onChange={handleChange} required />

          <input type="password" name="password" placeholder="Password"
            className="input input-bordered w-full"
            value={formData.password} onChange={handleChange} required />

          <label className="block font-medium">Select Role</label>
          <select name="role" value={formData.role} onChange={handleChange}
            className="select select-bordered w-full" required>
            <option value="">Choose user type</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="librarian">Librarian</option>
            <option value="customer">Customer</option>
          </select>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

