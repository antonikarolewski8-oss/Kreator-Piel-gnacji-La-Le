import React, { useState, useMemo, useEffect } from 'react';
import { SlideContainer } from './components/SlideContainer';
import { WelcomeSlide } from './components/WelcomeSlide';
import { QuestionSlide } from './components/QuestionSlide';
import { AnalyzingSlide } from './components/AnalyzingSlide';
import { ResultsSlide } from './components/ResultsSlide';
import { questions } from './data/questions';
import { products } from './data/products';
import { Code, X } from 'lucide-react';
import { Button } from './components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';

type Answers = Record<string, string[]>;

export default function App() {
  const [step, setStep] = useState(-1); // -1: Welcome, 0-5: Questions, 6: Analyzing, 7: Results
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoText, setInfoText] = useState("");
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('embed') === 'true') {
      setIsEmbedded(true);
    }
  }, []);

  const handleNext = () => {
    setDirection(1);
    setStep(s => s + 1);
  };

  const handlePrev = () => {
    setDirection(-1);
    setStep(s => s - 1);
  };

  const handleSelect = (questionId: string, optionId: string, type: 'single' | 'multi') => {
    setAnswers(prev => {
      const current = prev[questionId] || [];
      if (type === 'single') {
        return { ...prev, [questionId]: [optionId] };
      } else {
        if (current.includes(optionId)) {
          return { ...prev, [questionId]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [questionId]: [...current, optionId] };
        }
      }
    });

    // Auto-advance for single choice
    if (type === 'single') {
      setTimeout(() => {
        handleNext();
      }, 400);
    }
  };

  const handleShowInfo = (text: string) => {
    setInfoText(text);
    setShowInfoModal(true);
  };

  const calculateResults = () => {
    // Flatten all selected tags
    const selectedTags = Object.values(answers).flat();
    
    // Score products
    const scoredProducts = products.map(product => {
      let score = 0;
      product.tags.forEach(tag => {
        if (selectedTags.includes(tag)) {
          score += 1;
        }
      });
      return { ...product, score };
    });

    // Sort by score descending
    scoredProducts.sort((a, b) => b.score - a.score);

    // Return top 4
    return scoredProducts.slice(0, 4);
  };

  const recommendedProducts = useMemo(() => calculateResults(), [answers, step]);
  
  // Calculate a fake but realistic match score based on how many tags matched
  const matchScore = useMemo(() => {
    if (recommendedProducts.length === 0) return 0;
    const topScore = recommendedProducts[0].score;
    // Base 70% + up to 29% based on score
    return Math.min(99, 70 + (topScore * 5));
  }, [recommendedProducts]);

  const handleRestart = () => {
    setAnswers({});
    setDirection(-1);
    setStep(-1);
  };

  const appUrl = process.env.APP_URL || window.location.origin;
  const embedCode = `<div style="max-width: 600px; margin: 0 auto;">
  <iframe 
    src="${appUrl}?embed=true" 
    width="100%" 
    style="aspect-ratio: 1/1; border: 1px solid #e5e7eb; border-radius: 16px; display: block; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);"
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
    loading="lazy">
  </iframe>
  <div style="text-align: center; margin-top: 12px; font-size: 14px;">
    <a href="https://wearecroly.com" target="_blank" rel="noopener" style="color: #6b7280; text-decoration: none; font-family: sans-serif;">Powered by CROly</a>
  </div>
</div>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    alert('Kod skopiowany do schowka!');
    setShowEmbedModal(false);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col items-center justify-center p-4 font-sans text-zinc-900">
      
      {/* Main App Container */}
      <SlideContainer step={step} direction={direction}>
        {step === -1 && (
          <WelcomeSlide 
            onNext={handleNext} 
            onShowInfo={() => handleShowInfo("Narzędzie to pomaga dobrać idealne kosmetyki naturalne na podstawie Twoich indywidualnych potrzeb. Odpowiadasz na kilka pytań, a nasz algorytm dopasowuje produkty z oferty La-Le, które najlepiej spełnią Twoje oczekiwania.")} 
          />
        )}
        
        {step >= 0 && step < questions.length && (
          <QuestionSlide
            question={questions[step]}
            selectedIds={answers[questions[step].id] || []}
            onSelect={(id) => handleSelect(questions[step].id, id, questions[step].type)}
            onNext={handleNext}
            onPrev={handlePrev}
            onShowInfo={handleShowInfo}
            isLast={step === questions.length - 1}
          />
        )}

        {step === questions.length && (
          <AnalyzingSlide onComplete={handleNext} />
        )}

        {step === questions.length + 1 && (
          <ResultsSlide 
            products={recommendedProducts} 
            matchScore={matchScore}
            onRestart={handleRestart}
          />
        )}

        {/* Progress Bar (only visible during questions) */}
        {step >= 0 && step < questions.length && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-100 z-20">
            <motion.div 
              className="h-full bg-[#8b5cf6]"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </SlideContainer>

      {/* Footer (outside embed frame) */}
      {!isEmbedded && (
        <div className="mt-8 text-center">
          <a href="https://wearecroly.com" target="_blank" rel="noopener" className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors">
            Powered by CROly
          </a>
        </div>
      )}

      {/* Embed Button */}
      {!isEmbedded && (
        <button 
          onClick={() => setShowEmbedModal(true)}
          className="fixed bottom-6 right-6 bg-zinc-900 text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform z-50 flex items-center gap-2"
        >
          <Code className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">Osadź</span>
        </button>
      )}

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowInfoModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold mb-3 pr-8">Jak to działa?</h3>
              <p className="text-zinc-600 leading-relaxed text-sm">
                {infoText}
              </p>
              <Button onClick={() => setShowInfoModal(false)} className="w-full mt-6 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">
                Rozumiem
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Embed Modal */}
      <AnimatePresence>
        {showEmbedModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              <button 
                onClick={() => setShowEmbedModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold mb-2">Osadź na swojej stronie</h3>
              <p className="text-zinc-500 mb-6 text-sm">Skopiuj poniższy kod, aby umieścić ten widget na swoim blogu lub w sklepie.</p>
              
              <div className="bg-zinc-900 rounded-xl p-4 mb-6 overflow-x-auto">
                <pre className="text-zinc-300 text-xs font-mono whitespace-pre-wrap break-all">
                  {embedCode}
                </pre>
              </div>

              <div className="flex gap-3 mt-auto">
                <Button onClick={copyEmbedCode} className="flex-1 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">
                  Kopiuj Kod
                </Button>
                <Button variant="outline" onClick={() => setShowEmbedModal(false)} className="flex-1">
                  Zamknij
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
