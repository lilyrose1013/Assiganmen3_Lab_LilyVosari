import { useState } from "react";
import Home from "./Componets/Home/Home";

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div style={{padding: '20px'}}>
      <h1 style={{color: 'black', fontSize: '24px'}}>Apples+Tomatoes</h1>
      <p style={{color: 'black', fontSize: '18px'}}>You clicked {count} times.</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{padding: '10px', fontSize: '16px', backgroundColor: 'blue', color: 'white'}}
      >
       
      </button>
      <div style={{marginTop: '20px', padding: '10px'}}>
        <Home name="Welcome to Apples+Tomatoes" />
      </div>
    </div>
  );
}

export default App;