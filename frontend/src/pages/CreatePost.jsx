import React, { useState } from "react";
import useCreatePost from "../hooks/useCreatePost";
import '../styles/CreatePost.css';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [contact, setContact] = useState("");
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [status, setStatus] = useState("perdido");
    const { createPost, loading, error } = useCreatePost();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Crear previews de las imágenes
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...previews]);
        
        // Aquí normalmente subirías las imágenes a un servicio
        // Por ahora las guardamos como objetos para posible procesamiento futuro
        setImages(prev => [...prev, ...files]);
    };

    const removeImage = (index) => {
        const newPreviews = [...imagePreviews];
        const newImages = [...images];
        
        newPreviews.splice(index, 1);
        newImages.splice(index, 1);
        
        setImagePreviews(newPreviews);
        setImages(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // En una implementación real, aquí subirías las imágenes primero
        // a un servicio como Cloudinary, ImgBB o Firebase Storage
        // y luego obtendrías las URLs para enviar al backend
        
        // Por ahora, vamos a simular que las imágenes ya están subidas
        // y tenemos sus URLs (en un caso real, esto se haría diferente)
        const imageUrls = images.map(img => {
            // Esto es solo para demostración - en producción necesitarías subirlas
            return img.name ? `https://ejemplo.com/imagenes/${img.name}` : img;
        });
        
        const success = await createPost(title, description, authorName, contact, imageUrls, status);
        if (success) {
            alert("Post creado exitosamente");
            setTitle("");
            setDescription("");
            setAuthorName("");
            setContact("");
            setImages([]);
            setImagePreviews([]);
            setStatus("perdido");
            navigate("/")
        } else {
            alert("Error al crear el post");
        }
    };

    return (
        <>
        <Header/>
        <div className="create-post-container">
        <div className="go-back-btn">
            <button onClick={(e) => navigate("/")}>Volver</button>
        </div>
            <div className="create-post-header">
                <h2>Crea tu Post</h2>
                <div className="post-description">
                    <p>¿Perdiste o te robaron algo? Crea tu post y entre todos los bahienses vamos a intentar darte una mano</p>
                </div>
            </div>
            
            <div className="create-post-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Título *</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ej: Se perdió perro en Bahía Blanca"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="description">Descripción *</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe lo que pasó, detalles importantes, lugar aproximado, etc."
                            required
                            rows="4"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="authorName">Tu nombre *</label>
                        <input
                            id="authorName"
                            type="text"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            placeholder="Nombre y apellido"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="contact">Contacto *</label>
                        <input
                            id="contact"
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Email o teléfono"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="status">Estado *</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="perdido">Perdido</option>
                            <option value="encontrado">Encontrado</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="images">Imágenes (opcional)</label>
                        <div className="image-upload-container">
                            <label htmlFor="file-upload" className="image-upload-btn">
                                <span>+ Seleccionar imágenes</span>
                                <input
                                    id="file-upload"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                            
                            {imagePreviews.length > 0 && (
                                <div className="image-previews">
                                    {imagePreviews.map((preview, index) => (
                                        <div key={index} className="image-preview">
                                            <img src={preview} alt={`Preview ${index}`} />
                                            <button 
                                                type="button" 
                                                onClick={() => removeImage(index)}
                                                className="remove-image-btn"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? "Publicando..." : "Publicar Post"}
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default CreatePost;