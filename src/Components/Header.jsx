import React from "react";
import Logo from "../images/idea_spark_logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex justify-start items-center ">
          <img src={Logo} className="w-32" alt="yournoteapp-logo" />
        </div>

        <nav>
          <Link to="/login">
            <p className="text-blue-600 font-bold rounded border-blue-500 border-2 py-2 px-4">
              Log In
            </p>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
