import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/userContext";

const Home = () => {
  const { user, logout } = useContext(UserContext);

  if (user.user) {
    var { first_name, last_name, gender } = user?.user;
  }

  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return user.isAuthenticated && user.user !== null ? (
    <div className="profile">
      <img
        src={`/images/${gender === "Male" ? "male" : "female"}.png`}
        alt="Avatar"
        className="avatar"
      />
      <h1>
        {first_name} {last_name}
      </h1>
      <button onClick={logout} className="button">
        Logout
      </button>
    </div>
  ) : (
    <div>
      <h1>
        You need to <Link to="/login">login</Link> first
      </h1>
    </div>
  );
};

export default Home;
