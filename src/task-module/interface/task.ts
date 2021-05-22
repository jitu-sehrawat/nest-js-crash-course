export interface Task {
  name: string;
  id?: string;
  completed?: boolean;
  description?: string;
  owner?: string;
  duration?: number;
}
