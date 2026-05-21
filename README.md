# Flagit

A simple issue tracking application for creating and managing bugs and tasks.

Live demo: https://flagit-taupe.vercel.app

---

## Stack

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB

---

## Getting Started

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/flagit
JWT_SECRET=your_secret_key
NODE_ENV=development
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

```bash
npm run dev
```

---

## Features

- User registration and login
- Create, edit, and delete issues
- Filter and search issues
- Export issues to CSV
- Pagination

---

## Notes

The backend is hosted on Render's free tier and may take up to 30 seconds to respond after a period of inactivity.

---
