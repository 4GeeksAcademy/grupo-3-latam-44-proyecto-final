import React, { useEffect, useState, useContext, createContext, Children } from "react";

const UserContext = createContext(null)
export const UserProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('access_token'))
    useEffect(() => {
        
    }, [])
} 