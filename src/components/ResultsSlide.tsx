import React, { useRef } from 'react';
import { Product } from '../data/products';
import { Button } from './ui/Button';
import { Download, RotateCcw, Share2, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ResultsSlideProps {
  products: Product[];
  matchScore: number;
  onRestart: () => void;
}

export function ResultsSlide({ products, matchScore, onRestart }: ResultsSlideProps) {
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!resultsRef.current) return;
    
    // Create a temporary clone for PDF generation to avoid messing up the UI
    const element = resultsRef.current.cloneNode(true) as HTMLElement;
    element.style.width = '800px'; // Fixed width for PDF
    element.style.height = 'auto';
    element.style.padding = '40px';
    element.style.background = 'white';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    
    // Remove the footer buttons from the clone
    const buttons = element.querySelector('.action-buttons');
    if (buttons) buttons.remove();
    
    // Show the hidden PDF footer
    const pdfFooter = element.querySelector('.pdf-only') as HTMLElement;
    if (pdfFooter) {
      pdfFooter.style.display = 'block';
    }

    document.body.appendChild(element);

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Moja_Pielegnacja_LaLe.pdf');
    } catch (e) {
      console.error("PDF generation failed", e);
      alert("Nie udało się wygenerować PDF. Spróbuj ponownie.");
    } finally {
      document.body.removeChild(element);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Moje rekomendacje kosmetyków La-Le',
        text: 'Sprawdź jakie kosmetyki naturalne poleca mi La-Le!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link skopiowany do schowka!');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-50 relative">
      {/* Header */}
      <div className="bg-white p-6 border-b border-zinc-100 shrink-0 text-center relative z-10 shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-3">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 leading-tight">Twój Rytuał La-Le</h2>
        <p className="text-sm text-zinc-500 mt-1">
          Dopasowanie: <span className="font-bold text-[#8b5cf6]">{matchScore}%</span>
        </p>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-6 pb-40 custom-scrollbar" ref={resultsRef}>
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>⚠️ Pamiętaj:</strong> Poniższe rekomendacje to nasze sugestie oparte na algorytmie dopasowania. Traktuj je jako punkt wyjścia do własnych przemyśleń.
        </div>

        <div className="space-y-4">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row h-full">
                <div className="w-full sm:w-2/5 h-48 sm:h-auto min-h-[160px] bg-zinc-100 shrink-0 relative">
                  <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded-md text-zinc-800 shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-bold text-zinc-900 text-base leading-tight">{product.name}</h3>
                    <span className="font-bold text-[#8b5cf6] whitespace-nowrap bg-[#8b5cf6]/10 px-2 py-1 rounded-md text-sm">{product.price}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mb-3">{product.description}</p>
                  <div className="bg-[#8b5cf6]/5 border border-[#8b5cf6]/20 rounded-lg p-3 mb-4">
                    <p className="text-xs text-[#8b5cf6] font-medium leading-snug">
                      <span className="font-bold">Dlaczego?</span> {product.whyMatch}
                    </p>
                  </div>
                  <a 
                    href={product.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center w-full h-10 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    Przejdź do produktu
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Hidden footer for PDF only */}
        <div className="hidden pdf-only mt-8 text-center text-sm text-zinc-500 border-t pt-4">
          Wygenerowano przez La-Le. Powered by CROly.
        </div>
      </div>

      {/* Footer Actions */}
      <div className="action-buttons p-4 bg-white border-t border-zinc-100 shrink-0 flex flex-col gap-2 absolute bottom-0 left-0 right-0 z-20">
        <Button onClick={handleDownloadPDF} className="w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium">
          <Download className="w-4 h-4 mr-2" /> Pobierz wyniki jako PDF
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare} className="flex-1 h-12 rounded-xl border-zinc-200">
            <Share2 className="w-4 h-4 mr-2" /> Udostępnij
          </Button>
          <Button variant="ghost" onClick={onRestart} className="flex-1 h-12 rounded-xl text-zinc-500">
            <RotateCcw className="w-4 h-4 mr-2" /> Rozwiąż ponownie
          </Button>
        </div>
      </div>
    </div>
  );
}
