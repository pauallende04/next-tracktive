import Link from 'next/link';

export default function GameModeSelector() {
  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <Link href="/classic">
        <p className="bg-blue-500 text-white py-2 px-4 rounded">Adivina la Canción</p>
      </Link>
      <Link href="/artist">
        <p className="bg-green-500 text-white py-2 px-4 rounded">Adivina el Artista</p>
      </Link>
      <Link href="/personalized">
        <p className="bg-purple-500 text-white py-2 px-4 rounded">Mi Música</p>
      </Link>
    </div>
  );
}
