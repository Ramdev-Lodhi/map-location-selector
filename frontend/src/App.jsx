import "./App.css";
import { Header } from "./components/Layouts/Header";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <HomePage />
      </AuthProvider>
    </>
  );
}

export default App;
