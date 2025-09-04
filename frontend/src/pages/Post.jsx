import React from "react";
import usePosts from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import '../styles/Post.css';

const Post = () => {
    const {posts, loading, error} = usePosts();
    if(loading) return <p className="loading">Cargando posts...</p>;
    if(error) return <p className="error">Error: {error}</p>;
    return(
        <div className="posts-container-title">
            <h1>Posts recientes</h1>
            <div className="post-container">
            {posts.length === 0 && <p className="no-posts">No hay posts aún</p>}
            {posts.map(post => (
                <PostCard key={post._id} {...post}/>
            ))}
            </div>
        </div>
    )
}

export default Post;