import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AuthForm from "../UI/AuthForm";
import { signin, signup } from "../../services/Auth";

const AuthModal = () => {
  const {
    isLogin,
    switchToLogin,
    switchToSignup,
    toggleAuthModal,
    loginUser,
    setIsAuthenticated
  } = useContext(AuthContext);

  const handleSubmit = async (formData) => {
    try {
      console.log(isLogin);
      console.log(formData);
      const { data } = isLogin
        ? await signin(formData)
        : await signup(formData);
      console.log(data);
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        loginUser(data.user);
        setIsAuthenticated(true);
        alert("Success! You are now logged in.");
        toggleAuthModal();
      } else {
        alert("Invalid Email or Password");
      }
    } catch (err) {
      console.error(err);
      alert(
        "Error: " + (err.response?.data?.message || "Something went wrong")
      );
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <button className="close-modal" onClick={toggleAuthModal}>
          ×
        </button>
        <div className="auth-tabs">
          <button className={isLogin ? "active" : ""} onClick={switchToLogin}>
            Login
          </button>
          <button className={!isLogin ? "active" : ""} onClick={switchToSignup}>
            Signup
          </button>
        </div>
        <AuthForm isLogin={isLogin} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AuthModal;
