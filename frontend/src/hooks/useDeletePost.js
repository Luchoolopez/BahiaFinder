// hooks/useDeletePost.js
import { useState } from "react"

const useDeletePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deletePost = async (postId) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Error al eliminar el post");
            }
            
            setLoading(false);
            return true;
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false;
        }
    };

    return { deletePost, loading, error };
};

export default useDeletePost;