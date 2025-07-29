# 🧠 MediTrek – AI-Powered Health Assistant

MediTrek is a smart, AI-powered health assistant designed to help users **track their health**, **receive personalized tips**, and **detect early signs of illness**. It bridges the healthcare access gap, especially in underserved or rural areas, by offering accessible, intelligent support 24/7.

---

## 🌍 Problem

In 2025, over 5.1 million South Africans are expected to live with diabetes, with 1 in 3 adults facing high blood pressure. Many lack access to medical professionals or tools for early detection. MediTrek solves this through AI-driven insights and real-time health tracking.

---

## 💡 Features

### ✅ Core Functionality

- Register and log in securely (JWT-based auth)
- Track health test results (e.g. glucose, blood pressure)
- Get AI-powered alerts when health data is risky
- Receive personalized, local health tips
- (Optional) Chat with an AI health assistant

### 📈 Diagnostic Test Management (CRUD)

- Add, view, update, and delete test records
- See test history and trend summaries

### 🧠 AI Health Engine

- Accepts symptoms or test data
- Suggests possible conditions with confidence scores
- Triggers alerts on patterns (e.g., high sugar)

### 🔔 Alerts & Notifications

- New, Acknowledged, and Resolved alert statuses
- Custom notification frequency

---

## 🛠️ Tech Stack

| Layer     | Tech                  |
| --------- | --------------------- |
| Frontend  | React + TypeScript    |
| Styling   | Tailwind CSS          |
| Backend   | Node.js + Express     |
| Auth      | JWT (JSON Web Tokens) |
| Database  | MongoDB               |
| AI Module |                       |

---

## 🚀 How to Run

### 🔧 Prerequisites

- Node.js ≥ 18
- MongoDB (local or cloud like Atlas)

### ▶️ Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit [https://meditrek.netlify.app/] to view the app.

---

## 🔐 Environment Variables

Create `.env` files in both `/frontend` and `/backend` folders.

**Example for backend `.env`:**

```env
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

---

## 📦 Deployment Options

- 🔄 [Render](https://render.com) – for backend (Node.js)
- 🔼 [Vercel](https://vercel.com) – for frontend (React)
- ☁️ [Firebase] – optional for hosting/auth if no backend

---

## 👨‍⚕️ Disclaimer

MediTrek is **not a replacement for medical advice**. It is an AI-powered tool meant to support, not replace, professional diagnosis and treatment.

---

---
## 📷 Screenshots
![Screenshot 1](meditrekfrontend/screenshots/Screenshot%202025-07-29%20230417.png)  

![Screenshot 2](meditrekfrontend/screenshots/Screenshot%202025-07-29%20230434.png)  

![Screenshot 3](meditrekfrontend/screenshots/Screenshot%202025-07-29%20230451.png)  

![Screenshot 4](meditrekfrontend/screenshots/Screenshot%202025-07-29%20230501.png)  

![Screenshot 5](meditrekfrontend/screenshots/Screenshot%202025-07-29%20230519.png)  

![Screenshot 6](meditrekfrontend/screenshots/Screenshot%202025-07-29%20230525.png)  

