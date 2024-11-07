import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
//import Leftbar from "./Leftbar";
import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import SignoutModal from "./SignoutModal";

function Header(props) {
  const location = useLocation();
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Search Series", path: "/search" },
    { label: "Blog", path: "/blog" },
  ];

  const [loginModal, setLoginModal] = useState(false);
  const [signoutModal, setSignoutModal] = useState(false);

  const handleOpenLoginModal = () => {
    setLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModal(false);
  };

  const handleOpenSignoutModal = () => {
    setSignoutModal(true);
  };

  const handleCloseSignoutModal = () => {
    setSignoutModal(false);
  };

  return (
    <div className="">
      <div className="bg-cyan-700">
        <div className="grid grid-cols-3 items-stretch p-4">
          <h1 className="col-span-1 text-white">Show Tracker</h1>
          <nav className=" col-span-1 text-white flex justify-center">
            <ul className="flex">
              {navItems.map((item) => (
                <NavItem
                  key={item.path}
                  label={item.label}
                  path={item.path}
                  active={location.pathname === item.path}
                />
              ))}
            </ul>
          </nav>
          <div className="col-span-1 justify-self-end">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleOpenLoginModal}
            >
              Login
            </button>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleOpenSignoutModal}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <div className="grid items-start bg-zinc-900">
        <div className="min-h-screen bg-slate-200 right-side">
          <div className="p-6">
            <div className="">{props.children}</div>
          </div>
        </div>
      </div>
      <div>
        <h1>Bottom</h1>
      </div>
      {loginModal && <LoginModal onClose={handleCloseLoginModal} />}
      {signoutModal && <SignoutModal onClose={handleCloseSignoutModal} />}
    </div>
  );
}
const NavItem = ({ label, path, active }) => {
  return (
    <li className={`nav-item ${active ? " nav-line animate-pulse" : ""}`}>
      <Link to={path} className="nav-text">
        {label}
      </Link>
    </li>
  );
};
export default Header;
