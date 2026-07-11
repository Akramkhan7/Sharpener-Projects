import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import App from "./App.jsx";
import AuthProvider from "./components/Store/AuthProvider.jsx";
import ExpenseProvider from "./components/Store/ExpenseProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ExpenseProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ExpenseProvider>
    </BrowserRouter>
  </StrictMode>,
);
