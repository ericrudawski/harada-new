import React from 'react';

interface WelcomeProps {
  onNext: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold uppercase text-black mb-4">Welcome</h2>
      <p className="text-black mb-6 max-w-3xl mx-auto font-semibold">
        This tool guides you through the Harada Method, a system for achieving ambitious goals. You will assess your strengths, define your vision, break it down, and establish routines for success.
      </p>
      <div className="bg-yellow-300 border-4 border-black p-4 text-left max-w-2xl mx-auto mb-8">
        <h3 className="font-bold text-xl uppercase">The Process:</h3>
        <ul className="list-disc list-inside mt-2 font-semibold space-y-1">
          <li>36-question self-assessment.</li>
          <li>Long-term goal setting form.</li>
          <li>"Open Window 64" goal breakdown.</li>
          <li>Daily planning & routine tracking.</li>
        </ul>
      </div>
      <p className="text-black mb-8 max-w-2xl mx-auto font-semibold">
        Ready? Let's begin.
      </p>
      <button
        onClick={onNext}
        className="px-8 py-4 bg-lime-400 text-black border-4 border-black font-bold uppercase text-lg transition-all hover:bg-lime-500 hover:shadow-[8px_8px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1"
      >
        Start Self-Assessment
      </button>
    </div>
  );
};

export default Welcome;