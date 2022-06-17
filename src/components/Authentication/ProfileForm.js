import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const usernameInputRef = useRef();
  const currentPasswordInput = useRef();
  const newPasswordInput = useRef();
  const confirmPasswordInput = useRef();

  const logoutHandler = () => {
    authContext.logout();
    navigate("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const currentPassword = currentPasswordInput.current.value;
    const newPassword = newPasswordInput.current.value;
    const confirmPassword = confirmPasswordInput.current.value;

    const token = authContext.token;
    console.log(token + "token iz profila");
    if (newPassword !== confirmPassword) {
      alert("passwords must match!");
      return;
    }

    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    const bodyParameters = {
      username: username,
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    const changePassword = async () => {
      axios
        .post(
          "https://localhost:44373/api/Authentication/change-password",
          bodyParameters,
          config
        )
        .then(function(response) {
          console.log(response);
          alert("password succesffully changed");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    changePassword();
  };

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="current-password">Current Password</label>
          <input
            type="password"
            id="current-password"
            required
            minLength="7"
            ref={currentPasswordInput}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="new-password">New password</label>
          <input
            type="password"
            id="new-password"
            required
            minLength="7"
            ref={newPasswordInput}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            required
            ref={confirmPasswordInput}
          />
        </div>
        <div>
          <button>Update password</button>
        </div>
      </form>
      <div>
        <button onClick={logoutHandler}>Logout </button>
      </div>
    </>
  );
};

export default ProfileForm;
