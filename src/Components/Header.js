import React from "react";
import Logo from '../images/evernote_logo.svg'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex justify-start items-center ">
          <img src={Logo} className="" alt="yournoteapp-logo" />
        </div>

        <nav>
          <Link to="/login">
            <p className="text-green-600 font-bold rounded border-green-600 border-2 py-2 px-4">Log In</p>
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header;