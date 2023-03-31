import * as React from "react";
import Login from "../components/Login";
const AuthPage = () => {
    const [login, setLogin] = React.useState(true);
    return (
        <Login></Login>
    );
};

export default AuthPage;