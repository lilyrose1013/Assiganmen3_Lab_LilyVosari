import { useState } from 'react';
import ImageCard from "../ImageCard/ImageCard";
import ImagePopup from "../ImagePopup/ImagePopup";
import './Home.css';

function Home(props) {
  console.log("Home component is rendering with props:", props);
  
  // image data
  const initialImages = [
    { id: 1, name: "Red Apple", imageUrl: "Apple1.png", description: "A red shinny Apple: Apples are members of the rose family" },
    { id: 2, name: "No Apple", imageUrl: "Eaten.png", description: "This apple was eaten: There are over 7,500 different kinds of apples grown in the world" },
    { id: 3, name: "Half a Apple", imageUrl: "Half.png", description: "A apple cut in half:It takes about 36 apples to produce one gallon of apple cider " },
    { id: 4, name: "Plain Apple", imageUrl: "PlainApple_.png", description: "Why is this apple so plain?: Apple trees can live for up to 100 years." },
    { id: 5, name: "Slices", imageUrl: "Slice.png", description: "Sliced apple: Apple trees take 4-5 years to produce their first fruit " },
    { id: 6, name: "A Strawberry?", imageUrl: "Strawberry_.png", description: "Why is there a strawberry on a apple website? :: Strawberries are members of the rose family." },
    { id: 7, name: "Tomato???!!! ", imageUrl: "Tomato1.png", description: "Why is there a tomato on a apple website? :: Tomatoes are also fruits." },
    { id: 8, name: "A Dark Red Tomato?", imageUrl: "Tomato2.png", description: "Tomato :( :There are over 10,000 varieties of tomatoes" }
  ];

  const [images, setImages] = useState(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [isMatchingMode, setIsMatchingMode] = useState(false);
  const [matchingCards, setMatchingCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  
  // Popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Popup functions
  const handleImageClick = (imageData) => {
    console.log("Home handleImageClick - received data:", imageData);
    setSelectedImage(imageData);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedImage(null);
  };

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
    <div style={{padding: isMatchingMode ? '5px' : '10px', margin: isMatchingMode ? '5px' : '10px'}}>
      <h1 className="pixelify-sans" style={{
        color: 'black',
        fontSize: isMatchingMode ? '20px' : '25pt',
        margin: isMatchingMode ? '10px 0' : '20px 0'
      }}>
        {props.name}!
      </h1>
      
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
              backgroundColor: '#ff0090ff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '20px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#ff006aff')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#ff0088ff')}
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
              backgroundColor: '#ff0062ff',
              color: 'white',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '20px'
            }}>
              Congratulations! You found all matches!
            </div>
          )}
        </>
      )}

      <div className={isMatchingMode ? "matching-mode-container" : "imagecard-container"} style={{padding: isMatchingMode ? '5px' : '10px'}}>
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
            backgroundColor: 'rgba(255, 163, 209, 0.9)',
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
                <h1 className="pixelify-sans" style={{ 
                  visibility: isFlipped ? 'visible' : 'hidden',
                  fontSize: '14px',
                  margin: '5px 0'
                }}>
                  {card.name}
                </h1>
                <div style={{
                  width: isMatchingMode ? '180px' : '250px',
                  height: isMatchingMode ? '180px' : '250px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: isMatched ? '3px solid #28a745' : '2px solid #ddd',
                  backgroundColor: isFlipped ? 'transparent' : '#ff9ec7ff',
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
                      fontSize: '20px', 
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
              description={image.description}
              onImageClick={handleImageClick}
            />
          ))
        )}
      </div>
      
      {/* Image Popup */}
      <ImagePopup 
        isOpen={popupOpen}
        onClose={handleClosePopup}
        imageName={selectedImage?.name}
        imageUrl={selectedImage?.imageUrl}
        description={selectedImage?.description}
      />
    </div>
  );
}

export default Home;