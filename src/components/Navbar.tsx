import React from "react";
import { useGlobalState } from "../context";
const Navbar = () => {
    const { logged } = useGlobalState()
    return (<div>
        {
            logged ? (
                <h1>Hola</h1>
            ) : null
        }
    </div>)
}

export default Navbar