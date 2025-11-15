export interface AssessmentScores {
  scores: number[];
  capabilities: Record<string, number>;
  categories: Record<string, number>;
}

export interface GoalSettingData {
  name: string;
  todayDate: string;
  goalDate: string;
  societyValues: string[];
  meValues: string[];
  goal: string;
  pastSuccesses: { mind: string; skills: string; body: string; life: string; };
  pastFailures: { mind: string; skills: string; body: string; life: string; };
  possibleProblems: { mind: string; skills: string; body: string; life: string; };
  solutions: { mind: string; skills: string; body: string; life: string; };
}

export type OpenWindowGrid = (string | undefined)[][];

export interface DailyDiaryEntry {
  plan: string;
  actual: string;
  reflections: string;
}

export interface DailyPracticeData {
  diary: {
    date: string;
    name: string;
    phrase: string;
    entries: Record<string, DailyDiaryEntry>;
  };
  routineSheet: {
    name: string;
    month: string;
    routines: { name: string; checks: boolean[] }[];
  };
}


export interface AppData {
  assessmentScores: AssessmentScores;
  goalSetting: GoalSettingData;
  openWindowGrid: OpenWindowGrid;
  dailyPractice: DailyPracticeData;
}