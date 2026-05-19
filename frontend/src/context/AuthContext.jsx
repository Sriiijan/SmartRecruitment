import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Persist Login
  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (
      storedUser &&
      storedUser !== "undefined"
    ) {

      setUser(JSON.parse(storedUser));
    }

    setLoading(false);

  }, []);

  // Login
  const login = (userData) => {

    setUser(userData);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
  };

  // Logout
  const logout = () => {

    setUser(null);

    localStorage.removeItem("user");
  };

  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);