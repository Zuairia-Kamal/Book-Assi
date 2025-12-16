import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthProvider";
import CoverageMap from "../components/CoverageMap";


const Home = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch latest books
  useEffect(() => {
    fetch("http://localhost:3000/books-latest")
      .then((res) => res.json())
      .then((data) => setLatestBooks(data.slice(0, 6)))
      .catch(() => console.log("Failed to load books"));
  }, []);

  // Fetch latest reviews
  useEffect(() => {
    fetch("http://localhost:3000/reviews-latest") 
      .then(res => res.json())
      .then(data => setReviews(data.slice(0, 5))) 
      .catch(() => console.log("Failed to load latest reviews"));
  }, []);
  // Hero slides
  const heroSlides = [
    {
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      title: "Discover New Worlds",
      text: "Thousands of books delivered right to your door."
    },
    {
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      title: "Read Anytime",
      text: "Build your own library with BookCourier."
    },
    {
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      title: "Fast Delivery",
      text: "We deliver books to multiple cities across the country."
    }
  ];

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const whyChooseUs = [
    { title: "Fast Delivery", text: "Get your favorite books right at your doorstep." },
    { title: "Affordable Prices", text: "Books at the best prices with exclusive deals." },
    { title: "Huge Collection", text: "Explore books from every genre and category." }
  ];

  const features = ["📦 Secure Packaging", "💳 Easy Payment", "⭐ User Ratings"];

  return (
    <div className="space-y-20 pb-20">

      {/* Hero Carousel */}
      <div className="w-full h-[400px] md:h-[500px] overflow-hidden relative">
        <AnimatePresence>
          {heroSlides.map((slide, idx) =>
            idx === currentSlide ? (
              <motion.div
                key={idx}
                className="absolute inset-0 w-full h-full"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1 }}
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
                  <h2 className="text-3xl md:text-5xl font-bold">{slide.title}</h2>
                  <p className="mt-3 max-w-xl">{slide.text}</p>
                  <Link
                    to="/books"
                    className="btn mt-5 px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
                  >
                    Browse All Books
                  </Link>
                </div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-4 flex items-center space-x-3 z-50">
        {user ? (
          <Link to="/profile" className="flex items-center gap-2">
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <span className="font-medium text-white">
              {user.displayName || "User"}
            </span>
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200"
          >
            Login
          </Link>
        )}
      </div>



{/* Latest Books */}
<section className="container mx-auto px-5 py-16 bg-[#fdf6ed] rounded-3xl shadow-inner shadow-[#e2d8c6]/40">
  <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-[#4b3a2f] tracking-wide">
    Latest Books
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    {latestBooks.map((book) => (
      <motion.div
        key={book._id}
        whileHover={{ scale: 1.03, rotate: -1 }}
        className="
          p-5 bg-[#fffdf8] border border-[#e0d4c4] 
          rounded-2xl shadow-lg shadow-[#d6c7b4]/50 
          transition-transform duration-300 cursor-pointer
          hover:shadow-2xl
        "
      >
        {/* <img
          src={book.cover || "https://placehold.co/300x400?text=No+Image"}
          alt={book.title}
          className="w-full h-60 object-cover rounded-xl mb-4 border border-[#e0d4c4]"
        /> */}
        <img
  src={
    book.cover ||
    book.image ||
    book.imageUrl ||
    book.coverImage ||
    "https://placehold.co/600x800?text=No+Image"
  }
  alt={book.title}
  className="h-64 w-full object-cover border-b border-[#bfa88b]"
/>

        <h3 className="text-lg md:text-xl font-serif font-semibold text-[#4b3a2f] mb-1">{book.title}</h3>
        <p className="text-sm text-[#6b5749] italic mb-3">{book.author}</p>
        <Link
          to={`/books/${book._id}`}
          className="
            inline-block w-full py-2 px-4 text-white font-semibold 
            bg-[#c79b78] rounded-xl hover:bg-[#b38a67] transition-colors
            shadow-md shadow-[#b29f8a]/40
          "
        >
          View Details
        </Link>
      </motion.div>
    ))}
  </div>
</section>




      {/* Why Choose US */}
 <section className="container mx-auto px-5 py-20">
  <h2 className="text-4xl font-serif font-bold text-center mb-14 text-[#5a4638]">
    Why Choose Us
  </h2>

  <div className="grid md:grid-cols-3 gap-10">
    {whyChooseUs.map((item, idx) => (
      <motion.div
        key={idx}
        whileHover={{ rotate: -1, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        className="
          p-7 rounded-2xl shadow-md 
          bg-[#faf4ec] 
          border border-[#e5d8c8]
          text-[#4c3b2f]
          relative
          before:absolute before:-top-3 before:right-6 before:w-10 before:h-10 
          before:bg-[url('https://i.ibb.co/HSshmFp/children-in-love-cute-teens-using-tablet-vector-40573693.jpg')] before:bg-contain before:bg-no-repeat
        "
        style={{ fontFamily: `'Cormorant Garamond', serif` }}
      >
        <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>

        <p className="text-[16px] leading-relaxed opacity-90">
          {item.text}
        </p>
      </motion.div>
    ))}
  </div>
</section>


{/* Vintage Pinterest CTA */}
<motion.section
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="
    relative mx-auto my-20 px-8 py-2 max-w-5xl text-center
    bg-[#f7f2e9] rounded-3xl shadow-xl shadow-[#bfae98]/40
    border border-[#e0d4c4] overflow-hidden
  "
>
  {/* Top Decorative Image */}
  <div className="absolute top-0 left-0 w-full pointer-events-none">
    <img 
      src='https://i.ibb.co/HSshmFp/children-in-love-cute-teens-using-tablet-vector-40573693.jpg'
      className="w-full opacity-20 object-cover"
      alt="Vintage top decoration"
    />
  </div>

  {/* Grain / Paper Texture Overlay */}
  <div
    className="absolute inset-0 pointer-events-none opacity-20"
    style={{ backgroundImage: "url('https://i.ibb.co/35T2WL42/students-reading-books-together-vector-43588859.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
  />

  {/* Heading */}
  <h2 className="relative text-4xl md:text-5xl font-serif font-bold text-[#23160e] drop-shadow-sm tracking-wide">
    Join 10,000+ Happy Readers
  </h2>

  {/* Description */}
  <p className="relative mt-4 max-w-2xl mx-auto text-[#4a2403] text-lg font-light">
    Be part of a warm and cozy community of book lovers, collectors, and readers.
    Also Want to Feel the Texture We Have Library-to-Home Delivery System.
  </p>

  {/* Decorative underline / illustration */}
  <img
    src="https://i.ibb.co/4RT9bP74/couple-reading-together-vector-39008570.jpg"
    alt="handwritten underline"
    className="relative mx-auto mt-6 w-36 opacity-90"
  />

  {/* CTA Button */}
  <button
    className="
      relative mt-10 px-12 py-3 rounded-xl
      bg-[#d8c4ac] hover:bg-[#cdb59b]
      text-[#130e0a] font-semibold
      // shadow-md shadow-[#b29f8a]/40
      transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
    "
  >
    Join the Community
  </button>

  {/* Bottom Decorative Image */}
  <div className="absolute bottom-0 left-0 w-full rotate-180 pointer-events-none">
    <img 
      src='https://i.ibb.co/4RT9bP74/couple-reading-together-vector-39008570.jpg'
      className="w-full opacity-20 object-cover"
      alt="Vintage bottom decoration"
    />
  </div>
</motion.section>


      {/* Features Section */}
      <section className="container mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-10">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 text-center"
            >
              {feature}
            </motion.div>
          ))}
        </div>
      </section>

     {/* Final CTA - Vintage Classy */}
<section className="py-20 px-6 bg-[#2e3b29]">
  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

    {/* CARD 1 */}
    <div
      className="relative h-[420px] rounded-2xl shadow-xl overflow-hidden group"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/qM63dYzv/81k-Yj5-Uyu8-L-1-682x1024.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>
      <h3 className="absolute bottom-6 left-6 text-4xl text-white font-extralight tracking-widest">
        Romantic
        <br />
        Books
      </h3>
    </div>

    {/* CARD 2 */}
    <div
      className="relative h-[420px] rounded-2xl shadow-xl overflow-hidden group"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/Z17kDnvw/the-complete-novel-of-sherlock-holmes.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>
      <h3 className="absolute bottom-6 left-6 text-4xl text-white font-extralight tracking-widest">
       
        <br />
       
      </h3>
    </div>

    {/* CARD 3 */}
    <div
      className="relative h-[420px] rounded-2xl shadow-xl overflow-hidden group"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/ymVtdF1n/12725711-UX160.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>
      <h3 className="absolute bottom-6 left-6 text-4xl text-white font-extralight tracking-widest">
       International 
        <br />
        Collection
      </h3>
    </div>

  </div>
</section>

{/* Coverage Section */}
<section className="container mx-auto px-5 py-20 bg-[#f3f1ec] rounded-3xl shadow-inner shadow-[#e2d8c6]/40">
  <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 text-[#4b3a2f] tracking-wide">
    Coverage Area
  </h2>
  <p className="text-center mb-8 text-[#6b5749]">
    We deliver books to the following cities:
  </p>
  <CoverageMap />
</section>

{/* Latest Reviews Section - Vintage */}
<section className="container mx-auto px-5 mt-16">
  <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-yellow-900 tracking-wide">
    What Readers Are Saying
  </h2>

  {reviews.length > 0 ? (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((r) => (
        <motion.div
          key={r._id}
          whileHover={{ translateY: -6, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
          className="bg-yellow-50 rounded-2xl p-6 shadow-lg border border-yellow-200 transition-transform duration-300 flex flex-col justify-between"
        >
          <div className="mb-4">
            <p className="font-serif font-semibold text-yellow-900 text-lg">{r.userName || "Anonymous"}</p>
            <p className="text-yellow-800 mb-2 italic">{r.bookName || "Unknown Book"}</p>
            <p className="text-yellow-900/90">{r.comment}</p>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-yellow-700 font-semibold">⭐ {r.rating}/5</span>
            <span className="text-xs text-yellow-600">{new Date(r.createdAt).toLocaleDateString()}</span>
          </div>
        </motion.div>
      ))}
    </div>
  ) : (
    <p className="text-center text-yellow-800 text-lg mt-6">
      No reviews yet. Be the first to share your thoughts!
    </p>
  )}
</section>

    </div>
  );
};

export default Home;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import CoverageMap from "../components/CoverageMap";
// // import BookCard from "../components/BookCard";
// import useAxiosSecure from "../hooks/useAxiosSecure";

// const Home = () => {
//   const axiosSecure = useAxiosSecure();
//   const [latestBooks, setLatestBooks] = useState([]);

// useEffect(() => {
//   axiosSecure.get("/books")
//     .then(res => {
//       console.log("Books API response:", res.data); 
//       const data = res.data?.data ?? res.data ?? [];
//       const booksArray = Array.isArray(data) ? data : Object.values(data);
//       setLatestBooks(booksArray.slice(-6).reverse());
//     })
//     .catch(err => console.error("Fetch latest books error:", err));
// }, [axiosSecure]);


//   return (
//     <div className="space-y-24">

//       {/* ================= Banner / Slider ================= */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//         <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">
//               Your Favorite Books, Delivered to Your Doorstep
//             </h1>
//             <p className="text-lg mb-8 opacity-90">
//               Discover thousands of books from trusted libraries and get them delivered fast and securely.
//             </p>
//             <Link
//               to="/books"
//               className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
//             >
//               Browse All Books
//             </Link>
//           </motion.div>

//           <motion.img
//             src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
//             alt="Books"
//             className="rounded-2xl shadow-xl"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           />
//         </div>
//       </section>

//       {/* ================= Latest Books ================= */}

//       {/* Latest Books Section */}
//       <section className="container mx-auto px-5 py-16 bg-[#fdf6ed] rounded-3xl shadow-inner shadow-[#e2d8c6]/40">
//         <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-[#4b3a2f] tracking-wide">
//           Latest Books
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
//           {latestBooks.length > 0 ? (
//             latestBooks.map(book => (
//               <motion.div
//                 key={book._id}
//                 whileHover={{ scale: 1.03, rotate: -1 }}
//                 className="p-5 bg-[#fffdf8] border border-[#e0d4c4] rounded-2xl shadow-lg shadow-[#d6c7b4]/50 transition-transform duration-300 cursor-pointer hover:shadow-2xl"
//               >
//                 <img
//                   src={book.cover || "https://placehold.co/300x400?text=No+Image"}
//                   alt={book.title}
//                   className="w-full h-60 object-cover rounded-xl mb-4 border border-[#e0d4c4]"
//                 />
//                 <h3 className="text-lg md:text-xl font-serif font-semibold text-[#4b3a2f] mb-1">{book.title}</h3>
//                 <p className="text-sm text-[#6b5749] italic mb-3">{book.author}</p>
//                 <Link
//                   to={`/books/${book._id}`}
//                   className="inline-block w-full py-2 px-4 text-white font-semibold bg-[#c79b78] rounded-xl hover:bg-[#b38a67] transition-colors shadow-md shadow-[#b29f8a]/40"
//                 >
//                   View Details
//                 </Link>
//               </motion.div>
//             ))
//           ) : (
//             <p className="text-center col-span-3">No books found.</p>
//           )}
//         </div>
//       </section>

//       {/* ================= Coverage ================= */}
//       <section className="bg-gray-100 dark:bg-gray-900 py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-3xl font-bold mb-10 text-center">Our Delivery Coverage</h2>
//           <CoverageMap />
//         </div>
//       </section>

//       {/* ================= Why Choose Us ================= */}
//       <section className="max-w-7xl mx-auto px-6">
//         <h2 className="text-3xl font-bold mb-12 text-center">Why Choose BookCourier?</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {['Fast Delivery', 'Trusted Libraries', 'Secure Payments'].map((title, i) => (
//             <motion.div
//               key={i}
//               className="p-8 rounded-2xl shadow bg-white dark:bg-gray-800 text-center"
//               whileHover={{ y: -8 }}
//             >
//               <h3 className="text-xl font-semibold mb-4">{title}</h3>
//               <p className="text-gray-600 dark:text-gray-300">
//                 We ensure quality service with verified sellers and safe transactions every time.
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ================= Extra Section: CTA ================= */}
//       <section className="bg-indigo-600 text-white py-20">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-3xl font-bold mb-6">Start Your Reading Journey Today</h2>
//           <p className="mb-8 opacity-90">Join thousands of readers using BookCourier</p>
//           <Link
//             to="/register"
//             className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
//           >
//             Get Started
//           </Link>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;