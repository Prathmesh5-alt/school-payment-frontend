import React from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Navbar: React.FC<Props> = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  // Function to style active/inactive links
  const getLinkClass = (path: string) =>
    `px-4 py-2 rounded-lg transition-colors duration-300 font-medium ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      {/* Left: Navigation Links */}
      <div className="flex space-x-4 font-semibold">
        <Link to="/" className={getLinkClass("/")}>
          Dashboard
        </Link>
        <Link to="/school" className={getLinkClass("/school")}>
          By School
        </Link>
        <Link to="/status" className={getLinkClass("/status")}>
          Status Check
        </Link>
        <Link to="/payment" className={getLinkClass("/payment")}>
          Payment
        </Link>
      </div>

      {/* Right: Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300
          ${darkMode
            ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
            : "bg-blue-600 text-white hover:bg-blue-700"}`}
      >
        {darkMode ? (
          <>
            <span>☀️</span>
            <span>Light</span>
          </>
        ) : (
          <>
            <span>🌙</span>
            <span>Dark</span>
          </>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
