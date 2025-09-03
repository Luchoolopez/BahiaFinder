import { useState } from "react"

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error de autenticación");
            localStorage.setItem("token", data.token);
            setLoading(false);
            return true;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false;
        }
    };

    return { register, error, loading };
}

export default useRegister;