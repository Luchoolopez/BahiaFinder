import React from "react";
import useAuth from "../hooks/useAuth";
import '../styles/Header.css';
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    }

    const handleRegister = () => {
        navigate("/Registrarse");
    }

    return(
        <header>
            <div className="header-container">
                <div className="header-title">
                    <h2>Bahia Busca</h2>
                </div>
                <div className="header-btn">
                    {isAuthenticated ? (
                        <>
                            <button onClick={() => navigate("/mis-posts")}>Mis Posts</button>
                            <button onClick={() => navigate("/crear-post")}>Crear Post</button>
                            <button onClick={handleLogout}>Cerrar sesión</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate("/iniciar-sesion")}>Iniciar Sesión</button>
                            <button onClick={handleRegister}>Registrarse</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;