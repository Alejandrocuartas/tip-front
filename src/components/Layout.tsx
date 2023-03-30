import * as React from "react";
import Navbar from "./Navbar";
const Layout = ({ children }: { children: JSX.Element }) => {
    const onLogin = () => {
        console.log("hi")
    }
    return (
        <div>
            <Navbar onLogin={onLogin}></Navbar>
            {children}
        </div>
    );
};

export default Layout;