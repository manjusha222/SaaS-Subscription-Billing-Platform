# SaaS Subscription Billing Platform

A full-stack SaaS billing and subscription management platform built with React, TypeScript, Node.js, Express.js and MySQL. Users can register, login, choose subscription plans, manage billing and download PDF invoices.

---

## 🔗 Live Demo

- **Frontend:** [https://saa-s-subscription-billing-platform.vercel.app/]
- **Backend API:** [https://saas-subscription-billing-platform-production-4862.up.railway.app/api/plans]

---

## 🛠️ Tech Stack

### Frontend
- React.js + TypeScript
- Tailwind CSS
- Axios (with interceptor)
- React Router DOM
- React Hot Toast
- jsPDF (invoice generation)
- Vite

### Backend
- Node.js + Express.js + TypeScript
- MySQL2 (connection pooling)
- JWT (JSON Web Tokens)
- Bcrypt (password hashing)
- Dotenv
- CORS

---

## ✨ Features

### Authentication
- User registration with email validation
- Secure login with JWT token
- Password hashing with Bcrypt
- Protected routes on frontend and backend
- Auto logout on token expiry (401 interceptor)
- Persistent login with localStorage

### Subscription Management
- View all available subscription plans
- Subscribe to a plan
- Auto-cancel previous plan on new subscription
- Change plan anytime
- Cancel subscription
- Subscription expiry tracking (30 day cycle)
- Expiry warning banner (7 days before expiry)
- Renew Now button when plan is expiring soon

### Dashboard
- Active plan display with status and renewal date
- Expiry progress tracking
- Download PDF invoice for active plan
- Subscription history with status badges
- Skeleton loading UI while fetching data
- Empty state UI for new users

### Invoice
- PDF invoice generation using jsPDF
- Includes user name, email, plan details, billing period
- Auto downloads as invoice-{number}.pdf

### Profile
- View and edit name and email
- Edit / Save / Cancel mode
- Skeleton loading while fetching profile

---

## 📁 Project Structure

```
saas-subscription-billing-platform/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.tsx      # Global auth state (token + user)
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx  # Sidebar + layout wrapper
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Plans.tsx
│   │   │   └── Profile.tsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.tsx   # Guards authenticated pages
│   │   ├── services/
│   │   │   ├── axiosInstance.ts     # Axios with auth interceptor
│   │   │   ├── authService.ts
│   │   │   ├── dashboardService.ts
│   │   │   ├── planService.ts
│   │   │   ├── subscriptionService.ts
│   │   │   └── userService.ts
│   │   └── utils/
│   │       └── generateInvoice.ts   # PDF invoice generator
│   └── package.json
│
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                # MySQL connection pool
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── planController.ts
│   │   │   ├── subscriptionController.ts
│   │   │   └── userController.ts
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts    # JWT verification
│   │   ├── routes/
│   │   │   ├── authRouter.ts
│   │   │   ├── planRoutes.ts
│   │   │   ├── subscriptionRoutes.ts
│   │   │   └── userRoutes.ts
│   │   ├── app.ts                   # Express app + CORS config
│   │   └── server.ts                # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  features TEXT
);

CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  plan_id INT,
  status VARCHAR(50),
  expires_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (plan_id) REFERENCES plans(id)
);
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MySQL

### 1. Clone the repository
```bash
git clone  [https://github.com/manjusha222/SaaS-Subscription-Billing-Platform.git]
cd saas-subscription-billing-platform
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `.env` file in `server/` folder:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=saas_db
DB_PORT=3306
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Run the server:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
```

Create `.env` file in `client/` folder:
```
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

### 4. Setup Database

Run this SQL in MySQL Workbench or terminal:
```sql
CREATE DATABASE saas_db;
USE saas_db;

-- Run the schema from above

INSERT INTO plans (name, price, features) VALUES
('Basic', 299, 'Plan Management, Billing History'),
('Pro', 999, 'Plan Management, Invoice Download, Billing History'),
('Enterprise', 1999, 'Plan Management, Invoice Download, Expiry Alerts, Billing History');
```

---

## 🌐 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Railway |
| Database | Railway MySQL |

---

## 📸 Screenshots

> Dashboard — Active Plan


> Dashboard — New User Empty State

> Plans Page


> Invoice PDF Download


> Profile Page

---

## 🔑 Key Technical Decisions

**Axios Interceptor** — Single `axiosInstance.ts` auto-attaches Bearer token to every request. No repeated `localStorage.getItem` in services. Auto redirects to login on 401.

**JWT Authentication** — Stateless auth. Token stored in localStorage. Verified on every protected API call via middleware.

**Subscription Logic** — On new subscription, existing active plan is auto-cancelled before inserting the new one. Ensures only one active plan at a time.

**Expiry Tracking** — `expires_at` set to 30 days from subscription date. Frontend calculates days remaining and shows warning banner at 7 days.

**PDF Invoice** — Generated client-side using jsPDF. No server storage needed. Auto downloads with invoice number.

**Skeleton Loading** — All pages show skeleton UI while fetching data. Prevents empty state flash on page load.

---

## 👩‍💻 Author

**Manjusha Kakuturi**
- LinkedIn: [www.linkedin.com/in/manjusha-kakuturi]
- GitHub: [https://github.com/manjusha222/SaaS-Subscription-Billing-Platform]
- Email: manjushakakuturi@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).