import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/userContext";

const Home = () => {
  const { user, logout } = useContext(UserContext);

  if (user.user) {
    var { first_name, last_name } = user?.user;
  }


  if(!user.isAuthenticated){
    return <Navigate to="/login" />
  }

  return user.isAuthenticated && user.user !== null ? (
    <div>
      <h1>
        Hello, {first_name} {last_name}!
      </h1>
      <button onClick={logout}  className="button">Logout</button>
    </div>
  ) : (
    <div>
      <h1>You need to <Link to="/login">login</Link> first</h1>
    </div>
  );
};

export default Home;
