
import { NavLink } from "react-router";


const NavBar = () => {
 
  
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mx-2 font-semibold ${
              isActive
                ? "text-primary border-b-2 border-blue-500"
                : "text-gray-700"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `mx-2 font-semibold ${
              isActive
                ? "text-primary border-b-2 border-blue-500"
                : "text-gray-700"
            }`
          }
        >
          Login / Register
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/find-partners"
          className={({ isActive }) =>
            `mx-2 font-semibold ${
              isActive
                ? "text-primary border-b-2 border-blue-500"
                : "text-gray-700"
            }`
          }
        >
          Find Partners
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/create-partner-profile"
          className={({ isActive }) =>
            `mx-2 font-semibold ${
              isActive
                ? "text-primary border-b-2 border-blue-500"
                : "text-gray-700"
            }`
          }
        >
          Create Partner Profile
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/my-connections"
          className={({ isActive }) =>
            `mx-2 font-semibold ${
              isActive
                ? "text-primary border-b-2 border-blue-500"
                : "text-gray-700"
            }`
          }
        >
          My Connections
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-xl"
            src="https://i.ibb.co.com/vbTrKzf/Study-Mate-logo.png"
            alt=""
          />
          <p className="text-2xl font-bold text-sky-400 ml-2">StudyMate</p>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        <img alt="photo" />
      </div>
    </div>
  );
};

export default NavBar;
