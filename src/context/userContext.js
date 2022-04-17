import { createContext, useEffect, useReducer } from "react";
import userReducer from "./userReducer";
import * as constant from "./userConstant";

const UserContext = createContext({});

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, {
    user: null,
    users: [],
    isAuthenticated: false,
  });

  useEffect(() => {
    // get user list from local storage
    let users = JSON.parse(localStorage.getItem("users"));
    users && dispatch({ type: constant.LOAD_USERS, payload: users });
  }, []);

  useEffect(() => {
    let userDetails = JSON.parse(localStorage.getItem("user"));
    userDetails && dispatch({ type: constant.LOGIN, payload: userDetails });
  }, []);


  const login = (userData) => {
    let { email, password } = userData;
    if (user.users) {
      let emailExists = user?.users.some(
        (userDetails) => userDetails.email === email
      );

      if (emailExists) {
        let userDetails = user.users.find((user) => user.email === email);
        if (userDetails.password === password) {
          dispatch({ type: constant.LOGIN, payload: userDetails });
          alert(`Hello, ${userDetails.first_name}`);
          localStorage.setItem("user", JSON.stringify(userDetails));
        } else {
          alert("Incorrect password");
        }
      } else {
        alert("User does not exist");
      }
    }
  };

  const logout = () => {
    dispatch({ type: constant.LOGOUT });
    localStorage.removeItem("user");
  };

  const register = (user) => {
    dispatch({ type: constant.REGISTER, payload: user });
  };

  const isPasswordValid = (password) => {
    // At least one upper case English letter, (?=.*?[A-Z])
    // At least one lower case English letter, (?=.*?[a-z])
    // At least one digit, (?=.*?[0-9])
    // At least one special character, (?=.*?[#?!@$%^&*-])
    // Minimum eight in length .{8,} (with the anchors)


    let pattern =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const regex = new RegExp(pattern);
    return regex.test(password);
    // return true;
  };

  const isEmailUsed = (email) => {
    //check if email is not used
    return user.users && user.users.some((user) => user.email === email);
  };

  return (
    <UserContext.Provider
      value={{ user, login, isPasswordValid, isEmailUsed, register, logout }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
