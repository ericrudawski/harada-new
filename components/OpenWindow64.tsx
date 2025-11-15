import React, { useState, useEffect } from 'react';
import { getAIFeedbackForOpenWindow } from '../services/geminiService';
import { OpenWindowGrid } from '../types';

interface OpenWindow64Props {
  initialGrid: OpenWindowGrid;
  onUpdate: (grid: OpenWindowGrid) => void;
}

const OpenWindow64: React.FC<OpenWindow64Props> = ({ initialGrid, onUpdate }) => {
  const [grid, setGrid] = useState<OpenWindowGrid>(initialGrid);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
        if (JSON.stringify(grid) !== JSON.stringify(initialGrid)) {
             onUpdate(grid);
        }
    }, 500);

    return () => {
        clearTimeout(handler);
    };
  }, [grid, onUpdate, initialGrid]);

  const handleGridChange = (r: number, c: number, value: string) => {
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = value;

    // Sync center block with outer block centers
    const isCenterBlock = r >= 3 && r <= 5 && c >= 3 && c <= 5;
    if (isCenterBlock && !(r === 4 && c === 4)) {
        const dr = r - 4; // -1, 0, 1
        const dc = c - 4; // -1, 0, 1
        const outerR = (dr + 1) * 3 + 1;
        const outerC = (dc + 1) * 3 + 1;
        newGrid[outerR][outerC] = value;
    }

    setGrid(newGrid);
  };
  
  const handleGenerateFeedback = async () => {
      setLoading(true);
      setFeedback('');
      const response = await getAIFeedbackForOpenWindow(grid);
      setFeedback(response);
      setLoading(false);
  };

  const getCellClass = (r: number, c: number) => {
    const isCenterBlock = r >= 3 && r <= 5 && c >= 3 && c <= 5;
    const isCenterOfCenter = r === 4 && c === 4;
    const isCenterOfOuter = r % 3 === 1 && c % 3 === 1;

    let bgColor = 'bg-white';
    if (isCenterOfCenter) {
      bgColor = 'bg-rose-400 font-bold';
    } else if (isCenterBlock || isCenterOfOuter) {
      bgColor = 'bg-yellow-300';
    } else {
       const majorGridR = Math.floor(r / 3);
       const majorGridC = Math.floor(c / 3);
        if ((majorGridR + majorGridC) % 2 === 0) {
            bgColor = 'bg-sky-200';
        } else {
            bgColor = 'bg-teal-200';
        }
    }
    
    return `aspect-square p-1 text-xs border-2 border-black ${bgColor} focus-within:ring-4 focus-within:ring-rose-500 focus-within:z-10`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase text-black mb-2">Open Window 64 Plan</h2>
      <p className="text-black mb-6 font-semibold">Break down your main goal. Fill the center, then the 8 surrounding themes. These themes auto-populate the outer blocks. Finally, add 64 specific actions.</p>
      
      <div className="grid grid-cols-9 border-4 border-black">
        {grid.map((row, r) =>
          row.map((cell, c) => {
            const isCenterOfOuter = r % 3 === 1 && c % 3 === 1 && !(r === 4 && c === 4);
            
            return (
              <div key={`${r}-${c}`} className={getCellClass(r, c)}>
                <textarea
                  value={cell}
                  onChange={(e) => handleGridChange(r, c, e.target.value)}
                  readOnly={isCenterOfOuter}
                  className="w-full h-full resize-none bg-transparent focus:outline-none text-black placeholder:text-gray-500 text-sm font-semibold"
                />
              </div>
            );
          })
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleGenerateFeedback}
          disabled={loading}
          className="px-6 py-3 bg-teal-500 text-white border-4 border-black font-bold uppercase transition-all hover:bg-teal-600 hover:shadow-[8px_8px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 disabled:bg-gray-400 disabled:text-black disabled:shadow-none"
        >
          {loading ? 'Generating...' : 'Get AI Feedback'}
        </button>
      </div>

      {feedback && (
        <div className="mt-8 p-6 bg-gray-100 border-4 border-black">
          <h3 className="text-xl font-bold uppercase text-black mb-4">AI-Powered Feedback</h3>
          <div className="prose prose-sm max-w-none prose-p:font-semibold prose-headings:font-bold prose-strong:font-bold" dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br />') }} />
        </div>
      )}
    </div>
  );
};

export default OpenWindow64;