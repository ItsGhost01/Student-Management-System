# 🎓 Student Management System

A full-stack **Student Management System** built with **React, TypeScript, Node.js, Express.js, Sequelize, and PostgreSQL**. The application provides a secure platform for managing students, courses, and users with role-based authentication, dashboard analytics, and image uploads.

---

## 🚀 Live Demo

### 🌐 Frontend

https://studentthub.netlify.app

### ⚙️ Backend API

https://student-management-system-heps.onrender.com

---

## 🔐 Demo Credentials

### Admin Account

**Email**

```text
admin@example.com
```

**Password**

```text
Admin12345
```

---

## ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Role-Based Access Control (Admin & Staff)

### 👨‍🎓 Student Management

* Add Student
* View Students
* Update Student Information
* Delete Student
* Search Students
* Filter by Course
* Upload Student Profile Picture

### 📚 Course Management

* Add Course
* View Courses
* Update Course
* Delete Course

### 👥 User Management

* View All Users
* Update User Profile
* Upload Profile Picture
* Delete Users (Admin)

### 📊 Dashboard

* Total Students
* Total Courses
* Students Per Course
* Recently Added Students

### 🎨 User Interface

* Responsive Design
* Material UI Components
* Loading Indicators
* Toast Notifications

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* Redux Toolkit
* React Router
* Axios
* Material UI
* React Hook Form
* React Toastify

## Backend

* Node.js
* Express.js
* TypeScript
* Sequelize ORM
* JWT
* Zod Validation
* Multer
* Cloudinary

## Database

* PostgreSQL (Neon)

## Deployment

* Netlify (Frontend)
* Render (Backend)
* Neon PostgreSQL
* Cloudinary

---

# 📁 Project Structure

```text
Student-Management-System/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── connections/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validation/
│   │   └── server.ts
│   │
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint      |
| ------ | ------------- |
| POST   | `/api/signup` |
| POST   | `/api/login`  |
| GET    | `/api/me`     |

---

## Students

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/add/student` |
| GET    | `/api/students`    |
| GET    | `/api/student/:id` |
| PUT    | `/api/student/:id` |
| DELETE | `/api/student/:id` |

---

## Courses

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | `/api/add/course` |
| GET    | `/api/courses`    |
| PUT    | `/api/course/:id` |
| DELETE | `/api/course/:id` |

---

## Users

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | `/api/users`      |
| PUT    | `/api/profile`    |
| DELETE | `/api/delete/:id` |

---

## Dashboard

| Method | Endpoint                             |
| ------ | ------------------------------------ |
| GET    | `/api/dashboard`                     |
| GET    | `/api/dashboard/recent-students`     |
| GET    | `/api/dashboard/students-per-course` |

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/ItsGhost01/Student-Management-System.git
```

```bash
cd Student-Management-System
```

---

## Backend Setup

```bash
cd Backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
NODE_ENV=development
PORT=3000

JWT_SECRET=your_jwt_secret

DATABASE_URL=your_database_url

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run the backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd Frontend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend

```bash
npm run dev
```

---

# 📷 Image Upload

Images are uploaded using **Cloudinary** and stored securely in cloud storage.

---

# 🔒 Authentication

Authentication is implemented using **JSON Web Tokens (JWT)**.

Features include:

* Login
* Registration
* Protected API Routes
* Role-Based Authorization
* Persistent Sessions

---

# 📈 Dashboard Analytics

The dashboard displays:

* Total Students
* Total Courses
* Students Per Course
* Recently Added Students

---

# 📦 Deployment

| Service       | Platform        |
| ------------- | --------------- |
| Frontend      | Netlify         |
| Backend       | Render          |
| Database      | Neon PostgreSQL |
| Image Storage | Cloudinary      |

---

# 📝 Note

The original assignment specified **MongoDB with Mongoose**. This project uses **PostgreSQL (Neon Database)** with **Sequelize ORM** while implementing the same CRUD operations, authentication, validation, deployment, and additional bonus features.

---

# 👨‍💻 Author

**Its Ghost**

GitHub: https://github.com/ItsGhost01

---

## ⭐ If you found this project useful, consider giving it a star!
