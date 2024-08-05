import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

const initialState = { isAuthenticated: false, user: { email: "", password: "" } };

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return { ...state, isAuthenticated: true, user: action.user };
    case "SET_LOGGED_OUT":
      return initialState;
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (isAuthenticated && user){
      dispatch({type:"SET_LOGGED_IN",user})
    }

  }, []);

  const login = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.find(u => u.email === email && u.password === password);

    if (!userExists) {
      toast.error("User Not Found", { position: "bottom-left" });
      return
    } else {
      let user = { ...userExists };
      dispatch({ type: "SET_LOGGED_IN", user });
      localStorage.setItem("isAuthenticated", JSON.stringify(true))
      localStorage.setItem("user", JSON.stringify(user))
      toast.success("User Logged In Successfully", { position: "bottom-left" });
      return
    }
  }

  const logout = () => {
    dispatch({ type: "SET_LOGGED_OUT" });
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    toast.error("User Logged Out!", { position: "bottom-left" });
  }

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
