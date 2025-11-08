export type Priority = "High" | "Medium" | "Low";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date;
};

export type FilterStatus = "all" | "complete" | "incomplete";
