import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Assessment from './components/Assessment';
import Summary from './components/Summary';
import GoalSettingForm from './components/GoalSettingForm';
import OpenWindow64 from './components/OpenWindow64';
import DailyPractice from './components/DailyPractice';
import StepIndicator from './components/StepIndicator';
import { AppData, AssessmentScores, DailyPracticeData, GoalSettingData, OpenWindowGrid } from './types';
import { initialAppData } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [appData, setAppData] = useState<AppData>(initialAppData);

  const totalSteps = 6;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 0 && stepNumber < totalSteps) {
      setStep(stepNumber);
    }
  };

  const updateAssessmentScores = (scores: AssessmentScores) => {
    setAppData((prev) => ({ ...prev, assessmentScores: scores }));
    nextStep();
  };

  const updateGoalSetting = (data: GoalSettingData) => {
    setAppData(prev => ({ ...prev, goalSetting: data }));
  };
  
  const updateOpenWindowGrid = (grid: OpenWindowGrid) => {
    setAppData(prev => ({ ...prev, openWindowGrid: grid }));
  };

  const updateDailyPractice = (data: DailyPracticeData) => {
    setAppData(prev => ({ ...prev, dailyPractice: data }));
  };
  
  const renderStep = () => {
    switch (step) {
      case 0:
        return <Welcome onNext={nextStep} />;
      case 1:
        return <Assessment onSubmit={updateAssessmentScores} initialScores={appData.assessmentScores.scores} />;
      case 2:
        return <Summary scores={appData.assessmentScores} />;
      case 3:
        return <GoalSettingForm initialData={appData.goalSetting} onUpdate={updateGoalSetting} />;
      case 4:
        return <OpenWindow64 initialGrid={appData.openWindowGrid} onUpdate={updateOpenWindowGrid} />;
      case 5:
        return <DailyPractice initialData={appData.dailyPractice} onUpdate={updateDailyPractice} />;
      default:
        return <Welcome onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10 border-4 border-black bg-yellow-300 p-4">
          <h1 className="text-3xl sm:text-5xl font-bold uppercase">Harada Method</h1>
          <p className="text-black mt-2 font-semibold">A System for Goal Achievement</p>
        </header>
        
        <StepIndicator currentStep={step} totalSteps={totalSteps} onStepClick={goToStep} />

        <main className="mt-10 bg-white p-6 sm:p-8 border-4 border-black">
          {renderStep()}
        </main>

        {step > 0 && (
          <div className="mt-8 flex justify-between">
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-white border-4 border-black font-bold uppercase transition-all hover:bg-yellow-300 hover:shadow-[8px_8px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              Previous
            </button>
            {step < totalSteps - 1 && (
               <button
                onClick={nextStep}
                className="px-6 py-3 bg-lime-400 text-black border-4 border-black font-bold uppercase transition-all hover:bg-lime-500 hover:shadow-[8px_8px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;