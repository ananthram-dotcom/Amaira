# ✨ AMAIRA - Premium Indian Beauty & Luxury Fashion E-Commerce Platform

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.19-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Cloud-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=white)

---

## 📖 Brand Story & Vision

**AMAIRA** is a high-performance, full-stack **MERN (MongoDB, Express, React, Node.js)** e-commerce platform designed to celebrate authentic Indian culture, royal Kundan craftsmanship, Ayurvedic beauty traditions, and modern luxury fashion. 

Engineered with state-of-the-art web standards, AMAIRA delivers a seamless, high-converting shopping experience featuring dynamic client-side routing, live database integration, user authentication, a sliding cart drawer, interactive wishlist management, portfolio sandbox checkout, and comprehensive SEO optimization.

---

## 🌟 Key Features & Core Capabilities

### 🛍️ E-Commerce & Interactive UI Engine
* **Dynamic Multi-Page Routing:** Powered by `react-router-dom` for fluid navigation across Home, Product Details (`/product/:id`), Saved Wishlist (`/wishlist`), Portfolio Sandbox Checkout (`/checkout`), User Account Dashboard (`/account`), and Legal pages.
* **Slide-Over Shopping Cart Drawer:** Interactive slide-out panel featuring a real-time free-shipping progress meter (unlocked at ₹1,999), quantity adjustment controls (`+`/`-`), single-item removal, and custom promo code redemption (`AMAIRA10`, `FESTIVE20`).
* **Saved Wishlist Manager:** Dedicated wishlist hub for saving, toggling, and directly transferring items to the shopping cart.
* **Detailed Product Pages (PDP):** Showcases high-resolution gallery images, pricing, original price comparisons, percentage discount badges, rating breakdowns, stock availability tags, and quantity selection.
* **Portfolio Sandbox Checkout Flow:** Seamless multi-step checkout with shipping address validation, sandbox payment method selection (Demo Credit Card, Demo UPI, Cash on Delivery), and immediate order confirmation modal with auto-generated reference IDs.

### 🔐 Full-Stack Backend & Database Architecture
* **Live MongoDB Atlas Integration:** Cloud database storing persistent collections for **Users**, **Products**, and **Orders**.
* **JWT User Authentication & Security:** Secure user signup, login, and token verification using JSON Web Tokens (JWT) and `bcryptjs` password hashing.
* **Authenticated User Dashboard:** Personal account page featuring real-time order history fetched directly from MongoDB Atlas, account status badges, and default delivery addresses.

### 🔍 SEO, Legal Compliance & Performance Standards
* **Search Engine Optimization (SEO):** Full OpenGraph (`og:title`, `og:image`, `og:description`), Twitter Cards, Schema.org JSON-LD structured data (`OnlineStore`), `sitemap.xml`, and `robots.txt` for maximum search visibility.
* **Legal & Regulatory Pages:** Dedicated GDPR Cookie Consent Banner, Privacy Policy, Terms of Service, and Shipping & Return policy pages.
* **Resilience & Security:** React `ErrorBoundary` wrapper to catch runtime UI errors gracefully without application crashes.

---

## 🛠️ Technology Stack & Software Architecture

### Frontend (Client Application)
* **Core:** React 18 (TypeScript), Vite 5
* **Styling & UI:** Tailwind CSS, Framer Motion (Animations), Lucide React (Icons)
* **Routing & State:** React Router DOM v6, React Context API (`AuthContext`, `CartWishlistContext`)

### Backend (RESTful API Server)
* **Runtime:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT), Bcrypt.js
* **Middleware & Utilities:** CORS, Dotenv

### Cloud Infrastructure & Deployment
* **Frontend Hosting:** Vercel (Edge CDN)
* **Backend API Hosting:** Render (Web Service)
* **Database Hosting:** MongoDB Atlas (Cloud Cluster M0)

---

## 📁 Repository Directory Structure

```
Amaira-main/
├── project/                      # Frontend React + Vite Application
│   ├── public/                   # Static assets, sitemap.xml, robots.txt
│   ├── src/
│   │   ├── components/           # UI Components (Header, Footer, CartDrawer, etc.)
│   │   ├── context/              # Global Contexts (AuthContext, CartWishlistContext)
│   │   ├── pages/                # Page Views (HomePage, ProductDetail, Checkout, etc.)
│   │   ├── types/                # TypeScript Interfaces & Types
│   │   ├── App.tsx               # Primary Routing & Layout Component
│   │   └── main.tsx              # React DOM Root Entry
│   ├── package.json              # Client Dependencies
│   └── vite.config.ts            # Vite Configuration
│
└── server/                       # Backend Node.js + Express REST API
    ├── config/                   # MongoDB Connection Setup (Mongoose)
    ├── middleware/               # Auth Protection Middleware
    ├── models/                   # Mongoose Schemas (User, Product, Order)
    ├── routes/                   # API Endpoints (authRoutes, productRoutes, orderRoutes)
    ├── server.js                 # Express Application Entry Point
    └── package.json              # Server Dependencies
```

---

## 🔌 REST API Endpoint Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user account | Public |
| `POST` | `/api/auth/login` | Authenticate credentials & return JWT | Public |
| `GET` | `/api/auth/me` | Fetch active user profile details | Protected (JWT) |
| `GET` | `/api/products` | Fetch product catalog with filtering | Public |
| `GET` | `/api/products/:id` | Fetch single product by ID | Public |
| `POST` | `/api/orders` | Create a new mock e-commerce order | Protected / Guest |
| `GET` | `/api/orders/my-orders` | Fetch user's order history from MongoDB | Protected (JWT) |

---

## 🚀 Local Setup & Installation Guide

### Prerequisites
* **Node.js:** v18.x or higher
* **npm:** v9.x or higher
* **MongoDB:** MongoDB Atlas connection URI or local MongoDB instance

### 1. Clone Repository
```bash
git clone https://github.com/ananthram-dotcom/Amaira.git
cd Amaira
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file inside the `server/` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/amaira
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```
Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup
In a new terminal window:
```bash
cd project
npm install
```
Create a `.env` file inside the `project/` directory:
```env
VITE_API_URL=http://localhost:5000
```
Start the client development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 💼 Technical Competencies (ATS & Skills Keyword Index)

`Full-Stack Web Development` • `MERN Stack` • `React.js` • `TypeScript` • `Node.js` • `Express.js` • `MongoDB Atlas` • `RESTful API Architecture` • `JWT Authentication` • `State Management` • `Client-Side Routing` • `Tailwind CSS` • `E-Commerce Engineering` • `SEO Optimization` • `Vercel Deployment` • `Render Cloud Hosting` • `Git & GitHub Workflow` • `Clean Architecture`

---

## 📄 License & Attribution

Distributed under the **MIT License**. Created as a professional full-stack web development portfolio project showcasing luxury e-commerce engineering standards.
