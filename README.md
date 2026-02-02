# Frontend Intern Task – Task Management Dashboard

A modern, scalable task management web application built with **React + Node.js**, featuring **JWT authentication**, a **protected dashboard**, and **CRUD operations** on tasks.

This project demonstrates frontend engineering skills, clean UI/UX, backend integration, and secure authentication practices.

---

##  Features

###  Authentication
- User Registration & Login
- JWT-based authentication
- Protected routes (Dashboard accessible only after login)
- Secure logout flow

###  Task Dashboard
- Create, read, update, and delete tasks
- Toggle task status (Pending / Completed)
- Search tasks by title
- Filter tasks by status
- Persistent data using MongoDB

###  UI / UX
- Responsive design
- Pastel-themed modern UI
- Card-based layout with visual hierarchy
- Clean, intuitive interactions

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt (password hashing)

##  Scalability & Production Readiness
To scale this application for production, the frontend and backend would be deployed separately using cloud platforms (e.g., Vercel/Netlify for frontend and AWS/Render for backend). Environment variables would be managed securely using `.env` files and platform-level secrets. CORS would be configured to allow only trusted frontend domains. Database performance would be improved by adding indexes on frequently queried fields such as `userId` or task status. Caching (using Redis or in-memory caching) could be introduced to reduce database load. Additional improvements include logging, error monitoring, and basic rate limiting to ensure reliability and security under higher traffic.


---

##  How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev


