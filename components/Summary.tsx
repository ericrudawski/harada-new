import React from 'react';
import { AssessmentScores } from '../types';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORY_MAP } from '../constants';

interface SummaryProps {
  scores: AssessmentScores;
}

const Summary: React.FC<SummaryProps> = ({ scores }) => {
  const { capabilities, categories } = scores;

  const maxCategoryScore = Math.max(...Object.values(CATEGORY_MAP).map(caps => caps.length * 3 * 5));
  const categoryData = Object.keys(categories).map(key => ({
    subject: key,
    A: categories[key],
    fullMark: maxCategoryScore,
  }));
  
  const maxCapabilityScore = 3 * 5;
  const capabilityData = Object.keys(capabilities).map(key => ({
    name: key,
    score: capabilities[key],
    fullMark: maxCapabilityScore
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold uppercase text-black mb-2">Assessment Summary</h2>
      <p className="text-black mb-8 font-semibold">Your strengths and areas for growth.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-4 border-4 border-black bg-gray-100">
          <h3 className="text-lg font-bold uppercase text-black mb-4 text-center">Core Competencies</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoryData}>
              <PolarGrid stroke="#000" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#000', fontWeight: 'bold' }} />
              <PolarRadiusAxis angle={30} domain={[0, maxCategoryScore]} tick={{ fill: '#000' }}/>
              <Radar name="Your Score" dataKey="A" stroke="#000" fill="#fbbf24" fillOpacity={0.8} strokeWidth={2} />
              <Tooltip contentStyle={{ backgroundColor: '#000', color: '#fff', border: '2px solid #fff' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 border-4 border-black bg-gray-100">
          <h3 className="text-lg font-bold uppercase text-black mb-4 text-center">Capabilities</h3>
           <ResponsiveContainer width="100%" height={400}>
            <BarChart layout="vertical" data={capabilityData} margin={{ top: 5, right: 20, left: 130, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" />
              <XAxis type="number" domain={[0, maxCapabilityScore]} stroke="#000" tick={{ fill: '#000', fontWeight: 'bold' }} />
              <YAxis type="category" dataKey="name" width={130} stroke="#000" tick={{ fill: '#000', fontWeight: 'bold', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#000', color: '#fff', border: '2px solid #fff' }} cursor={{fill: 'rgba(236, 252, 203, 0.5)'}} />
              <Legend wrapperStyle={{fontWeight: 'bold'}} />
              <Bar dataKey="score" fill="#84cc16" stroke="#000" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Summary;