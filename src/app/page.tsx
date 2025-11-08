"use client";

import { useState, useMemo, useEffect } from "react";
import type { Task, FilterStatus } from "@/lib/types";
import { AppHeader } from "@/components/app/header";
import { TaskList } from "@/components/app/task-list";
import { AddTaskForm } from "@/components/app/add-task-form";
import { AITaskSuggester } from "@/components/app/ai-task-suggester";
import { TaskFilters } from "@/components/app/task-filters";
import { useToast } from "@/hooks/use-toast";

const initialTasksData: Omit<Task, 'id' | 'dueDate'>[] = [
  { text: 'Design the cyberpunk UI', completed: true, priority: 'High' },
  { text: 'Develop core features', completed: false, priority: 'High' },
  { text: 'Integrate GenAI task suggestions', completed: false, priority: 'Medium' },
  { text: 'Prepare for launch party', completed: false, priority: 'Low' },
  { text: 'Mark task as complete with a simple toggle', completed: true, priority: 'Medium' },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    setTasks(initialTasksData.map((task, index) => ({
      ...task,
      id: crypto.randomUUID(),
      dueDate: task.text.includes('Develop') ? new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000) : (task.text.includes('Integrate') ? new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000) : new Date()),
    })));
  }, []);

  const handleAddTask = (
    text: string,
    priority: Task["priority"],
    dueDate?: Date
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      dueDate,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast({
      title: "Task Obliterated",
      description: "The task has been removed from your list.",
    });
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "all") return true;
      if (filter === "complete") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <h2 className="text-3xl font-bold font-headline text-primary drop-shadow-neon-primary">
                Task Matrix
              </h2>
              <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
            </div>
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
            />
          </div>
          <aside className="lg:col-span-2 space-y-8">
            <AddTaskForm onAddTask={handleAddTask} />
            <AITaskSuggester onAddTask={handleAddTask} />
          </aside>
        </div>
      </main>
      <footer className="py-4 px-8 text-center text-muted-foreground text-sm">
        <p>Built for the digital frontier. &copy; {new Date().getFullYear()} NeonDo.</p>
      </footer>
    </div>
  );
}
