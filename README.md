🛋️ Pataku - Full-Stack E-Commerce Platform
live demo:https://pataku-ecommerce-platform-client-1.onrender.com
Pataku is a modern, full-stack e-commerce platform built for a seamless online shopping experience. Think of it as a furniture store in your pocket – with smooth browsing, secure payments, and a powerful admin dashboard to manage everything.

📖 Project Overview

Pataku is more than just an online store. It includes everything needed for customers and administrators:

A beautiful shopping experience for customers (browse, wishlist, cart, checkout).

A powerful admin panel (analytics, product management, real-time updates).

A scalable backend ready for modern e-commerce needs.

✨ Key Features 👩‍💻 Customer Features

🔐 Secure Authentication – Register/Login with JWT.

🏠 Dynamic Homepage – Multiple layouts to showcase categories.

🔎 Smart Filtering – Browse products by price, category, and availability.

📦 Product Details – Rich product pages with image galleries.

🛒 Cart & Wishlist – Save, update, or remove items easily.

💳 Secure Payments – Razorpay integration for checkout.

📜 Order History – Track past purchases & update profile.

🛠️ Admin Features

📊 Analytics Dashboard – See KPIs like sales, orders, and revenue.

🛍️ Product Management – Full CRUD with image uploads.

📦 Order Management – Track and update customer orders.

👤 User Management – Manage registered users.

🔔 Real-Time Updates – Live notifications for orders and stock alerts (Socket.IO).

🛠️ Tech Stack Frontend

⚛️ Next.js + React + TypeScript

🎨 Tailwind CSS + Shadcn/UI for UI

🌀 Framer Motion for animations

🎠 Embla Carousel for sliders

🗂️ Redux Toolkit for state management

📡 Axios for API communication

📝 Formik + Yup for forms

Backend

🚀 Node.js + Express

🗄️ MongoDB + Mongoose for database

🔐 JWT Authentication

📂 Multer for file uploads

🔔 Socket.IO for live updates

⚡ Redis for caching (fast product & cart loading)

💳 Razorpay for payments

📧 Nodemailer for order emails

Deployment

🌍 Frontend – Vercel

🔙 Backend – Render (or similar like Heroku)

🗄️ Database – MongoDB Atlas

⚡ Cache – Redis Cloud

🚀 Getting Started Prerequisites

Node.js (v18+)

npm or yarn

MongoDB (local or Atlas)

Redis (local or Redis Cloud)

Installation

Clone the repo
git clone cd pataku

Install backend deps
npm install

Install frontend deps (if separate)
cd src npm install

Configuration

Create .env for backend

Create .env.local in src for frontend

Backend (.env)

MONGO_URL=your_mongodb_connection_string JWT_SECRET=your_jwt_secret_key REDIS_URL=your_redis_connection_string RAZORPAY_KEY_ID=your_razorpay_key_id RAZORPAY_SECRET=your_razorpay_secret_key LOGIN=your_nodemailer_login_email PASS=your_nodemailer_password PORT=8000

Frontend (src/.env.local)

NEXT_PUBLIC_API_URL=http://localhost:8000/api NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

Run the project

Start backend
npm run dev

Start frontend
npm run dev
