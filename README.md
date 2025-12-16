
# BookCourier For BookLover

## Project Overview
BookCourier is a library delivery management system designed to make borrowing and returning books easy and convenient. Users can request book pickup or delivery from nearby libraries, eliminating the need to physically visit the library. The system is ideal for students, researchers, and avid readers.


## Purpose
The purpose of this project is to provide a seamless online experience for:
- Borrowing and returning books without visiting libraries.
- Managing book orders, payments, and statuses.
- Allowing librarians and admins to manage books and orders efficiently.
- Enhancing user experience with responsive design, dashboard analytics, and modern UI/UX.

---

## Key Features--->

### General
- Responsive website design for all devices (mobile, tablet, desktop).
- Dark/light mode toggle.
- Animated sections for better user experience.
- Intuitive navbar and footer with proper alignment and spacing.

### Authentication
- Email/password login and Google social login.
- Registration with image upload and strong password validation.
- JWT token verification for protected routes.

### User Dashboard
- View and manage orders (cancel pending orders, pay for pending orders).
- My Wishlist page to save desired books.
- Profile page with editable name and image.
- Invoices page showing payment details.

### Librarian Dashboard
- Add new books with details (name, author, image, status, price).
- Manage own books (edit, publish/unpublish).
- View and update orders (pending → shipped → delivered).
  
### Admin Dashboard
- View all users and assign roles (User, Librarian, Admin).
- Manage all books (publish/unpublish, delete).
- Manage all orders associated with books.

### Books Section
- All Books page with search and sort by price.
- Book Details page with “Order Now” modal.
- Review/Rating system for completed orders.
- Latest books carousel on the homepage.
- Coverage section with map of delivery areas.

---

## NPM Packages Used --->

**Frontend**
- react
- react-dom
- react-router-dom
- tailwindcss
- @tanstack/react-query (for optional data fetching)
- react-icons
- axios
- react-slick (for homepage sliders)
- react-hook-form (for forms)
- firebase

**Backend**
- express
- mongoose
- dotenv
- cors
- jsonwebtoken
- bcryptjs
- nodemon (development only)

> ⚠️ Firebase keys and MongoDB credentials are stored securely using environment variables.

---
## Author
- Zuairia Kamal  
- Email: zuairiakamal@gmail.com
