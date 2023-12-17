import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import paul from './assets/paul.png';
import glasses from './assets/glasses.png';
import './App.css';

function App() {
  const [joke, setJoke] = useState('');
  const [jokeFetched, setJokeFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [falling, setFalling] = useState(false);

  const handleGetJoke = async () => {
    try {
      setLoading(true);
      const res = await Axios.get('https://icanhazdadjoke.com/', {
        headers: {
          'Accept': 'application/json',
        },
      });
      setJoke(res.data.joke);
      setFalling(true);
      setJokeFetched(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const resetFalling = () => {
      setFalling(false);
    };

    const fallingContainer = document.querySelector('.falling-container');

    fallingContainer.addEventListener('animationend', resetFalling);

    return () => {
      fallingContainer.removeEventListener('animationend', resetFalling);
    };
  }, []);

  return (
    <main className='app-container'>
      <h1>Paul's Dad Joke Simulator</h1>
      <button onClick={handleGetJoke}>TELL JOKE</button>
      <p>{loading ? 'LOADING!' : `${joke}`}</p>
      <div className={`falling-container ${falling ? 'falling-animation' : ''}`}>
        {jokeFetched && <img className='glasses' src={glasses} alt="A pair of meme glasses" />}
      </div>
        <img className='paul' src={paul} alt="A photo of Paul" />
    </main>
  );
}

export default App;