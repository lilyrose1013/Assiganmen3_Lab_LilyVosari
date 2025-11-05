import { useState } from 'react';
import ImageCard from "../ImageCard/ImageCard";
import './Home.css';

function Home(props) {
  console.log("Home component is rendering with props:", props);
  
  // Initial image data
  const initialImages = [
    { id: 1, name: "Red Apple", imageUrl: "Apple1.png" },
    { id: 2, name: "Golden Apple", imageUrl: "Eaten.png" },
    { id: 3, name: "Green Apple", imageUrl: "Half.png" },
    { id: 4, name: "MineCraft Red apple", imageUrl: "PlainApple_.png" },
    { id: 5, name: "Animal Crossing Apple", imageUrl: "Slice.png" },
    { id: 6, name: "Eaten Red Apple", imageUrl: "Strawberry_.png" },
    { id: 7, name: "Tomatos On a Stem", imageUrl: "Tomato1.png" },
    { id: 8, name: "Squished Tomato?????", imageUrl: "Tomato2.png" },
    { id: 9, name: "Fresh Apple", imageUrl: "Apple1.png" },
    { id: 10, name: "Apple Slices", imageUrl: "Slice.png" },
    { id: 11, name: "Bitten Apple", imageUrl: "Eaten.png" },
    { id: 12, name: "Apple Half", imageUrl: "Half.png" },
    { id: 13, name: "Cherry Tomato", imageUrl: "Tomato1.png" },
    { id: 14, name: "Ripe Tomato", imageUrl: "Tomato2.png" },
    { id: 15, name: "Strawberry Fruit", imageUrl: "Strawberry_.png" },
    { id: 16, name: "Plain Apple", imageUrl: "PlainApple_.png" }
  ];

  const [images, setImages] = useState(initialImages);

  // Shuffle function using Fisher-Yates algorithm
  const shuffleImages = () => {
    const shuffled = [...images];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setImages(shuffled);
  };
  
  return (
    <div style={{padding: '10px', margin: '10px'}}>
      <h1 style={{color: 'black', fontSize: '20px'}}>{props.name}!</h1>
      
      <button 
        onClick={shuffleImages}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '20px',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        🔀 Shuffle Images
      </button>

      <div className="imagecard-container" style={{padding: '10px'}}>
        {images.map((image) => (
          <ImageCard 
            key={image.id}
            name={image.name}
            imageUrl={image.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;