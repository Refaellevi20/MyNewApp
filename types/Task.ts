export type Task = {
    id: string;
    title: string;
    completed: boolean;
    timeSpent: number;
    isTracking: boolean;
    priority: 'low' | 'medium' | 'high';
    wastedTime: number;
    reminder?: Date;  // Add these three fields
    repeat?: 'daily' | 'weekly' | 'monthly' | 'none';
    repeatTime?: string;
  };