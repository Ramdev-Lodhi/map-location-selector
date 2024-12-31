/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = ({ onLoginClick }) => {
  const { logoutUser, isAuthenticated } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonToggle = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <nav className={showMenu ? "menu-mobile" : "menu-web"}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/address">Address</Link>
              </li>
              <li>
                <a href="#" onClick={logoutUser}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <a href="#" onClick={onLoginClick}>
                  Login/Signup
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="ham-menu">
        <button onClick={handleButtonToggle}>
          <GiHamburgerMenu />
        </button>
      </div>
    </>
  );
};

export default Navbar;
