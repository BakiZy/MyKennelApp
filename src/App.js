import { Routes, Route } from "react-router-dom";
import Navigation from "./components/UI/Navigation";
import React, { useContext } from "react";

import AuthContext from "./store/auth-context";
import Home from "../src/pages/Home";
import LoginPage from "../src/pages/Login";
import AdminPage from "../src/pages/Admin";
import ProfilePage from "./pages/Profile";
import NotFound from "../src/pages/NotFound";
import Poodles from "../src/pages/Poodles";

import Layout from "./components/UI/Layout";
import EditPoodle from "./pages/EditPoodle";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <Layout>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/poodles" element={<Poodles />} />
        {authContext.isLoggedIn ? (
          <Route path="/profile" element={<ProfilePage />} />
        ) : (
          <Route path="/login" element={<LoginPage />} />
        )}
        {authContext.isAdmin && <Route path="/admin" element={<AdminPage />} />}
        <Route path=":poodleId" element={<EditPoodle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
