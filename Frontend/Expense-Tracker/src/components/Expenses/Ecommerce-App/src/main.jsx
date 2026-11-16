import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import CartProvider from "./components/Store/CartProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./components/Store/AuthContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
