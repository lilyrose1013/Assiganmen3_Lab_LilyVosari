import ImageCard from "../ImageCard/ImageCard";
import './Home.css';

function Home(props) {
  console.log("Home component is rendering with props:", props);
  
  return (
    <div style={{padding: '10px', margin: '10px'}}>
      <h1 style={{color: 'black', fontSize: '20px'}}>{props.name}!</h1>
      <div className="imagecard-container" style={{padding: '10px'}}>
        <ImageCard 
            name="Red Apple Bite"
            imageUrl="Apple_Bite.png"
        />
        <ImageCard 
            name="Golden Apple"
            imageUrl="Apple_Gold.png"
        />
        <ImageCard 
            name="Green Apple"
            imageUrl="green_apple.png"
        />
        <ImageCard 
            name="MineCraft Red apple"
            imageUrl="Red_Mine_Apple.png"
        />
        <ImageCard 
            name="Animal Crossing Apple"
            imageUrl="AnimalCrossing_Apple.png"
        />
        <ImageCard 
            name="Eaten Red Apple"
            imageUrl="apple.png"
        />
        <ImageCard 
            name="Tomatos On a Stem"
            imageUrl="Tomato_stem.jpg"
        />
        <ImageCard 
            name="Squished Tomato?????"
            imageUrl="tomato_squish.png"
        />
        <ImageCard 
            name="Tomato"
            imageUrl="Tomatos.png"
        />

      </div>
    </div>
  );
}

export default Home;