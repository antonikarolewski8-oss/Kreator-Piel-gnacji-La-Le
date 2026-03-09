import React, { useEffect } from 'react';
import { motion } from 'motion/react';

export function AnalyzingSlide({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
      <div className="relative w-24 h-24 mb-8">
        <motion.div
          className="absolute inset-0 border-4 border-zinc-100 rounded-full"
        />
        <motion.div
          className="absolute inset-0 border-4 border-[#8b5cf6] rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          ✨
        </div>
      </div>
      <h2 className="text-2xl font-bold text-zinc-900 mb-2">Analizujemy Twoje odpowiedzi...</h2>
      <p className="text-zinc-500">Dopasowujemy najlepsze produkty La-Le do Twoich unikalnych potrzeb.</p>
    </div>
  );
}
