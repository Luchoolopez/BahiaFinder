import { useEffect, useState } from "react"

const useUserPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:3000/api/posts/my-posts", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Error al obtener posts");
                setPosts(data || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserPosts();
    }, []);

    return { posts, loading, error, setPosts };
};

export default useUserPosts;