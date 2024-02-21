import { createContext, useReducer } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

// Create AuthContext
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   // Check if user is logged in from local storage
  //   const userFromStorage = localStorage.getItem("user");
  //   if (userFromStorage) {
  //     dispatch({ type: LOGIN, payload: JSON.parse(userFromStorage) });
  //   }
  // }, []);

  const login = userData => {
    dispatch({ type: LOGIN, payload: userData });
    // Save user data to local storage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    // Remove user data from local storage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
