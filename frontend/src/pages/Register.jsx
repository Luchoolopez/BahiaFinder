import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";

const Register = () => {
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: "",
    });
    const { register, error, loading } = useRegister();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(form.nombre, form.email, form.password);
        if (success) {
            navigate("/iniciar-sesion");
        }
    };

    return (
        <div className="page-register">
            <div className="register-container">
                <h2>Registrarse</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="user-box">
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                        <label>Nombre</label>
                    </div>
                    <div className="user-box">
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Correo Electrónico</label>
                    </div>
                    <div className="user-box">
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <label>Contraseña</label>
                    </div>
                    <div className="register-container-btn">
                        <button type="submit" disabled={loading}>
                            {loading ? "Creando cuenta..." : "Crear cuenta"}
                        </button>
                    </div>
                </form>
                <div className="register-link">
                    <p>¿Ya tienes cuenta? <span onClick={() => navigate("/iniciar-sesion")}>Iniciar sesión</span></p>
                </div>
            </div>
        </div>
    );
};

export default Register;