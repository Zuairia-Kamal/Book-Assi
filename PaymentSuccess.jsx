// src/pages/PaymentSuccess.jsx
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function PaymentSuccess() {
  const [search] = useSearchParams();
  const sessionId = search.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      toast.error("Missing payment session");
      return;
    }

    const confirmPayment = async () => {
      try {
        await axios.post("http://localhost:3000/confirm-payment", {
          sessionId,
        });

        toast.success("Payment successful!");
        navigate("/dashboard/my-orders");
      } catch (err) {
        console.error(err);
        toast.error("Payment confirmation failed");
      }
    };

    confirmPayment();
  }, [sessionId, navigate]);

  return (
    <div className="p-6 text-center text-lg font-semibold">
      Processing payment... Redirecting...
    </div>
  );
}
