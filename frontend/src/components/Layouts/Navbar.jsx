/* eslint-disable react/prop-types */
const Navbar = ({ onLoginClick }) => {
  return (
    <nav>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <a href="#" onClick={onLoginClick}>
            Login/Signup
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
