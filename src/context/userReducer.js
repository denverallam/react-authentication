import { act } from "react-dom/test-utils";
import * as user from "./userConstant";

const userReducer = (state, action) => {
  switch (action.type) {
    case user.LOGIN:
      return { ...state, user: action.payload, isAuthenticated: true };
    case user.LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    case user.REGISTER:
      let newUserList = [...state.users, action.payload];
      localStorage.setItem("users", JSON.stringify(newUserList));
      return {
        ...state,
        users: newUserList,
        user: action.payload,
      };
    case user.LOAD_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
