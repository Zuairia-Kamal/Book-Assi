import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminStats = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });
};

export default useAdminStats;
