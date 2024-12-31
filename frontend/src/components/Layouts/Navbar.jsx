/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = ({ onLoginClick }) => {
  const { user, logoutUser,isAuthenticated } = useContext(AuthContext);

  return (
    <nav>
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
  );
};

export default Navbar;
