import React from 'react';
import { Button } from './ui/Button';
import { Info } from 'lucide-react';

export function WelcomeSlide({ onNext, onShowInfo }: { onNext: () => void, onShowInfo: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-zinc-50 to-zinc-100">
      <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mb-6 shadow-lg">
        <span className="text-white font-bold text-2xl tracking-widest">La-Le</span>
      </div>
      <h1 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">
        Jakie Kosmetyki Naturalne dla Ciebie?
      </h1>
      <p className="text-zinc-600 mb-8 max-w-md text-lg leading-relaxed">
        Odkryj idealne produkty La-Le dopasowane do Twojej skóry, stylu życia i potrzeb. Szybki test, spersonalizowane wyniki.
      </p>
      
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button size="lg" onClick={onNext} className="w-full text-base h-14 rounded-xl shadow-md bg-[#8b5cf6] hover:bg-[#7c3aed] text-white border-0">
          Rozpocznij Test
        </Button>
        <Button variant="ghost" onClick={onShowInfo} className="w-full text-zinc-500 hover:text-zinc-800">
          <Info className="w-4 h-4 mr-2" /> Jak to działa?
        </Button>
      </div>
    </div>
  );
}
