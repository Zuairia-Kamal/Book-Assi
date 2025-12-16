import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth(); // get logged-in user from context
  const [book, setBook] = useState(null);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState({ phone: "", address: "" });
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);


   const auth = getAuth();

  // Fetch book details
  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(() => console.log("Failed to fetch book"));
  }, [id]);

  // Fetch orders for this book
  useEffect(() => {
const fetchOrders = async () => {
  if (!user || !auth.currentUser) return;
  const token = await auth.currentUser.getIdToken();

  if (!token) return console.log("No token found");

  try {
    const res = await fetch(`http://localhost:3000/orders?bookId=${id}&email=${user.email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
    const data = await res.json();
    setOrders(data);
  } catch (err) {
    console.error(err);
  }
};
    fetchOrders();
  }, [user, id]);
  

 
  // Fetch latest reviews
useEffect(() => {
  fetch("http://localhost:3000/reviews-latest")
    .then(res => res.json())
    .then(data => setReviews(data))
    .catch(err => console.error("Failed to load latest reviews", err));
}, []);



  useEffect(() => {
    if (user && openOrderModal) {
      setOrderInfo(prev => ({
        ...prev,
        name: user.displayName || "Unknown",
        email: user.email || "",
      }));
    }
  }, [user, openOrderModal]);

const handleOrder = async () => {
  if (!book || !user) return;

  try {
    setLoading(true);
    const token = await auth.currentUser.getIdToken();

    const res = await axios.post(
      "http://localhost:3000/create-checkout-session",
      {
        bookId: book._id,
        price: book.price,
        quantity: 1,
        title: book.title,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { url } = res.data;
    if (!url) throw new Error("Stripe session URL not returned");

    window.location.href = url; // redirect to Stripe checkout
  } catch (err) {
    console.error("Payment failed:", err);
    toast.error("Payment failed");
  } finally {
    setLoading(false);
  }
};


const handlePayNow = async () => {
  if (!user) return toast.error("You must be logged in");

  try {
    setLoading(true);
    const token = await auth.currentUser.getIdToken(); // ✅ correct token

    const res = await axios.post(
      "http://localhost:3000/create-checkout-session",
      {
        bookId: book._id,
        price: book.price,
        quantity: 1,
        title: book.title,
      },
      { headers: { Authorization: `Bearer ${token}` } } // send Firebase token
    );

    const { url } = res.data;
    if (!url) throw new Error("Stripe session URL not returned");

    window.location.href = url;
  } catch (err) {
    console.error("Payment failed:", err);
    toast.error("Payment failed");
  } finally {
    setLoading(false);
  }
};


  const handleCancel = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:3000/orders/${orderId}/cancel`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Cancel failed");

      const updatedOrder = await res.json();
      setOrders(orders.map(o => (o._id === updatedOrder._id ? updatedOrder : o)));
      alert("Order cancelled!");
    } catch (err) {
      console.log(err);
      alert("Cancel failed!");
    }
  };

  if (!book) return <p className="text-center py-20 text-lg">Loading book details...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">

      {/* Book Details */}
      <div className="flex flex-col md:flex-row gap-6">
       <img
  src={
    book.cover ||
    book.image ||
    book.imageUrl ||
    book.coverImage ||
    "https://placehold.co/600x800?text=No+Image"
  }
  alt={book.title}
  className="h-80 w-85 object-cover rounded-xl border-b border-[#bfa88b]"
/>

        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-600">by {book.author}</p>
          <p className="text-xl font-semibold text-blue-600">Price: ${book.price}</p>
          <p className="text-gray-700 leading-relaxed">{book.description}</p>

          {book.summary && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
              <h2 className="text-xl font-bold mb-2">Summary</h2>
              <p>{book.summary}</p>
            </div>
          )}

          <button
  onClick={() => setOpenOrderModal(true)}
  className="
    mt-4 px-10 py-3
    bg-rose-200 text-rose-900
    rounded-2xl
    shadow-md
    hover:bg-rose-300
    hover:shadow-lg
    transition-all duration-300
    font-semibold
  "
>
  Order Now
</button>

        </div>
      </div>

      {/* Order Modal */}
      {openOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 md:w-1/2 w-11/12 rounded-xl shadow-xl relative">
            <h2 className="text-xl font-bold mb-4">Complete Your Order</h2>
            <input
              type="text"
              placeholder="Name"
              value={user?.displayName || ""}
              readOnly
              className="border p-2 w-full mb-2 rounded bg-gray-100"
            />
            <input
              type="email"
              placeholder="Email"
              value={user?.email || ""}
              readOnly
              className="border p-2 w-full mb-2 rounded bg-gray-100"
            />
            <input
              type="text"
              placeholder="Phone"
              value={orderInfo.phone}
              onChange={e => setOrderInfo(prev => ({ ...prev, phone: e.target.value }))}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={orderInfo.address}
              onChange={e => setOrderInfo(prev => ({ ...prev, address: e.target.value }))}
              className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setOpenOrderModal(false)} className="btn btn-ghost">Cancel</button>
              <button onClick={handleOrder} className="btn btn-primary">Place Order</button>
            </div>
          </div>
        </div>
      )}

      {/* Orders */}
{orders.length > 0 && (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Your Orders for this Book</h2>

    {orders.slice(-1).map(order => (
      <div key={order._id} className="border p-4 rounded-lg flex justify-between items-center">
        <div>
          <p><strong>Status:</strong> {order.status || "Unknown"}</p>
          <p><strong>Payment:</strong> {order.paymentStatus || "Unknown"}</p>
          <p><strong>Date:</strong> 
            {order.date
              ? new Date(order.date).toLocaleString()
              : order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "N/A"}
          </p>
        </div>

        <div className="flex gap-2">
          {order.status === "pending" && order.paymentStatus === "unpaid" && (
            <>
              <button
  onClick={() => handlePayNow(book._id, book.price, book.title)}
  className="btn btn-success"
  disabled={loading}
>Pay Now</button>
              <button onClick={() => handleCancel(order._id)} className="btn btn-error">Cancel</button>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
)}

{/* Reviews – Pinterest Vintage Style */}
<div className="mt-10">
  <h2 className="text-4xl font-serif font-normal text-center text-stone-800 mb-10">
    Reviews
  </h2>

  {reviews.length > 0 ? (
    <div className="grid gap-1 md:grid-cols-4">
      {reviews.map(r => (
        <div
          key={r._id}
          className="
            bg-stone-50 
            border border-stone-300 
            rounded-2xl 
            p-6 
            shadow-[0_4px_12px_rgba(0,0,0,0.08)]
            hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
            transition-all
            duration-300
            backdrop-blur-sm
          "
          style={{
            backgroundImage:
              "url('https://www.toptal.com/designers/subtlepatterns/uploads/paper.png')",
          }}
        >
          {/* User name + rating */}
          <div className="flex items-start justify-between mb-4">
            <p className="font-semibold text-stone-800 text-sm tracking-wide">
              {r.userName || "Anonymous Reader"}
            </p>

            <p className="text-amber-600 font-medium text-sm">
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </p>
          </div>

          {/* Comment */}
          <p className="text-stone-700 leading-relaxed font-light">
            {r.comment}
          </p>

          {/* Divider */}
          <div className="mt-4 border-t border-stone-300/60"></div>

          {/* Footer */}
          <p className="text-xs text-stone-500 italic mt-2">
            Posted recently
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-stone-500 italic text-lg">
      No reviews yet — be the first!
    </p>
  )}
</div>


    </div>
  );
};

export default BookDetails;
