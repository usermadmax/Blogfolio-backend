# Blogfolio Backend 📝

This is the backend of **Blogfolio**, a full-stack blog application where users can register, login, create blogs, edit, delete, and view blogs sorted by latest. Built with **Node.js**, **Express**, **MongoDB**, and **JWT-based authentication**.

---

## 🚀 Features

- User registration and login with JWT authentication
- Blog CRUD (Create, Read, Update, Delete)
- Authorization: Only the blog creator can edit/delete their blog
- Blog timestamps (`createdAt`) and sorting by latest
- MongoDB with Mongoose
- `.env` support for sensitive credentials
- Clean RESTful API

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt for password hashing
- dotenv for environment configuration

---

## 📦 Installation

```bash
git clone https://github.com/usermadmax/Blogfolio-backend.git
cd Blogfolio-backend
npm install
