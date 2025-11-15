import React, { useState, useEffect } from 'react';
import { DailyPracticeData } from '../types';

interface DailyPracticeProps {
    initialData: DailyPracticeData;
    onUpdate: (data: DailyPracticeData) => void;
}

const DailyDiary: React.FC<{data: DailyPracticeData['diary'], onUpdate: (diaryData: DailyPracticeData['diary']) => void}> = ({ data, onUpdate }) => {

  const handleInputChange = (field: 'date' | 'name' | 'phrase', value: string) => {
    onUpdate({ ...data, [field]: value });
  };

  const handleEntryChange = (time: string, field: 'plan' | 'actual' | 'reflections', value: string) => {
    const newEntries = {
      ...data.entries,
      [time]: {
        ...data.entries[time],
        [field]: value
      }
    };
    onUpdate({ ...data, entries: newEntries });
  };

  const inputClass = "w-full p-2 border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-300";
  const textareaClass = `${inputClass} resize-none text-sm`;
    
  return (
    <div className="p-4 border-4 border-black bg-gray-100">
        <h3 className="text-xl font-bold uppercase text-black mb-4">Daily Diary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input type="date" value={data.date} onChange={e => handleInputChange('date', e.target.value)} className={inputClass} />
            <input type="text" placeholder="Your Name" value={data.name} onChange={e => handleInputChange('name', e.target.value)} className={inputClass} />
            <input type="text" placeholder="Today's Phrase" value={data.phrase} onChange={e => handleInputChange('phrase', e.target.value)} className={inputClass} />
        </div>
        
        <div className="grid grid-cols-12 gap-4 font-bold text-sm text-center mb-2 uppercase">
            <div className="col-span-1">Time</div>
            <div className="col-span-3">Plan</div>
            <div className="col-span-3">Actual</div>
            <div className="col-span-5">Reflections</div>
        </div>
        
        {Object.keys(data.entries).map(time => (
            <div key={time} className="grid grid-cols-12 gap-4 items-center mb-1">
                <div className="col-span-1 text-xs text-black font-bold">{time}</div>
                <div className="col-span-3"><textarea rows={2} value={data.entries[time].plan} onChange={e => handleEntryChange(time, 'plan', e.target.value)} className={textareaClass}></textarea></div>
                <div className="col-span-3"><textarea rows={2} value={data.entries[time].actual} onChange={e => handleEntryChange(time, 'actual', e.target.value)} className={textareaClass}></textarea></div>
                <div className="col-span-5"><textarea rows={2} value={data.entries[time].reflections} onChange={e => handleEntryChange(time, 'reflections', e.target.value)} className={textareaClass}></textarea></div>
            </div>
        ))}
    </div>
  );
};

const RoutineCheckSheet: React.FC<{data: DailyPracticeData['routineSheet'], onUpdate: (sheetData: DailyPracticeData['routineSheet']) => void}> = ({ data, onUpdate }) => {
  const daysInMonth = 31;

  const handleInputChange = (field: 'name' | 'month', value: string) => {
    onUpdate({ ...data, [field]: value });
  };
  
  const handleRoutineNameChange = (index: number, value: string) => {
    const newRoutines = [...data.routines];
    newRoutines[index].name = value;
    onUpdate({ ...data, routines: newRoutines });
  };

  const handleCheckboxChange = (routineIndex: number, dayIndex: number) => {
    const newRoutines = [...data.routines];
    newRoutines[routineIndex].checks[dayIndex] = !newRoutines[routineIndex].checks[dayIndex];
    onUpdate({ ...data, routines: newRoutines });
  };

  const inputClass = "w-full p-2 border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-300";

  return (
    <div className="p-4 border-4 border-black bg-gray-100 overflow-x-auto">
        <h3 className="text-xl font-bold uppercase text-black mb-4">Routine Check Sheet</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Your Name" value={data.name} onChange={e => handleInputChange('name', e.target.value)} className={inputClass} />
            <input type="month" value={data.month} onChange={e => handleInputChange('month', e.target.value)} className={inputClass} />
        </div>
        <table className="min-w-full text-xs text-center border-collapse border-2 border-black">
            <thead>
                <tr className="bg-gray-300">
                    <th className="border-2 border-black p-2 uppercase font-bold">Routine</th>
                    {Array.from({ length: daysInMonth }, (_, i) => (
                        <th key={i} className="border-2 border-black p-1 font-bold w-8">{i + 1}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.routines.map((routine, rIndex) => (
                    <tr key={rIndex} className="bg-white">
                        <td className="border-2 border-black p-1 text-left">
                          <input 
                            type="text" 
                            value={routine.name} 
                            onChange={(e) => handleRoutineNameChange(rIndex, e.target.value)}
                            className="w-full font-semibold focus:outline-none"
                          />
                        </td>
                        {Array.from({ length: daysInMonth }, (_, dIndex) => (
                            <td key={dIndex} className="border-2 border-black p-1">
                                <input 
                                  type="checkbox" 
                                  checked={routine.checks[dIndex]}
                                  onChange={() => handleCheckboxChange(rIndex, dIndex)}
                                  className="h-5 w-5 rounded-none text-lime-500 focus:ring-lime-400 border-2 border-black"
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

const DailyPractice: React.FC<DailyPracticeProps> = ({ initialData, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('diary');
    const [data, setData] = useState<DailyPracticeData>(initialData);

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

    const handleDiaryUpdate = (diaryData: DailyPracticeData['diary']) => {
        setData(prev => ({...prev, diary: diaryData}));
    };

    const handleSheetUpdate = (sheetData: DailyPracticeData['routineSheet']) => {
        setData(prev => ({...prev, routineSheet: sheetData}));
    }

    return (
        <div>
            <h2 className="text-2xl font-bold uppercase text-black mb-2">Daily Practice</h2>
            <p className="text-black mb-6 font-semibold">Consistent daily action is key. Use these tools to plan your day and track routines.</p>
            
            <div className="flex border-b-4 border-black">
                <button onClick={() => setActiveTab('diary')} className={`px-6 py-3 font-bold uppercase border-r-4 border-black transition-colors ${activeTab === 'diary' ? 'bg-yellow-300' : 'bg-gray-300 hover:bg-gray-400'}`}>
                    Daily Diary
                </button>
                <button onClick={() => setActiveTab('routine')} className={`px-6 py-3 font-bold uppercase transition-colors ${activeTab === 'routine' ? 'bg-yellow-300' : 'bg-gray-300 hover:bg-gray-400'}`}>
                    Routine Check
                </button>
            </div>

            <div className="mt-0">
                {activeTab === 'diary' && <DailyDiary data={data.diary} onUpdate={handleDiaryUpdate} />}
                {activeTab === 'routine' && <RoutineCheckSheet data={data.routineSheet} onUpdate={handleSheetUpdate}/>}
            </div>
        </div>
    );
};

export default DailyPractice;