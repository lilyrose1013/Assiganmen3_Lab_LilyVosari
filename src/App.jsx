import { useState } from "react";
import Home from "./Componets/Home/Home";

function App() {
  return (
    <div style={{padding: '20px'}}>
      <h1 style={{color: 'black', fontSize: '24px'}}>Apples+Tomatoes</h1>
      <p style={{color: 'black', fontSize: '18px'}}>Use the shuffle button below to randomize the images!</p>
      <div style={{marginTop: '20px', padding: '10px'}}>
        <Home name="Welcome to Apples+Tomatoes" />
      </div>
    </div>
  );
}

export default App;