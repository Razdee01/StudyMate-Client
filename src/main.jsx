import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import FindPartners from './pages/FindPartners.jsx';
import CreatePartnerProfile from './pages/CreatePartnerProfile.jsx';
import MyConnections from './pages/MyConnections.jsx';
import PartnerDetails from './components/PartnerDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import PrivetRoutes from './components/PrivetRoutes.jsx';
import Profile from './components/Profile.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { index: true, Component: Home },
      { path: "/find-partners", Component: FindPartners },
      { path: "/create-partner-profile", Component: CreatePartnerProfile },
      { path: "/my-connections", Component: MyConnections },
      { path: "/profile", Component: Profile },
      {
        path: "partners/:id",
        element: <PrivetRoutes>
          <PartnerDetails />
        </PrivetRoutes>,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/partners/${params.id}`),
      },
      {
        path: "login",
        Component:Login
      },
      {path: "register",
       Component:Register
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
