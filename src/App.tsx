import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CheckDays from "./pages/CheckDays";
import Tips from "./pages/Tips";
const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/days" element={<CheckDays />} />
                    <Route path="/tips" element={<Tips />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;