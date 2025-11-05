import { useState, useEffect } from 'react';
import './ImagePopup.css';

function ImagePopup({ isOpen, onClose, imageName, imageUrl, description }) {
  const [imageError, setImageError] = useState(false);

  console.log("ImagePopup rendering - description:", description);
  console.log("ImagePopup rendering - imageName:", imageName);
  console.log("ImagePopup rendering - isOpen:", isOpen);

  // Close popup with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Prevent background scroll 
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        
        <div className="popup-image-container">
          {imageError ? (
            <div className="popup-error pixelify-sans">
              Image not found<br/>
              {imageUrl}
            </div>
          ) : (
            <img 
              src={imageUrl} 
              alt={imageName}
              className="popup-image"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          )}
        </div>
        
        <h2 className="popup-title pixelify-sans">{imageName}</h2>
        
        <div className="popup-description pixelify-sans">
          <p>{description || "No description available"}</p>
        </div>
        
        <div className="popup-info pixelify-sans">
          <p>Click anywhere outside or press ESC to close</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;