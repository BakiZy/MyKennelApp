import { Routes, Route } from "react-router-dom";
import Navigation from "./components/UI/Navigation";
import { useContext } from "react";

import AuthContext from "./store/auth-context";
import Home from "../src/pages/Home";
import LoginPage from "../src/pages/Login";
import AdminPage from "../src/pages/Admin";
import NotFound from "../src/pages/NotFound";
import Poodles from "../src/pages/Poodles";

import Layout from "./components/UI/Layout";

function App() {
  const authContext = useContext(AuthContext);

  console.log(
    "logged in state: " +
      authContext.isLoggedIn +
      "with JWT:" +
      authContext.token
  );
  return (
    <Layout>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/poodles" element={<Poodles />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
