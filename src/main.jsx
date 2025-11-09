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

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/find-partners", Component: FindPartners },
      { path: "/create-partner-profile", Component: CreatePartnerProfile },
      { path: "/my-connections", Component: MyConnections },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
