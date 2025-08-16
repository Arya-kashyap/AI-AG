import { useState, createContext, useContext } from "react";
import cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
     const [authUser, setAuthUser] = useState(()=>{
          return localStorage.getItem('token') || cookies.get('token') || null;
     });
     return (
          <AuthContext.Provider value={[ authUser, setAuthUser ]}>
               {children}
          </AuthContext.Provider>
     );
};

export const useAuth = () => useContext(AuthContext);