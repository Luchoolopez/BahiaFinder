import { useState } from "react"

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async(email, password) => {
        setLoading(true);
        setError(null);
        try{
            const res = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "Application/json"},
                body: JSON.stringify({email, password}),
            });
            const data = await res.json();
            if(!res.ok) throw new Error(data.message || "Error de Autenticacion");
            localStorage.setItem("token", data.token);
            setLoading(false);
            return true;
        }catch(error){
            setError(error.message);
            setLoading(false);
            return false;
        }
    };
    return {login, loading, error};
};

export default useLogin;