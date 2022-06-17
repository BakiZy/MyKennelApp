import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";
import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Navigation = () => {
  const authContext = useContext(AuthContext);

  const isLogged = authContext.isLoggedIn;
  const isAdmin = authContext.isAdmin;
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <span role="img" aria-label="poodle">
          {" "}
          &#128041; Podle kennel Von Apalusso &#128041;
        </span>
      </div>
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
            <Link to="/poodles">Poodles</Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
