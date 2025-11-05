import ImageCard from "../ImageCard/ImageCard";
import './Home.css';

function Home(props) {
  console.log("Home component is rendering with props:", props);
  
  return (
    <div style={{padding: '10px', margin: '10px'}}>
      <h1 style={{color: 'black', fontSize: '20px'}}>{props.name}!</h1>
      <div className="imagecard-container" style={{padding: '10px'}}>
        <ImageCard 
            name="Red Apple"
            imageUrl="Apple1.png"
        />
        <ImageCard 
            name="Golden Apple"
            imageUrl="Eaten.png"
        />
        <ImageCard 
            name="Green Apple"
            imageUrl="Half.png"
        />
        <ImageCard 
            name="MineCraft Red apple"
            imageUrl="PlainApple_.png"
        />
        <ImageCard 
            name="Animal Crossing Apple"
            imageUrl="Slice.png"
        />
        <ImageCard 
            name="Eaten Red Apple"
            imageUrl="Strawberry_.png"
        />
        <ImageCard 
            name="Tomatos On a Stem"
            imageUrl="Tomato1.png"
        />
        <ImageCard 
            name="Squished Tomato?????"
            imageUrl="Tomato2.png"
        />

      </div>
    </div>
  );
}

export default Home;