// hooks/useUpdatePost.js
import { useState } from "react"

const useUpdatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updatePost = async (postId, updates) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updates),
            });
            
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Error al actualizar el post");
            
            setLoading(false);
            return data.post; // Devuelve el post actualizado
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false;
        }
    };

    return { updatePost, loading, error };
};

export default useUpdatePost;