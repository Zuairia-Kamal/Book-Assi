// import { Link } from "react-router-dom";

// const BookCard = ({ book }) => {
//   const { _id, title, author, image } = book || {};

//   return (
//     <div className="col-span-1 shadow-lg rounded-xl p-3 bg-white dark:bg-gray-900">
//       <div className="flex flex-col gap-3">
//         <div className="aspect-square w-full rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
//           {image ? (
//             <img
//               src={image}
//               alt={title}
//               className="w-full h-full object-cover rounded-xl"
//             />
//           ) : (
//             <span className="text-4xl">📖</span>
//           )}
//         </div>

//         <div className="font-semibold text-lg">{title}</div>
//         <div className="text-gray-500 dark:text-gray-400">{author}</div>

//         <Link
//           to={`/books/${_id}`}
//           className="btn btn-primary mt-2 text-center"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BookCard;
