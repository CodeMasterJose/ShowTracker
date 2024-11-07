import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
//import Leftbar from "./Leftbar";
import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";

function Header(props) {
  const location = useLocation();
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Search Series", path: "/search" },
    { label: "Blog", path: "/blog" },
  ];

  const [loginModal, setLoginModal] = useState(false);

  const handleOpenLoginModal = () => {
    setLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModal(false);
  };

  return (
    <div className="">
      {/* top bar */}
      <div className="bg-cyan-700">
        <div className="grid grid-cols-3 items-stretch p-4">
          {/* <div className="bg-gray-500">
        <p>Hello World</p>
      </div> */}
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
          </div>
          {/* <h1 className="col-span-1 text-white justify-self-end">Test Again</h1> */}
        </div>
      </div>
      {/* <div className="inline-block h-40 bg-gray-900 text-white">
        <Leftbar />
      </div>
      <div className="inline-block bg-gray-900">
        <Breadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <div className="inline-block">{props.children}</div> */}
      <div className="grid items-start bg-zinc-900">
        {/* <div className="col-span-1 h-full bg-zinc-900 left-bar flex-shrink-0">
          <Leftbar />
        </div> */}
        <div className="min-h-screen bg-slate-200 right-side">
          {/* displays children aka pages into header */}
          <div className="p-6">
            <div className="">{props.children}</div>
          </div>
        </div>
      </div>
      <div>
        <h1>Bottom</h1>
      </div>
      {loginModal && <LoginModal onClose={handleCloseLoginModal} />}
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
