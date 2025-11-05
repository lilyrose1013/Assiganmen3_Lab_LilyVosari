import { useState } from 'react';
import ImageCard from "../ImageCard/ImageCard";
import './Home.css';

function Home(props) {
  console.log("Home component is rendering with props:", props);
  
  // image data
  const initialImages = [
    { id: 1, name: "Red Apple", imageUrl: "Apple1.png" },
    { id: 2, name: "No Apple", imageUrl: "Eaten.png" },
    { id: 3, name: "Half a Apple", imageUrl: "Half.png" },
    { id: 4, name: "Plain Apple", imageUrl: "PlainApple_.png" },
    { id: 5, name: "Slices", imageUrl: "Slice.png" },
    { id: 6, name: "A Strawberry?", imageUrl: "Strawberry_.png" },
    { id: 7, name: "Tomato???!!! ", imageUrl: "Tomato1.png" },
    { id: 8, name: "A Dark Red Tomato?", imageUrl: "Tomato2.png" },
    { id: 9, name: "Fresh Apple", imageUrl: "Apple1.png" },
    { id: 10, name: "Apple Slices", imageUrl: "Slice.png" },
    { id: 11, name: "Bitten Apple", imageUrl: "Eaten.png" },
    { id: 12, name: "Apple Half", imageUrl: "Half.png" },
    { id: 13, name: "Cherry Tomato", imageUrl: "Tomato1.png" },
    { id: 14, name: "Tomato", imageUrl: "Tomato2.png" },
    { id: 15, name: "Strawberry ", imageUrl: "Strawberry_.png" },
    { id: 16, name: "Plain Apple", imageUrl: "PlainApple_.png" }
  ];

  const [images, setImages] = useState(initialImages);
  const [isLoading, setIsLoading] = useState(false);

  // Shuffle function 
  const shuffleImages = async () => {
    setIsLoading(true);
    
    //  4 seconds
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const shuffled = [...images];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setImages(shuffled);
    setIsLoading(false);
  };
  
  return (
    <div style={{padding: '10px', margin: '10px'}}>
      <h1 className="pixelify-sans" style={{color: 'black'}}>{props.name}!</h1>
      
      <button 
        className="pixelify-sans"
        onClick={shuffleImages}
        disabled={isLoading}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: isLoading ? '#cccccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          marginBottom: '20px',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = '#ff0077ff')}
        onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = '#00ff08ff')}
      >
        {isLoading ? 'Shuffling...' : 'Shuffle'}
      </button>

      <div className="imagecard-container" style={{padding: '10px'}}>
        {isLoading ? (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(249, 178, 178, 0.9)',
            zIndex: 1000
          }}>
            <img 
              src="Load.png" 
              alt="Loading..." 
              style={{
                width: '500px',
                height: '500px',
                objectFit: 'contain'
              }}
            />
          </div>
        ) : (
          images.map((image) => (
            <ImageCard 
              key={image.id}
              name={image.name}
              imageUrl={image.imageUrl}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;