import React from 'react';
import { Question, Option } from '../data/questions';
import { Button } from './ui/Button';
import { cn } from '@/utils/cn';
import { HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';

interface QuestionSlideProps {
  question: Question;
  selectedIds: string[];
  onSelect: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onShowInfo: (text: string) => void;
  isLast: boolean;
}

export function QuestionSlide({ question, selectedIds, onSelect, onNext, onPrev, onShowInfo, isLast }: QuestionSlideProps) {
  const canProceed = selectedIds.length > 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="p-6 pb-4 shrink-0 relative">
        <button 
          onClick={() => onShowInfo(question.whyWeAsk)}
          className="absolute top-6 right-6 text-zinc-400 hover:text-[#8b5cf6] transition-colors p-2 -m-2"
          aria-label="Dlaczego o to pytamy?"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-zinc-900 pr-8 leading-tight">{question.title}</h2>
        {question.subtitle && (
          <p className="text-zinc-500 mt-2 text-sm">{question.subtitle}</p>
        )}
      </div>

      {/* Options Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-24 custom-scrollbar">
        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const isSelected = selectedIds.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={cn(
                  "flex items-center p-4 rounded-xl border-2 text-left transition-all duration-200 w-full group",
                  isSelected 
                    ? "border-[#8b5cf6] bg-[#8b5cf6]/5 shadow-sm" 
                    : "border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 mr-4 transition-colors",
                  isSelected ? "bg-[#8b5cf6]/20" : "bg-zinc-100 group-hover:bg-zinc-200"
                )}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className={cn("font-medium", isSelected ? "text-[#8b5cf6]" : "text-zinc-800")}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className="text-xs text-zinc-500 mt-0.5 leading-snug">
                      {option.description}
                    </div>
                  )}
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                  question.type === 'multi' ? "rounded-md" : "rounded-full",
                  isSelected ? "border-[#8b5cf6] bg-[#8b5cf6]" : "border-zinc-300"
                )}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-zinc-100 flex items-center justify-between shrink-0">
        <Button variant="ghost" size="icon" onClick={onPrev} className="text-zinc-500 hover:text-zinc-900 rounded-full w-12 h-12">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!canProceed}
          className={cn(
            "h-12 px-8 rounded-full font-medium shadow-md transition-all",
            canProceed ? "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white" : "bg-zinc-100 text-zinc-400"
          )}
        >
          {isLast ? "Zobacz wyniki" : "Dalej"} <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
