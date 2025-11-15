import React, { useState, useEffect } from 'react';
import { GoalSettingData } from '../types';

interface GoalSettingFormProps {
  initialData: GoalSettingData;
  onUpdate: (data: GoalSettingData) => void;
}

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
    <div className="relative group flex items-center cursor-help">
        {children}
        <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-black text-white text-xs rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border-2 border-white">
            {text}
        </div>
    </div>
);

const GoalSettingForm: React.FC<GoalSettingFormProps> = ({ initialData, onUpdate }) => {
    const [data, setData] = useState<GoalSettingData>(initialData);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (JSON.stringify(data) !== JSON.stringify(initialData)) {
                 onUpdate(data);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [data, onUpdate, initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleListChange = (listName: 'societyValues' | 'meValues', index: number, value: string) => {
        setData(prev => {
            const newList = [...prev[listName]];
            newList[index] = value;
            return { ...prev, [listName]: newList };
        });
    };
    
    const handleGridTextareaChange = (
        category: 'pastSuccesses' | 'pastFailures' | 'possibleProblems' | 'solutions',
        field: 'mind' | 'skills' | 'body' | 'life',
        value: string
    ) => {
        setData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };
    
    const inputClass = "mt-1 block w-full border-2 border-black p-2 focus:outline-none focus:ring-4 focus:ring-yellow-300";
    const textareaClass = `${inputClass} h-24 resize-y`;

    const renderInputList = (title: string, listKey: 'societyValues' | 'meValues', tooltipText: string) => (
        <div>
            <h4 className="font-bold text-lg uppercase bg-gray-200 p-2 border-2 border-b-0 border-black">
                <Tooltip text={tooltipText}>
                    <span>{title}</span>
                </Tooltip>
            </h4>
            <div className="border-2 border-black">
                {Array.from({ length: 5 }).map((_, i) => (
                    <input 
                      key={i} 
                      type="text" 
                      className="w-full p-2 border-b-2 border-black last:border-b-0 focus:outline-none bg-white" 
                      placeholder={`${i + 1}.`}
                      value={data[listKey][i]}
                      onChange={(e) => handleListChange(listKey, i, e.target.value)}
                    />
                ))}
            </div>
        </div>
    );
    
    const renderGridTextareas = (title: string, successKey: 'pastSuccesses' | 'possibleProblems', failureKey: 'pastFailures' | 'solutions') => (
        <div className="mt-6">
            <h3 className="text-xl font-bold text-center uppercase text-black bg-yellow-300 p-2 border-4 border-black">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 border-4 border-t-0 border-black">
                <div className="p-2 border-b-4 md:border-b-0 md:border-r-4 border-black">
                    <h4 className="font-bold uppercase text-black mb-2">Mind/Mental</h4>
                    <textarea value={data[successKey].mind} onChange={e => handleGridTextareaChange(successKey, 'mind', e.target.value)} className={textareaClass} />
                </div>
                <div className="p-2">
                    <h4 className="font-bold uppercase text-black mb-2">Skills</h4>
                    <textarea value={data[failureKey].mind} onChange={e => handleGridTextareaChange(failureKey, 'mind', e.target.value)} className={textareaClass} />
                </div>
                <div className="p-2 border-t-4 border-b-4 md:border-b-0 md:border-r-4 border-black">
                    <h4 className="font-bold uppercase text-black mb-2">Body health</h4>
                    <textarea value={data[successKey].body} onChange={e => handleGridTextareaChange(successKey, 'body', e.target.value)} className={textareaClass} />
                </div>
                 <div className="p-2 border-t-4 border-black">
                    <h4 className="font-bold uppercase text-black mb-2">Life</h4>
                    <textarea value={data[failureKey].body} onChange={e => handleGridTextareaChange(failureKey, 'body', e.target.value)} className={textareaClass} />
                </div>
            </div>
        </div>
    );


  return (
    <div>
      <h2 className="text-2xl font-bold uppercase text-black mb-2">Long Term Goal Setting</h2>
      <p className="text-black mb-6 font-semibold">Define your vision. This form clarifies your ultimate goal and what drives you.</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-4 border-black bg-gray-100">
            <div><label className="block font-bold uppercase text-black">Name</label><input type="text" name="name" value={data.name} onChange={handleInputChange} className={inputClass}/></div>
            <div><label className="block font-bold uppercase text-black">Today's Date</label><input type="date" name="todayDate" value={data.todayDate} onChange={handleInputChange} className={inputClass}/></div>
            <div><label className="block font-bold uppercase text-black">Goal Date</label><input type="date" name="goalDate" value={data.goalDate} onChange={handleInputChange} className={inputClass}/></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {renderInputList("Values (Society & Others)", "societyValues", "List values and purposes that benefit others, your community, or society at large. How does your goal contribute to the greater good?")}
            {renderInputList("Values (Me)", "meValues", "List personal values and purposes that drive you. What personal satisfaction, growth, or fulfillment will you gain from achieving this goal?")}
        </div>

        <div>
            <label className="block text-xl font-bold text-center uppercase text-black bg-yellow-300 p-2 border-4 border-black">My Goal</label>
            <textarea name="goal" value={data.goal} onChange={handleInputChange} className="w-full p-2 border-4 border-t-0 border-black h-24 resize-y focus:outline-none focus:ring-4 focus:ring-yellow-300" placeholder="State your long-term goal clearly..."></textarea>
        </div>

        {renderGridTextareas("Past Successes / Failures", "pastSuccesses", "pastFailures")}
        {renderGridTextareas("Possible Problems / Solutions", "possibleProblems", "solutions")}
      </div>
    </div>
  );
};

export default GoalSettingForm;