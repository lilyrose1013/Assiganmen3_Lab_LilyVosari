import { useState } from 'react';
import './ImageCard.css';

function ImageCard(props) {
  const [likes, setLikes] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  console.log("ImageCard component rendering with props:", props);

  return (
    <div className="image-card">
      <h1 className="pixelify-sans">{props.name || "Red Apple"}</h1>
      {imageError ? (
        <div className="pixelify-sans" style={{
          width: '400px', 
          height: '400px', 
          border: '2px dashed #ccc', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          color: '#666'
        }}>
          Image not found<br/>
          {props.imageUrl}
        </div>
      ) : (
        <img 
          src={props.imageUrl || "Apple1.png"} 
          alt={props.name || "Red Apple"} 
          style={{width: '400px', height: '400px', objectFit: 'cover'}}
          onError={(e) => {
            console.error("Image failed to load:", e.target.src);
            setImageError(true);
          }}
          onLoad={() => {
            console.log("Image loaded successfully:", props.imageUrl);
          }}
        />
      )}
    </div>
  );
}

export default ImageCard;

