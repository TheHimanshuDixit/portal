import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isProfile, setIsProfile] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("admin");

  useEffect(() => {
    initFlowbite();
    setActiveNavItem(() => {
      if (window.location.pathname === "/admin") return "admin";
      if (window.location.pathname === "/addadmin") return "addadmin";
      if (window.location.pathname === "/addopening") return "addopening";
      if (window.location.pathname === "/studdetails") return "studdetails";
      if (window.location.pathname === "/attendance") return "attendance";
      if (window.location.pathname === "/record") return "record";
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authAdminToken");
    window.location.href = "/login";
  };

  return (
    <header>
      <nav className="px-4 lg:px-6 py-2.5 dark:bg-gray-800 border-b-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/admin" className="flex items-center">
            <img
              src="./Images/logo.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              JIIT:T&P Portal
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {localStorage.getItem("authAdminToken") && (
              <div className="flex justify-center items-center">
                <CgProfile
                  onMouseOver={() => setIsProfile(true)}
                  onMouseOut={() => setIsProfile(false)}
                  className="text-3xl lg:text-3xl text-primary-700 hover:text-primary-800"
                />
                {isProfile && (
                  <div
                    onMouseOver={() => setIsProfile(true)}
                    onMouseOut={() => setIsProfile(false)}
                    className="absolute top-9 z-10 w-32 p-2 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800">
                    <Link
                      to="#"
                      className="text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                      Admin
                    </Link>
                    <Link
                      onClick={handleLogout}
                      to="#"
                      className="text-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {[
                { name: "Home", path: "/admin", key: "admin" },
                { name: "T&P Team", path: "/addadmin", key: "addadmin" },
                {
                  name: "Internships/Jobs",
                  path: "/addopening",
                  key: "addopening",
                },
                {
                  name: "Students Details",
                  path: "/studdetails",
                  key: "studdetails",
                },
                { name: "Attendance", path: "/attendence", key: "attendance" },
                { name: "Statistics", path: "/record", key: "record" },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    onClick={() => setActiveNavItem(item.key)}
                    className={`${
                      activeNavItem === item.key
                        ? "text-blue-500"
                        : "text-gray-700"
                    } block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-500 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
