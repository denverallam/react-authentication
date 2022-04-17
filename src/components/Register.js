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

  const [isPasswordFormatValid, setIsPasswordFormatValid] = useState(false);

  const { isPasswordValid, register, isEmailUsed } = useContext(UserContext);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //UI Validator
  //check if password is valid
  const validatePassword = (e) => {
    setIsPasswordFormatValid(isPasswordValid(e.target.value));
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // check if email is available
    if (!isEmailUsed(user.email)) {
      //check if passwords match
      if (user.password === user.password_confirmation) {
        // check if password format is valid
        if (isPasswordValid(user.password)) {
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
          alert(`Password must be at least 8 characters and must contain: 
At least one upper case letter,
At least one lower case letter,
At least one digit,
At least one special character,`
          );
          // alert("Wrong password format");
        }
      } else {
        alert("Password does not match");
      }
    } else {
      alert("Email is already used");
    }
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <input
        name="first_name"
        type="text"
        onChange={changeHandler}
        placeholder="First Name"
        required
      />
      <input
        name="last_name"
        type="text"
        onChange={changeHandler}
        placeholder="Last Name"
        required
      />
      <select name="gender" onChange={changeHandler} required>
        <option selected disabled>
          -
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Non-binary">Non-binary</option>
        <option value="Transgender">Transgender</option>
        <option value="Intersex">Intersex</option>
        <option value="Other">Other</option>
        <option value="I prefer not to say">I prefer not to say</option>
      </select>

      <input
        name="email"
        type="email"
        onChange={changeHandler}
        placeholder="Email"
        required
      />
      <input
        name="password"
        type="password"
        onBlur={validatePassword}
        className={
          user.password !== "" && (isPasswordFormatValid ? "valid" : "invalid")
        }
        placeholder="Password"
        onChange={changeHandler}
        required
      />
      <input
        name="password_confirmation"
        type="password"
        placeholder="Confirm Password"
        onChange={changeHandler}
      />
      <button type="submit">Register</button>
      <Link to="/login">Login</Link>
    </form>
  );
};

export default Register;
