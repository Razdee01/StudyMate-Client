import { use, useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import {
  LogOut as LogoutIcon,
  User as UserIcon,
  Settings,
  Menu,
  X,
} from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, LogOut } = use(AuthContext);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = saved || (prefersDark ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", initial);
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    LogOut()
      .then(() => navigate("/login"))
      .catch(console.error);
  };

  const navClass = ({ isActive }) =>
    `relative px-3 py-2 transition-all duration-300 font-medium text-sm lg:text-base ${
      isActive
        ? "text-primary bg-primary/10 rounded-lg"
        : "text-base-content/70 hover:text-primary"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navClass}>
          About
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/find-partners" className={navClass}>
              Find Partners
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-partner-profile" className={navClass}>
              Collaborate
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-connections" className={navClass}>
              Connections
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/contact" className={navClass}>
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink to="/terms" className={navClass}>
          Legal Center
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-100 w-full transition-all duration-300 bg-base-100/80 backdrop-blur-md border-b border-base-content/10">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-8">
        {/* Navbar Start: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden p-0 mr-3">
              <Menu size={24} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-4 shadow-xl bg-base-100 rounded-2xl w-64 gap-2 border border-base-300"
            >
              {links}
              {!user && (
                <li>
                  <NavLink to="/login" className={navClass}>
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5  rounded-xl group-hover:rotate-12 transition-transform">
              <img
                className="h-10 w-10 rounded-xl"
                src="https://i.ibb.co.com/Pv09Fmv3/Your-paragraph-text.png"
                alt="Logo"
              />
            </div>
            <span className="text-xl lg:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-600">
              StudyMate
            </span>
          </Link>
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-">{links}</ul>
        </div>

        {/* Navbar End: Theme & Profile */}
        <div className="navbar-end gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle hover:bg-base-content/10 transition-colors"
          >
            {theme === "light" ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            )}
          </button>

          {!user ? (
            <Link
              to="/login"
              className="btn btn-primary btn-sm lg:btn-md rounded-xl text-white shadow-lg shadow-primary/20"
            >
              Join Now
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar ring ring-primary/20 ring-offset-base-100 ring-offset-2"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/Yc3Wm9n/default-avatar.png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 z-1 p-3 shadow-2xl bg-base-100 rounded-2xl w-52 gap-1 border border-base-300"
              >
                <li className="menu-title text-base-content/50 px-4 py-2 text-xs uppercase tracking-widest">
                  Account
                </li>
                <li>
                  <Link to="/profile" className="flex items-center gap-3 py-3">
                    <UserIcon size={16} /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 py-3"
                  >
                    <Settings size={16} /> Dashboard
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-3 text-error hover:bg-error/10 hover:text-error"
                  >
                    <LogoutIcon size={16} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
