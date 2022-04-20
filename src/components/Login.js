import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";

const Login = () => {
  const { login, user:userContext } = useContext(UserContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });



  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    login(user);
  };

  if(userContext.isAuthenticated && userContext.user){
    return <Navigate to="/" replace/>
  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <h1>Login</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="form-input"
        onChange={changeHandler}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="form-input"
        onChange={changeHandler}
        required
      />
      <button type="submit" className="button font">Login</button>
      <Link to="/register" className="font">
        Register
      </Link>
    </form>
  );
};

export default Login;
