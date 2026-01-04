# 🎓 StudyMate | Peer-to-Peer Learning Platform

StudyMate is a modern, full-stack web application designed to help students find the perfect study partners. By matching users based on subjects, learning preferences, and location, StudyMate transforms the solitary learning experience into a collaborative journey.

**Live Link:** [https://unique-mooncake-0634d9.netlify.app/]  
**Server API:** [https://study-mate-server-ten.vercel.app/]

---

## 🚀 Key Features

- **Dynamic Partner Discovery:** Advanced filtering by subject, study mode (Online/In-Person), and experience levels.
- **Intelligent Dashboard:** A dedicated private layout featuring real-time statistics, dynamic activity charts (Recharts), and a comprehensive data table.
- **Robust Authentication:** Secure Firebase integration with Email/Password and Google Social Login, featuring instant state synchronization for UI components.
- **Responsive Design:** A mobile-first, professional UI built with Tailwind CSS and DaisyUI, featuring a seamless Dark/Light mode toggle.
- **Data Integrity:** Implemented MongoDB "Upsert" logic to ensure user profiles are always consistent, even during initial onboarding.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS & DaisyUI (Glassmorphism design)
- React Router (Protected & Dedicated layouts)
- Recharts (Data visualization)
- Lucide React (Iconography)

**Backend:**
- Node.js & Express.js
- MongoDB (Advanced CRUD & Aggregation)
- Firebase Auth (Authentication & Authorization)
- Axios (API Communication)

---

## 🔑 Demo Credentials

To explore the platform as a reviewer, please use the following credentials:

- **Email:** `user@test.com`
- **Password:** `Test1234`

*(Alternatively, use the "Demo Login" button on the login page for instant access.)*

---

## 📸 Screenshots

| Landing Page | Dashboard Overview | Find Partners |
| :--- | :--- | :--- |
| ![Home](https://i.ibb.co.com/3YvffgLy/localhost-5173-laptop.png) | ![Dashboard](https://i.ibb.co.com/Wp7DSKNT/localhost-5173-laptop-1.png) | ![Explore](https://i.ibb.co.com/FkzXjHX3/localhost-5173-laptop-2.png) |

---

## 🛠️ Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Razdee01/study-mate-client.git](https://github.com/Razdee01/study-mate-client.git)
Install dependencies:

Bash

npm install
Environment Variables: Create a .env file and add your Firebase and Backend API credentials:

Code snippet

VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
...
Run the app:

Bash

npm run dev
👨‍💻 Author
Walid Rahman Rajdee

