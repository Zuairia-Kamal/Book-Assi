import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useBooks = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });
};

export default useBooks;
