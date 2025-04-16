import axios from "axios";
import {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthContextWrapper = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const nav = useNavigate();


  const authenticateUser = async () => {
    const tokenFromLocalStorage = localStorage.getItem("authToken");
    if (!tokenFromLocalStorage) {
      setCurrentUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    } else {
        try {
            const responseFromVerifyRoute = await axios.get(
              `${import.meta.env.VITE_API_URL}/auth/verify`,
              {
                headers: {
                  Authorization: `Bearer ${tokenFromLocalStorage}`,
                },
              }
            );
            const userWithToken = {
              ...responseFromVerifyRoute.data.payload,
              token: tokenFromLocalStorage,
            };

        console.log("authenticate user function", responseFromVerifyRoute)
        setCurrentUser(userWithToken);
        setIsLoading(false);
        setIsLoggedIn(true)
         } catch (error) {
            console.log(error);
            setCurrentUser(null);
            setIsLoading(false);
            setIsLoggedIn(false);
        }
    }
    }

 
  useEffect(() => {
    authenticateUser();
  }, []);


    async function handleLogout() {
        localStorage.removeItem("authToken");
        await authenticateUser();
       
      }
      return(
        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                isLoading,
                isLoggedIn,
                authenticateUser,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
      );
    };

export {AuthContext, AuthContextWrapper};