import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import Courses from "./routes/Courses";
import Patrons from "./routes/Patrons";
import About from "./routes/About";

const Index = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <App
                loading={loading}
                setLoading={setLoading}
                currentAccount={currentAccount}
                setCurrentAccount={setCurrentAccount}
              />
            }
          >
            <Route
              path="/events"
              element={
                currentAccount ? (
                  <Courses loading={loading} setLoading={setLoading} />
                ) : (
                  <Navigate to="/" replace={true} />
                )
              }
            />
            <Route
              path="/trophies"
              element={
                currentAccount ? (
                  <Patrons
                    currentAccount={currentAccount}
                    setLoading={setLoading}
                  />
                ) : (
                  <Navigate to="/" replace={true} />
                )
              }
            />
            <Route
              path="/about"
              element={
                currentAccount ? <About /> : <Navigate to="/" replace={true} />
              }
            />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
