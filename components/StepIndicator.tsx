import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const stepNames = [
  'Welcome',
  'Assess',
  'Summary',
  'Goal Set',
  'Plan',
  'Practice',
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, onStepClick }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex flex-wrap items-center justify-center border-y-4 border-black bg-white">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <li key={index} className="flex-1 min-w-[100px]">
            <button
              onClick={() => onStepClick(index)}
              className={`relative flex flex-col items-center justify-center w-full p-3 text-center group ${index < totalSteps - 1 ? 'border-r-4 border-black' : ''} transition-colors h-full`}
              aria-current={index === currentStep ? 'step' : undefined}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 border-4 border-black font-bold text-lg
                  ${
                    index === currentStep
                      ? 'bg-lime-400'
                      : index < currentStep
                      ? 'bg-yellow-300'
                      : 'bg-white group-hover:bg-gray-200'
                  }`}
              >
                {index < currentStep ? (
                  <span>✔</span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className="mt-2 text-xs font-bold uppercase tracking-wider">{stepNames[index]}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;