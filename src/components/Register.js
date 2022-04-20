import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

const Register = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { isPasswordValid, register, isEmailUsed } = useContext(UserContext);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const {
      password,
      password_confirmation,
      email,
      first_name,
      last_name,
      gender,
    } = user;

    if (
      password &&
      password_confirmation &&
      first_name &&
      last_name &&
      gender
    ) {
      // check if email is available
      if (!isEmailUsed(email)) {
        //check if passwords match
        if (password === password_confirmation) {
          // check if password format is valid
          if (isPasswordValid(password)) {
            register(user);
            setUser({
              first_name: "",
              last_name: "",
              gender: "",
              email: "",
              password: "",
              password_confirmation: "",
            });
            alert("Successfully registered");
            navigate("/login");
          } else {
            alert(`Password must contain: 
  At least 8 characters,
  At least one upper case letter,
  At least one lower case letter,
  At least one digit,
  At least one special character.`);
            // alert("Wrong password format");
          }
        } else {
          alert("Password does not match");
        }
      } else {
        alert("Email is already used");
      }
    } else {
      alert("Please fill out the form");
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <h1>Register</h1>

      <input
        name="first_name"
        type="text"
        onChange={changeHandler}
        className="form-input"
        placeholder="First Name"
        required
      />
      <input
        name="last_name"
        type="text"
        className="form-input"
        onChange={changeHandler}
        placeholder="Last Name"
        required
      />
      <select
        className="form-input"
        name="gender"
        onChange={changeHandler}
        required
      >
        <option className="option-disabled" selected disabled hidden>
          Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        name="email"
        type="email"
        onChange={changeHandler}
        placeholder="Email"
        className="form-input"
        required
      />
      <input
        name="password"
        type="password"
        className="form-input"
        placeholder="Password"
        onChange={changeHandler}
        required
      />
      <input
        name="password_confirmation"
        className="form-input"
        type="password"
        placeholder="Confirm Password"
        onChange={changeHandler}
        required
      />
      <button type="submit" className="button font">
        Register
      </button>
      <Link to="/login" className="font">
        Login
      </Link>
    </form>
  );
};

export default Register;
