# 📝 Noted | Productivity & Task Management

**Noted** is a sleek, minimalist productivity application built with the MERN stack. It allows users to manage tasks, track productivity metrics in real-time, and manage their personal profile through a clean, modern interface.

![Project Status](https://img.shields.io/badge/Status-Development-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

- **Productivity Tracking**: Visual dashboard showing task completion rates and progress bars.
- **Secure Authentication**: JWT-based auth system with persistent sessions.
- **Dynamic Profile Management**: Update account details with instant UI feedback.
- **Task Management**: Full CRUD functionality for organizing your daily todos.
- **Responsive UI**: Built with Tailwind CSS for a seamless experience across all devices.
- **Service-Oriented Architecture**: Clean backend logic separated into Controllers, Services, and Models.

---

## 🚀 Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Styling)
- **Lucide React** (Icons)
- **Axios** (API Requests)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose** (Database)
- **JSON Web Tokens** (Authentication)
- **Bcryptjs** (Password Encryption)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account or local MongoDB instance

### 1. Installation
Clone the repository:
```bash
git clone [https://github.com/your-username/noted-app.git](https://github.com/your-username/noted-app.git)
cd noted-app
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a .env file in the server root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
```

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
```

## 📂 Project Structure

noted-app/
├── client/                 
│   ├── src/
│   │   ├── hooks/          # useProfile, useTasks (Data Logic)
│   │   ├── context/        # FlashContext (Notifications)
│   │   ├── components/     # UI Components
│   │   └── Profile.jsx     # Main User View
├── server/                 
│   ├── controllers/        # Request Handlers
│   ├── services/           # Database Logic
│   ├── models/             # Mongoose Schemas
│   ├── middleware/         # Auth Guards
│   └── routes/             # API Endpoints

## 🛣️ API Endpoints

### Authentication
- **POST** `/api/auth/register` — Create new account  
- **POST** `/api/auth/login` — Authenticate user & return token  
- **PUT** `/api/auth/update` — Update user profile (Protected)

### Tasks
- **GET** `/api/tasks` — Fetch all user tasks  
- **POST** `/api/tasks` — Create a new task  
- **PUT** `/api/tasks/:id` — Update task status  

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
Distributed under the MIT License. See LICENSE for more information.