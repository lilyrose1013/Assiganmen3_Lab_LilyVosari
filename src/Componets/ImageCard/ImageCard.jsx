import { useState } from 'react';
import './ImageCard.css';

function ImageCard(props) {
  const [likes, setLikes] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  console.log("ImageCard component rendering with props:", props);

  const handleImageClick = () => {
    console.log("ImageCard click - description prop:", props.description);
    if (props.onImageClick) {
      const imageData = {
        name: props.name || "Red Apple",
        imageUrl: props.imageUrl || "Apple1.png",
        description: props.description || "A red shinny Apple: Apples are members of the rose family"
      };
      console.log("ImageCard click - sending data:", imageData);
      props.onImageClick(imageData);
    }
  };

  return (
    <div className="image-card">
      <h1 className="pixelify-sans">{props.name || "Red Apple"}</h1>
      {imageError ? (
        <div className="pixelify-sans" style={{
          width: '250px', 
          height: '250px', 
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
          style={{
            width: '250px', 
            height: '250px', 
            objectFit: 'cover',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onClick={handleImageClick}
          onError={(e) => {
            console.error("Image failed to load:", e.target.src);
            setImageError(true);
          }}
          onLoad={() => {
            console.log("Image loaded successfully:", props.imageUrl);
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
      )}
    </div>
  );
}

export default ImageCard;

