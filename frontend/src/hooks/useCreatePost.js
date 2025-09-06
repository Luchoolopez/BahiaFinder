import { useState } from "react"

const useCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createPost = async (title, description, authorName, contact, images, status) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers:
                {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ title, description, authorName, contact, images, status }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error de autenticacion");
            setLoading(false);
            return data;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false;
        }
    };
    return { createPost, loading, error };
}

export default useCreatePost