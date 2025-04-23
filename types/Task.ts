export type Task = {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  timeSpent: number; // in seconds
  isTracking: boolean;
  wastedTime: number; // in seconds
}; 