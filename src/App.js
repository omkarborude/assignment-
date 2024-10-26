// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import QuoteListPage from "./pages/QuoteListPage";
import QuoteCreationPage from "./pages/QuoteCreationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quotes" element={<QuoteListPage />} />
        <Route path="/create-quote" element={<QuoteCreationPage />} />
        <Route path="*" element={<Navigate to="/login" />} />{" "}
        {/* Redirect to login by default */}
      </Routes>
    </Router>
  );
}

export default App;
