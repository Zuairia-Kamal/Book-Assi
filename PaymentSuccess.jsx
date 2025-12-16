import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const updateOrder = async () => {
      if (!sessionId || !user) return;

      try {
        const token = await user.firebaseUser.getIdToken();

        const res = await axios.post(
          "http://localhost:3000/confirm-payment",
          { sessionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success("Payment successful! Order added.");
        navigate("/dashboard/my-orders"); // Redirect to orders
      } catch (err) {
        console.error(err);
        toast.error("Payment update failed");
      }
    };

    updateOrder();
  }, [sessionId, user, navigate]);

  return <div className="p-6 text-center">Processing payment... Please wait.</div>;
};

export default PaymentSuccess;




// 4000001240000000