import React, { useState, createContext, useContext } from "react";
import { GlobalContextType } from "../types";
//@ts-ignore
const logContext = createContext<GlobalContextType>();
const Context = ({ children }: { children: JSX.Element }) => {
    const [logged, setLogged] = useState(false)
    const [user, setUser] = useState({
        cc: "",
        name: "",
        isCashier: false,
        id: "",
    })
    const [day, setDay] = useState({
        date: "",
        isDay: false,
        tips: 0,
        employees: []
    })
    return (
        <logContext.Provider value={{
            user,
            logged,
            setLogged,
            setUser,
            day, 
            setDay
        }}>
            {children}
        </logContext.Provider>
    );
};

const useGlobalState = () => useContext(logContext);

export { Context, useGlobalState };