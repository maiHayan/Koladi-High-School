# 🏫 Koladi High School

<p align="center">
  <strong>A Modern Full-Stack School Website & Content Management System</strong>
</p>

<p align="center">
  <a href="https://maihayan.github.io/Koladi-High-School/">
    <img src="https://img.shields.io/badge/Live%20Website-GitHub%20Pages-181717?style=for-the-badge&logo=github" alt="Live Website">
  </a>
  <a href="https://koladi-high-school-1.onrender.com">
    <img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render" alt="Backend">
  </a>
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
</p>

---

## 🌐 Live Project

### Public Website
**https://maihayan.github.io/Koladi-High-School/**

### Admin Panel
**https://maihayan.github.io/Koladi-High-School/#/admin/login**

### Backend API
**https://koladi-high-school-1.onrender.com**

---

## 📖 About the Project

**Koladi High School** is a modern full-stack school website designed to provide students, parents, teachers, and visitors with accessible information about the school.

The system combines a responsive public-facing website with a secure administration panel, allowing authorized administrators to manage important website content without directly modifying the source code.

The application is connected to a live backend and MongoDB database, making the website content dynamic and manageable.

---

## ✨ Key Features

### 🌍 Public Website

- 🏠 Modern Home page
- 🏫 About the School
- 📚 Academic information
- 🎓 Academic detail pages
- 📢 Notices and announcements
- 🖼️ School gallery
- 📞 Contact information
- 📍 Location section
- 📱 Responsive design
- 🔗 Multi-page navigation
- 🖼️ Dynamic image loading
- ⚡ Fast Vite production build

### 🔐 Administration Panel

- Secure administrator login
- JWT-based authentication
- Admin dashboard
- Manage Home page content
- Manage About information
- Manage Academic information
- Manage Notices
- Manage Gallery images
- Manage Contact information
- Manage Footer content
- 🔑 Additional passkey verification before content changes
- 🔒 Protected administrative API endpoints

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Development & production build |
| React Router | Application routing |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS3 | Styling & responsive design |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API server |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| JWT | Admin authentication |
| Multer | Image upload handling |

### Deployment

| Service | Usage |
|---|---|
| GitHub Pages | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |
| GitHub Actions | Automated frontend deployment |

---

## 🏗️ System Architecture

```text
                    ┌────────────────────────────┐
                    │       Public Users         │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │     GitHub Pages           │
                    │      React + Vite          │
                    └─────────────┬──────────────┘
                                  │
                                  │ REST API
                                  ▼
                    ┌────────────────────────────┐
                    │        Render              │
                    │   Node.js + Express.js     │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │      MongoDB Atlas         │
                    │        Database             │
                    └────────────────────────────┘


                    ┌────────────────────────────┐
                    │      Administrator         │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │      Admin Login           │
                    │   JWT Authentication       │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │     Passkey Verification   │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │      Admin Dashboard       │
                    └────────────────────────────┘
