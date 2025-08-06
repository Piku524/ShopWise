import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Shop from "./Shop";
import LoginSignup from "./LoginSignup";
import { AuthProvider, useAuth } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppContent() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [view, setView] = useState("shop");

  // Toggle Dark Mode and save preference
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  };

  // On mount, load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      setDark(true);
    }
  }, []);

  return (
    <div style={{ fontFamily: "Segoe UI", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: dark ? "#1f1f1f" : "#2c3e50",
          color: "white",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => setView("shop")}>
          🛒 ShopWise
        </h2>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => setView("shop")}
            style={buttonStyle}
          >
            🏠 Home
          </button>
          <button
            onClick={toggleDarkMode}
            style={buttonStyle}
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            onClick={() => setView("orders")}
            style={buttonStyle}
          >
            📦 Orders
          </button>
          <button
            onClick={() => setView("profile")}
            style={buttonStyle}
          >
            👤 Profile
          </button>
          <LoginSignup />
        </div>
      </nav>

      {/* Main content */}
      <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
        {view === "shop" && (
          <>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                marginBottom: 20,
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: 16,
              }}
            />
            {user ? (
              <Shop search={search} />
            ) : (
              <p style={{ marginTop: 30, fontSize: 18, textAlign: "center" }}>
                Please login to view products.
              </p>
            )}
          </>
        )}

        {view === "orders" && (
          <div>
            <h2>📦 Your Orders</h2>
            <p>You have no orders yet. Start shopping now!</p>
          </div>
        )}

        {view === "profile" && user && (
          <div>
            <h2>👤 Profile</h2>
            <p>Email: {user.email}</p>
            <p>Welcome to your ShopWise account.</p>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

// Button common style for navbar buttons
const buttonStyle = {
  backgroundColor: "transparent",
  color: "white",
  border: "1px solid white",
  padding: "5px 10px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
}
