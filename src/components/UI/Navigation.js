import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import {
  FaFacebook,
  FaInstagram,
  FaDog,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

const Navigation = () => {
  const authContext = useContext(AuthContext);

  const isLogged = authContext.isLoggedIn;
  const isAdmin = authContext.isAdmin;
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <FaDog color="#38015c" />
        Poodle Kennel Von Apalusso
        <FaDog color="#38015c" />
        {/* <span role="img" aria-label="poodle">
          &#128041; Podle kennel Von Apalusso &#128041;
        </span> */}
      </div>
      <div className={classes.fa}>
        <a href="tel:+381646149512">
          <FaWhatsapp className={classes.faWhatsapp} />
        </a>
        <a href="https://www.facebook.com/milos.petrov.10/" target="_blank">
          <FaFacebook className={classes.faFacebook} />
        </a>
        <a href="https://www.instagram.com/vonappalusso/" target="_blank">
          <FaInstagram className={classes.faInstagram} />
        </a>
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!isLogged && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {isLogged && (
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            )}
            <li>
              <Link to="/about">About</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
