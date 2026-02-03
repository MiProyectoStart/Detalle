'use client'
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Trophy, Timer, Footprints, X } from 'lucide-react';

export default function PuzzleBoard({ imageUrl }: { imageUrl: string }) {
  const size = 4;
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const initGame = useCallback(() => {
    const initialTiles = Array.from({ length: size * size }, (_, i) => i);
    // for (let i = initialTiles.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [initialTiles[i], initialTiles[j]] = [initialTiles[j], initialTiles[i]];
    // }
    setTiles(initialTiles);
    setMoves(0);
    setTime(0);
    setIsSolved(false);
    setShowModal(false);
  }, [size]);

  useEffect(() => { initGame(); }, [initGame]);

  useEffect(() => {
    if (isSolved || moves === 0) return;
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isSolved, moves]);

  const handleTileClick = (index: number) => {
    if (isSolved) return;
    const emptyIndex = tiles.indexOf(size * size - 1);
    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setMoves(m => m + 1);

      if (newTiles.every((tile, i) => tile === i)) {
        setIsSolved(true);
        // Retraso pequeño para que el usuario vea la imagen completarse antes del modal
        setTimeout(() => setShowModal(true), 800);
      }
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center gap-8 py-10 relative">
      
      {/* HEADER Y STATS (Igual que antes) */}
      <header className="text-center space-y-4">
        <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">Nuestra Foto en Fragmentos</h2>
        <div className="flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < 3 ? 'bg-accent' : 'bg-white/10'}`} />
            ))}
        </div>
      </header>

      <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-6 rounded-[2.5rem] w-full max-w-md backdrop-blur-sm">
        <div className="flex-1 text-center border-r border-white/10">
          <p className="text-[8px] uppercase tracking-widest text-gray-500 mb-1 font-black">Movimientos</p>
          <span className="text-3xl font-light">{moves}</span>
        </div>
        <div className="flex-1 text-center">
          <p className="text-[8px] uppercase tracking-widest text-gray-500 mb-1 font-black">Tiempo</p>
          <span className="text-3xl font-light">{moves === 0 ? "0:00" : formatTime(time)}</span>
        </div>
        <button onClick={initGame} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all active:scale-95">
          <RefreshCcw size={20} className="text-accent" />
        </button>
      </div>

      {/* TABLERO DE JUEGO */}
      <motion.div 
        animate={isSolved ? { scale: 1.02, boxShadow: "0 0 50px rgba(var(--accent-color-rgb), 0.3)" } : {}}
        className="grid grid-cols-4 gap-2 bg-[#0a0a0a] p-3 rounded-[2rem] border border-white/5 shadow-2xl relative"
      >
        {tiles.map((tile, index) => {
          const isBlank = tile === size * size - 1;
          
          return (
            <motion.div
              layout
              key={tile}
              onClick={() => handleTileClick(index)}
              className={`relative w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden cursor-pointer ${
                isBlank && !isSolved ? 'opacity-0' : 'opacity-100 bg-gray-900'
              } transition-opacity duration-500`}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: '400% 400%',
                backgroundPosition: `${(tile % size) * 33.33}% ${Math.floor(tile / size) * 33.33}%`
              }}
            >
              {/* Números guía: desaparecen al resolver */}
              {!isSolved && !isBlank && (
                <div className="absolute top-1.5 left-1.5 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[8px] font-bold text-white/50">
                  {tile + 1}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* MODAL DE VICTORIA */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-[#0f0f0f] border border-white/10 p-10 md:p-16 rounded-[3rem] max-w-lg w-full text-center relative shadow-[0_0_100px_rgba(var(--accent-color-rgb),0.2)]"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent animate-bounce">
                  <Trophy size={40} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter">¡Lo lograste!</h3>
                  <p className="text-gray-500 text-sm font-medium">Has reconstruido nuestro momento a la perfección.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full mt-4">
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                    <Footprints size={18} className="text-accent mx-auto mb-2 opacity-50" />
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Pasos</p>
                    <span className="text-2xl font-light">{moves}</span>
                  </div>
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                    <Timer size={18} className="text-accent mx-auto mb-2 opacity-50" />
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Tiempo</p>
                    <span className="text-2xl font-light">{formatTime(time)}</span>
                  </div>
                </div>

                <button 
                  onClick={initGame}
                  className="w-full mt-6 py-5 bg-accent rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] transition-all shadow-xl shadow-accent/20"
                >
                  Jugar de nuevo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <p className="text-[9px] uppercase tracking-widest text-gray-600 font-medium">
        {isSolved ? "¡Imagen completada!" : "Desliza las piezas para reconstruir el momento"}
      </p>
    </div>
  );
}