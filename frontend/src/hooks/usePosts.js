import { useEffect, useState } from "react"

const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchPosts = async() => {
            try{
                const res = await fetch("http://localhost:3000/api/posts", {
                    method: "GET",
                    headers: {"content-type":"application-json"}
                });
                const data = await res.json();
                if(!res.ok) throw new Error(data.message || "Error al obtener posts");
                setPosts(data || []);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        fetchPosts();
    },[]);
    return {posts, loading, error};
};
export default usePosts;