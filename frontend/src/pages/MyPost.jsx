// components/MyPosts.jsx
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useUserPosts from "../hooks/useUserPosts";
import useUpdatePost from "../hooks/useUpdatePost";
import useDeletePost from "../hooks/useDeletePost";
import Header from "../components/Header";
import '../styles/MyPosts.css';

const MyPosts = () => {
    const { isAuthenticated } = useAuth();
    const { posts, loading, error, setPosts } = useUserPosts();
    const { updatePost, loading: updating } = useUpdatePost();
    const { deletePost, loading: deleting } = useDeletePost();
    const [editingPostId, setEditingPostId] = useState(null);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        contact: "",
        status: ""
    });

    const handleEditClick = (post) => {
        setEditingPostId(post._id);
        setEditForm({
            title: post.title,
            description: post.description,
            contact: post.contact,
            status: post.status
        });
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
        setEditForm({
            title: "",
            description: "",
            contact: "",
            status: ""
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = async (postId) => {
        const updatedPost = await updatePost(postId, editForm);
        if (updatedPost) {
            // Actualizar la lista de posts localmente
            setPosts(prevPosts => 
                prevPosts.map(post => 
                    post._id === postId ? updatedPost : post
                )
            );
            setEditingPostId(null);
            alert("Post actualizado exitosamente");
        } else {
            alert("Error al actualizar el post");
        }
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este post?")) {
            const success = await deletePost(postId);
            if (success) {
                // Eliminar el post de la lista localmente
                setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
                alert("Post eliminado exitosamente");
            } else {
                alert("Error al eliminar el post");
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="my-posts-container">
                <div className="auth-required">
                    <h2>Debes iniciar sesión para ver tus posts</h2>
                    <p>Por favor, inicia sesión para acceder a esta funcionalidad.</p>
                </div>
            </div>
        );
    }

    if (loading) return <div className="my-posts-container"><p>Cargando tus posts...</p></div>;
    if (error) return <div className="my-posts-container"><p className="error">Error: {error}</p></div>;

    return (
        <>
            <Header/>
            <div className="my-posts-container">
                <div className="my-posts-header">
                    <h2>Mis Publicaciones</h2>
                    <p>Aquí puedes ver y editar todas tus publicaciones</p>
                </div>

                {posts.length === 0 ? (
                    <div className="no-posts">
                        <p>No has creado ningún post todavía.</p>
                    </div>
                ) : (
                    <div className="posts-list">
                        {posts.map(post => (
                            <div key={post._id} className="post-item">
                                {editingPostId === post._id ? (
                                    <div className="edit-form">
                                        <div className="form-group">
                                            <label>Título:</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={editForm.title}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Descripción:</label>
                                            <textarea
                                                name="description"
                                                value={editForm.description}
                                                onChange={handleInputChange}
                                                rows="3"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Contacto:</label>
                                            <input
                                                type="text"
                                                name="contact"
                                                value={editForm.contact}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Estado:</label>
                                            <select
                                                name="status"
                                                value={editForm.status}
                                                onChange={handleInputChange}
                                            >
                                                <option value="perdido">Perdido</option>
                                                <option value="encontrado">Encontrado</option>
                                            </select>
                                        </div>
                                        <div className="edit-actions">
                                            <button 
                                                onClick={() => handleSaveEdit(post._id)}
                                                disabled={updating}
                                                className="save-btn"
                                            >
                                                {updating ? "Guardando..." : "Guardar"}
                                            </button>
                                            <button 
                                                onClick={handleCancelEdit}
                                                className="cancel-btn"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="post-content">
                                            <h3>{post.title}</h3>
                                            <p>{post.description}</p>
                                            <div className="post-meta">
                                                <span><strong>Contacto:</strong> {post.contact}</span>
                                                <span className={`status ${post.status}`}>
                                                    <strong>Estado:</strong> {post.status}
                                                </span>
                                                <span><strong>Publicado:</strong> {new Date(post.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className="post-actions">
                                            <button 
                                                onClick={() => handleEditClick(post)}
                                                className="edit-btn"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => handleDeletePost(post._id)}
                                                disabled={deleting}
                                                className="delete-btn"
                                            >
                                                {deleting ? "Eliminando..." : "Eliminar"}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyPosts;