# StudyMate Client

## Description

StudyMate is a modern web platform that connects students to find and collaborate with study partners. The application provides a seamless experience for students to discover peers with similar study goals and schedules.

**Live Project Link**: https://unique-mooncake-0634d9.netlify.app/

**Technologies Used**: React, Vite, Firebase, React Router, CSS

---

## README File

### Project Overview

StudyMate is a student networking platform designed to help individuals find compatible study partners. Users can create profiles, browse other students' profiles, and establish connections for collaborative learning sessions.

### Main Technologies

- **React 18** - Frontend framework
- **Vite** - Fast build tool and dev server
- **Firebase** - Authentication and backend services
- **React Router** - Client-side routing
- **CSS** - Styling

### Core Features

- 🔍 **Find Study Partners** - Browse and filter student profiles based on interests and availability
- 👤 **Create & Update Profiles** - Build detailed study partner profiles with interests and schedule
- 🔗 **Manage Connections** - Connect with other students and manage study partnerships
- 🔐 **Secure Authentication** - User registration and login with Firebase
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- ⚡ **Real-time Updates** - Instant profile and connection updates

### Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.x",
  "firebase": "^10.x"
}
```

Dev Dependencies:

- `@vitejs/plugin-react` - Vite React plugin
- `eslint` - Code linting

### How to Run Locally

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd StudyMate-Client
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   - Create a `.env.local` file in the root directory
   - Add your Firebase credentials:

   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start Development Server**

   ```bash
   npm run dev
   ```

   - Application will run on `http://localhost:5173`

5. **Build for Production**

   ```bash
   npm run build
   ```

6. **Preview Production Build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Live Links & Resources

- **Live Project**: [StudyMate Live](https://study-mate-client.netlify.app)
- **GitHub Repository**: [StudyMate Client](https://github.com)
- **Firebase Console**: [Firebase Project](https://console.firebase.google.com)

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── NavBar.jsx
│   ├── Footer.jsx
│   ├── HeroSlider.jsx
│   ├── HowItWorks.jsx
│   ├── Testimonials.jsx
│   ├── TopStudyPartner.jsx
│   ├── Profile.jsx
│   ├── PartnerDetails.jsx
│   ├── UpdatePartner.jsx
│   ├── PrivetRoutes.jsx
│   ├── Loading.jsx
│   └── ErrorPage.jsx
├── contexts/            # React Context setup
│   ├── AuthContext.jsx
│   └── AuthProvider.jsx
├── fireBase/            # Firebase configuration
│   └── fireBase.init.js
├── layouts/             # Layout components
│   └── MainLayout.jsx
├── pages/               # Page components
│   ├── Home.jsx
│   ├── FindPartners.jsx
│   ├── CreatePartnerProfile.jsx
│   ├── MyConnections.jsx
│   ├── Register.jsx
│   ├── Login.jsx
│   └── PartnerDetails.jsx
├── App.jsx              # Main App component
├── main.jsx             # Entry point
├── App.css              # App styles
└── index.css            # Global styles
```

---

**Made with ❤️ for students everywhere**
