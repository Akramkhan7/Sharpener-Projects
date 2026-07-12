import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import App from "./App.jsx";
import AuthProvider from "./components/Store/AuthProvider.jsx";
import {Provider} from "react-redux";
import ExpenseProvider from "./components/Store/ExpenseProvider.jsx";
import store from "./components/Store/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
          <Provider store={store}>
          <App />
          </Provider>
    </BrowserRouter>
  </StrictMode>,
);
