import { useState, useEffect } from 'react';

export default function Classic() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await fetch('/api/spotify');
      const data = await response.json();
      setTracks(data.items);
      setCurrentTrack(data.items[0]);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const playFragment = () => {
    if (currentTrack) {
      const audio = new Audio(currentTrack.preview_url);
      audio.play();
      setIsPlaying(true);
      setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
      }, 3000); // Reproduce 3 segundos del fragmento
    }
  };

  const checkGuess = () => {
    if (guess.toLowerCase() === currentTrack.name.toLowerCase()) {
      setFeedback('Correcto!');
      setScore(score + 1);
      nextTrack();
    } else {
      setFeedback('Incorrecto, intenta nuevamente.');
    }
  };

  const nextTrack = () => {
    const nextIndex = tracks.indexOf(currentTrack) + 1;
    if (nextIndex < tracks.length) {
      setCurrentTrack(tracks[nextIndex]);
      setGuess('');
      setFeedback('');
    } else {
      setFeedback('¡Juego completado! Puntuación final: ' + score);
    }
  };

  return (
    <div className="classic-mode">
      <h2 className="text-2xl font-bold">Modo Clásico: Adivina la Canción</h2>
      {currentTrack && (
        <div className="song-quiz">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={playFragment}
            disabled={isPlaying}
          >
            {isPlaying ? 'Reproduciendo...' : 'Reproducir Fragmento'}
          </button>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="¿Cuál es el nombre de la canción?"
            className="mt-4 p-2 border border-gray-300 rounded"
          />
          <button
            className="bg-green-500 text-white py-2 px-4 rounded ml-2"
            onClick={checkGuess}
          >
            Adivinar
          </button>
          <p className="mt-2">{feedback}</p>
        </div>
      )}
    </div>
  );
}
