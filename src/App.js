import { Routes, Route } from "react-router-dom";
import Navigation from "./components/UI/Navigation";
import React, { useContext, useState } from "react";

import AuthContext from "./store/auth-context";
import Home from "../src/pages/Home";
import LoginPage from "../src/pages/Login";
import AdminPage from "../src/pages/Admin";
import ProfilePage from "./pages/Profile";
import NotFound from "../src/pages/NotFound";
import Poodles from "../src/pages/Poodles";
import Modal from "./components/UI/Modal";
import Layout from "./components/UI/Layout";
import EditPoodle from "./pages/EditPoodle";

function App() {
  const [modal, setModal] = useState(false);

  const authContext = useContext(AuthContext);

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <Layout>
      <Navigation />
      <Modal closed={closeModal} show={modal} />
      <button onClick={showModal}>modal button</button>
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
