import { AppData, DailyDiaryEntry } from './types';

export const QUESTIONS: string[] = [
  "Always have a grasp of my day's schedule in advance.",
  "Understand my advantages and strengths well.",
  "Make a concrete image of negotiations and meetings before I get into them.",
  "Have a grasp of the current situation and identify the issues related to it.",
  "Willing to tackle a difficult task, without giving up before trying it.",
  "Like to create a new plan or an idea for new products.",
  "Express my gratitude immediately after someone helped me.",
  "Treat people fairly regardless of their nationality, gender, age, and status.",
  "Able to change my focus rather quickly in a positive way.",
  "Well aware of my colleagues' and subordinates' wishes and provide them encouragement.",
  "Able to make a bold decision even in an important work situation.",
  "When consulted, I listen to the person silently at first.",
  "Before tackling my work, I always set concrete goals.",
  "Have my own knacks of how to do things well.",
  "Keep a journal and think ahead my plan for the next day's time management and actions.",
  "Take a problem as a room for improvement step and growth, rather than grievance.",
  "Contemplating the purpose of my work motivates me.",
  "My principle is to work on a new idea first, rather than keeping on the precedents.",
  "Highly conscious of company rules and compliances and adhere to them.",
  "Good at rationally explaining things to the others and asking their cooperation.",
  "Practice being punctual, clean the space, and staying courteous.",
  "In achieving a goal, I speak and perform encouragingly for individuals and organizations.",
  "Thoroughly have everyone in the workplace follow through its rules.",
  "Communicate and listen to the others using emails, letters, daily diaries, etc.",
  "Predict possible future problems and come up with countermeasures beforehand.",
  "Understand my tendencies when I don't feel well.",
  "Formulate and contemplate hypotheses on the future society and market.",
  "In solving problems in front of me, I can learn and apply others' successful cases.",
  "Have my own words and methods to elevate my motivation.",
  "In carrying out a project, I envision a successful image in my mind.",
  "Engage in volunteer activities.",
  "Considering the others' personality, I devise my way of talking and advising.",
  "Incorporate exercises in my routines to maintain my health.",
  "For those who failed, I guide them effectively so as to utilize their experience next time.",
  "Take the lead in achieving the organization's goal.",
  "Listen to the other consciously with eye contact, nodding, and giving strokes."
];

export const RESPONSES = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" }
];

export const CAPABILITY_MAP: Record<string, number[]> = {
  "Preparation": [1, 13, 25],
  "Self-evaluation": [2, 14, 26],
  "Imaging": [3, 15, 27],
  "Problem identification and solution": [4, 16, 28],
  "Motivation": [5, 17, 29],
  "Creativity": [6, 18, 30],
  "Social contribution": [7, 19, 31],
  "Relationship": [8, 20, 32],
  "Self-control": [9, 21, 33],
  "Generating motivation": [10, 22, 34],
  "Leadership": [11, 23, 35],
  "Listening": [12, 24, 36]
};

export const CATEGORY_MAP: Record<string, string[]> = {
  "Thinking faculty": ["Preparation", "Self-evaluation", "Imaging"],
  "Action taking": ["Problem identification and solution", "Motivation", "Creativity"],
  "Human talent": ["Social contribution", "Relationship", "Self-control"],
  "Leadership": ["Generating motivation", "Leadership", "Listening"]
};

const createInitialDiaryEntries = (): Record<string, DailyDiaryEntry> => {
  const times = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00'];
  const entries: Record<string, DailyDiaryEntry> = {};
  times.forEach(time => {
    entries[time] = { plan: '', actual: '', reflections: '' };
  });
  return entries;
};


export const initialAppData: AppData = {
  assessmentScores: {
    scores: Array(36).fill(0),
    capabilities: {},
    categories: {},
  },
  goalSetting: {
    name: '',
    todayDate: new Date().toISOString().substring(0, 10),
    goalDate: '',
    societyValues: Array(5).fill(''),
    meValues: Array(5).fill(''),
    goal: '',
    pastSuccesses: { mind: '', skills: '', body: '', life: '' },
    pastFailures: { mind: '', skills: '', body: '', life: '' },
    possibleProblems: { mind: '', skills: '', body: '', life: '' },
    solutions: { mind: '', skills: '', body: '', life: '' },
  },
  openWindowGrid: Array(9).fill(null).map(() => Array(9).fill('')),
  dailyPractice: {
    diary: {
      date: new Date().toISOString().substring(0, 10),
      name: '',
      phrase: '',
      entries: createInitialDiaryEntries(),
    },
    routineSheet: {
      name: '',
      month: new Date().toISOString().substring(0, 7),
      routines: Array.from({ length: 10 }, (_, i) => ({
        name: `Routine ${i + 1}`,
        checks: Array(31).fill(false),
      })),
    }
  }
};