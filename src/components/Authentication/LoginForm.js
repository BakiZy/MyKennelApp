import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import classes from "./LoginForm.module.css";
import Button from "../UI/Button";

const AuthForm = () => {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const switchLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const loginFetch = async () => {
      setIsLoading(true);
      const enteredUsername = usernameInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      console.log(enteredUsername);

      if (
        enteredUsername.trim().length < 4 ||
        enteredPassword.trim().length < 7
      ) {
        alert("entered values must be valid");
        setIsLoading(false);
        return;
      }

      axios
        .post("https://localhost:44373/api/Authentication/login", {
          username: enteredUsername,
          password: enteredPassword,
        })
        .then((response) => {
          authContext.login(
            response.data.token,
            response.data.expiration,
            response.data.username
          );
          console.log(response.data);
          if (response.data.username === "AdminZ") {
            authContext.isAdmin = true;
            console.log("adminEZARA");
          }
          setIsLogin(true);
          setIsLoading(false);
          alert("login successful");
          navigate("/");
          usernameInputRef.current.value = "";
          passwordInputRef.current.value = "";
        })
        .catch((error) => {
          alert(error.message);
          setIsLoading(false);
        });
    };

    const registerFetch = async () => {
      event.preventDefault();
      setIsLoading(true);
      const enteredEmail = emailInputRef.current.value;
      const enteredUsername = usernameInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;

      if (
        enteredUsername.length < 4 ||
        enteredPassword < 7 ||
        !enteredEmail.includes("@")
      ) {
        setIsLoading(false);
        alert("validation error");
        return;
      }

      axios
        .post("https://localhost:44373/api/Authentication/register", {
          username: enteredUsername,
          password: enteredPassword,
          email: enteredEmail,
        })
        .then((response) => {
          console.log(response.data);
          setIsLoading(false);
          alert("successful registration");
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error.message);
        });
    };

    if (isLogin) {
      loginFetch();
    } else {
      registerFetch();
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Register account"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="email">E-mail address</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <Button>{isLogin ? "Login" : "Create account"}</Button>
          )}
          {isLoading && <div>Loading...</div>}
          <Button type="button" onClick={switchLoginHandler}>
            {isLogin ? "Create a new account" : "Login with existing account"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
