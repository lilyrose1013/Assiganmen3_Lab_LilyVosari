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
    { id: 8, name: "A Dark Red Tomato?", imageUrl: "Tomato2.png" }
  ];

  const [images, setImages] = useState(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [isMatchingMode, setIsMatchingMode] = useState(false);
  const [matchingCards, setMatchingCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);

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

  // Matching game functions
  const startMatchingGame = () => {
    // Create pairs by duplicating each image with new IDs
    const pairs = [];
    initialImages.forEach((img, index) => {
      pairs.push({ ...img, id: `${img.id}_1`, pairId: img.id });
      pairs.push({ ...img, id: `${img.id}_2`, pairId: img.id });
    });
    
    // Shuffle the pairs
    const shuffledPairs = [...pairs];
    for (let i = shuffledPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPairs[i], shuffledPairs[j]] = [shuffledPairs[j], shuffledPairs[i]];
    }
    
    setMatchingCards(shuffledPairs);
    setIsMatchingMode(true);
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
  };

  const exitMatchingGame = () => {
    setIsMatchingMode(false);
    setMatchingCards([]);
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
  };

  const flipCard = (cardId) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (matchedPairs.some(pair => pair.includes(cardId))) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const card1 = matchingCards.find(card => card.id === newFlippedCards[0]);
      const card2 = matchingCards.find(card => card.id === newFlippedCards[1]);

      if (card1.pairId === card2.pairId) {
        // Match found
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, newFlippedCards]);
          setFlippedCards([]);
          setScore(prev => prev + 1);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1500);
      }
    }
  };
  
  return (
    <div style={{padding: '10px', margin: '10px'}}>
      <h1 className="pixelify-sans" style={{color: 'black'}}>{props.name}!</h1>
      
      {!isMatchingMode ? (
        <>
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
              marginRight: '10px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = '#ff0077ff')}
            onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = '#00ff08ff')}
          >
            {isLoading ? 'Shuffling...' : 'Shuffle'}
          </button>

          <button 
            className="pixelify-sans"
            onClick={startMatchingGame}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#FF6B35',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '20px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#E55A2B')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#FF6B35')}
          >
            Start Matching Game
          </button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <span className="pixelify-sans" style={{ fontSize: '18px', marginRight: '20px' }}>
              Score: {score}/8
            </span>
            <button 
              className="pixelify-sans"
              onClick={exitMatchingGame}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: 'bold',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Exit Game
            </button>
          </div>
          
          {score === 8 && (
            <div className="pixelify-sans" style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '20px'
            }}>
              🎉 Congratulations! You found all matches! 🎉
            </div>
          )}
        </>
      )}

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
        ) : isMatchingMode ? (
          matchingCards.map((card) => {
            const isFlipped = flippedCards.includes(card.id) || matchedPairs.some(pair => pair.includes(card.id));
            const isMatched = matchedPairs.some(pair => pair.includes(card.id));
            
            return (
              <div 
                key={card.id}
                className="image-card"
                onClick={() => flipCard(card.id)}
                style={{
                  cursor: 'pointer',
                  opacity: isMatched ? 0.7 : 1,
                  transform: isMatched ? 'scale(0.95)' : 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
              >
                <h1 className="pixelify-sans" style={{ visibility: isFlipped ? 'visible' : 'hidden' }}>
                  {card.name}
                </h1>
                <div style={{
                  width: '250px',
                  height: '250px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: isMatched ? '3px solid #28a745' : '2px solid #ddd',
                  backgroundColor: isFlipped ? 'transparent' : '#6c757d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {isFlipped ? (
                    <img 
                      src={card.imageUrl} 
                      alt={card.name} 
                      style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                  ) : (
                    <div className="pixelify-sans" style={{ 
                      color: 'white', 
                      fontSize: '24px', 
                      fontWeight: 'bold' 
                    }}>
                      ?
                    </div>
                  )}
                </div>
              </div>
            );
          })
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