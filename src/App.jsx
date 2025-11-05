import { useState } from "react";
import Home from "./Componets/Home/Home";
import './App.css';

function App() {
  return (
    <div style={{padding: '20px'}}>
      <h1 className="pixelify-sans" style={{color: 'black'}}>Apples+Tomatoes</h1>
      <p className="pixelify-sans" style={{color: 'black'}}>Use the shuffle button below to randomize the images!</p>
      <div style={{marginTop: '20px', padding: '10px'}}>
        <Home name="Welcome to Apples+Tomatoes" />
      </div>
    </div>
  );
}

export default App;