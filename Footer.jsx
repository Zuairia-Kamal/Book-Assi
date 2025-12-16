import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1f2937] text-gray-200 pt-16 pb-10 relative">

      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        <div>
          <h3 className="font-bold text-lg mb-4 text-white"> Books for BookLover</h3>
          <p className="text-sm leading-6">
            Books for BookLover  is your digital home for books. Discover your next read,
            borrow books, and explore an ever-growing world of literature.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white" to="/books">All Books</Link></li>
            <li className="hover:text-white" to="/categories">Categories</li>
            <li><Link className="hover:text-white" to="/dashboard/my-profile">My Profile</Link></li>
            <li><Link className="hover:text-white" to="/borrowed">Borrowed Books</Link></li>
            <li className="hover:text-white" to="/contact">Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-white">Book Categories</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Fiction</li>
            <li className="hover:text-white cursor-pointer">Non-Fiction</li>
            <li className="hover:text-white cursor-pointer">Mystery</li>
            <li className="hover:text-white cursor-pointer">Fantasy</li>
            <li className="hover:text-white cursor-pointer">Romance</li>
            <li className="hover:text-white cursor-pointer">Sci-Fi</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 text-white">Contact</h3>
          <p className="text-sm">123 Library Lane<br />Toronto, Canada</p>
          <p className="mt-3 text-sm">Phone: +1 437 555 9012</p>
          <p className="mt-1 text-sm">support@booklovers.com</p>
        </div>

      </div>

      <div className="flex justify-center gap-6 mt-10">
        {[Facebook, Instagram, Twitter].map((Icon, idx) => (
          <Icon
            key={idx}
            className="w-6 h-6 cursor-pointer hover:text-white transition-colors"
          />
        ))}
      </div>

      <p className="text-center text-xs mt-6 text-gray-400">
        © {new Date().getFullYear()} Books For BookLover — All Rights Reserved.
      </p>

    </footer>
  );
}
