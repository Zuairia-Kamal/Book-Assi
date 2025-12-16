
// import { useAuth } from "../context/AuthProvider";
// import useAxiosSecure from "./useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";

// const useRole = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: role, isLoading: isRoleLoading } = useQuery({
//     queryKey: ["role", user?.email],
//     enabled: !loading && !!user?.email, 
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/user/role?email=${user.email}`);
//       console.log("User Role:", res.data);
//       return res.data.role;
//     },
//   });

//   return [role, isRoleLoading];
// };

// export default useRole;
import { useQuery } from "@tanstack/react-query";

const useRole = (email) => {
  return useQuery({
    queryKey: ["role", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/user/role?email=${email}`);

      if (!res.ok) {
        throw new Error("Failed to fetch role");
      }

      const data = await res.json();
      console.log("User Role:", data);

      return data || {}; // NEVER undefined
    },
  });
};

export default useRole;
