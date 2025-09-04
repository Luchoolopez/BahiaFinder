import React from "react";
import '../styles/PostCard.css';

const PostCard = ({ title, description, authorName, contact, images, status }) => {
    // Determinar clase de estado para el color
    const statusClass = `post-status ${status ? 'status-' + status.toLowerCase() : ''}`;
    
    return (
        <div className="post-card">
            {/* Contenedor de imagen */}
            {images && images.length > 0 && (
                <div className="post-image-container">
                    <img 
                        src={images[0]} 
                        alt="Imagen principal del post" 
                        className="post-image" 
                    />
                </div>
            )}
            
            {/* Información del post */}
            <div className="post-info">
                <h2 className="post-title">{title}</h2>
                <p className="post-description">{description}</p>
                
                <div className="post-meta">
                    <div className="post-author">
                        <strong>Autor:</strong>
                        <span>{authorName}</span>
                    </div>
                    
                    <div className="post-contact">
                        <strong>Contacto:</strong>
                        <span>{contact}</span>
                    </div>
                    
                    <div className={statusClass}>
                        <strong>Estado:</strong>
                        <span>{status}</span>
                    </div>
                </div>
                
                {/* Galería de imágenes adicionales */}
                {images && images.length > 1 && (
                    <div className="post-gallery">
                        {images.slice(1).map((img, idx) => (
                            <img 
                                key={idx} 
                                src={img} 
                                alt={`Imagen ${idx + 2} del post`} 
                                className="post-gallery-img" 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;