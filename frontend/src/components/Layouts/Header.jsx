import { useContext } from "react";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
  const { isAuthModalVisible, toggleAuthModal } = useContext(AuthContext);

  return (
    <>
      <header>
        <div className="container">
          <div className="grid navbar-grid">
            <div className="logo">
              <h1>Location</h1>
            </div>
            <Navbar onLoginClick={toggleAuthModal} />
          </div>
        </div>
      </header>
      {isAuthModalVisible && <AuthModal />}
    </>
  );
};

export default Header;
