import GameModeSelector from '../components/GameModeSelector';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center">Tracktive</h1>
      <GameModeSelector />
    </div>
  );
}
