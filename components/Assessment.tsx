import React, { useState } from 'react';
import { QUESTIONS, RESPONSES, CAPABILITY_MAP, CATEGORY_MAP } from '../constants';
import { AssessmentScores } from '../types';

interface AssessmentProps {
  onSubmit: (scores: AssessmentScores) => void;
  initialScores: number[];
}

const Assessment: React.FC<AssessmentProps> = ({ onSubmit, initialScores }) => {
  const [scores, setScores] = useState<number[]>(initialScores);

  const handleScoreChange = (questionIndex: number, value: number) => {
    const newScores = [...scores];
    newScores[questionIndex] = value;
    setScores(newScores);
  };

  const calculateResults = () => {
    const capabilityScores: Record<string, number> = {};
    for (const capability in CAPABILITY_MAP) {
      const questionIndices = CAPABILITY_MAP[capability].map(q => q - 1);
      const total = questionIndices.reduce((sum, index) => sum + scores[index], 0);
      capabilityScores[capability] = total;
    }

    const categoryScores: Record<string, number> = {};
    for (const category in CATEGORY_MAP) {
      const capabilities = CATEGORY_MAP[category];
      const total = capabilities.reduce((sum, cap) => sum + capabilityScores[cap], 0);
      categoryScores[category] = total;
    }
    
    onSubmit({
      scores,
      capabilities: capabilityScores,
      categories: categoryScores,
    });
  };

  const allAnswered = scores.every(score => score > 0);

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase text-black mb-2">Harada 36 Questions</h2>
      <p className="text-black mb-6 font-semibold">Rate yourself from 1 (Strongly disagree) to 5 (Strongly agree).</p>
      <div className="space-y-6">
        {QUESTIONS.map((question, index) => (
          <div key={index} className="p-4 border-2 border-black bg-gray-100">
            <p className="font-bold text-black mb-3">{index + 1}. {question}</p>
            <fieldset className="flex flex-wrap gap-x-6 gap-y-3">
              <legend className="sr-only">Rating for question {index + 1}</legend>
              {RESPONSES.map(response => (
                <div key={response.value} className="flex items-center">
                  <input
                    id={`q${index}-r${response.value}`}
                    name={`question-${index}`}
                    type="radio"
                    value={response.value}
                    checked={scores[index] === response.value}
                    onChange={() => handleScoreChange(index, response.value)}
                    className="h-5 w-5 text-lime-500 border-2 border-black focus:ring-lime-400"
                  />
                  <label htmlFor={`q${index}-r${response.value}`} className="ml-2 block font-semibold text-gray-800">
                    {response.label}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={calculateResults}
          disabled={!allAnswered}
          className="px-8 py-3 bg-lime-400 text-black border-4 border-black font-bold uppercase transition-all hover:bg-lime-500 hover:shadow-[8px_8px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
        >
          {allAnswered ? 'View My Results' : 'Answer All Questions'}
        </button>
      </div>
    </div>
  );
};

export default Assessment;