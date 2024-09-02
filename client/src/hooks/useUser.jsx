import { createContext, useContext } from "react";

const user = {
  users: [],
  isAuthenticated: null,
  token: null,
  role: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, token: action.payload };
    case "signup":
      return { ...state, isAuthenticated: true, token: action.payload };
    case "getAllUsersAdmin":
      return { ...state, users: action.payload };
    case "deleteAUserAdmin":
      return {
        ...state,
        users: state.users.filter((user) => user._id != action.payload),
      };
      case "assignRole": return {...state, role: action.payload}
    default:
      return state;
  }
};

const UserContext = createContext();

const useUserValue = () => useContext(UserContext);

export { user, userReducer, UserContext, useUserValue };
