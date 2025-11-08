"use client";

import type { Task } from "@/lib/types";
import { TaskItem } from "./task-item";
import { Card, CardContent } from "@/components/ui/card";
import { ListX } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card className="border-dashed border-border/50 bg-card/20">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center text-muted-foreground">
          <ListX className="h-12 w-12 mb-4 text-primary/50" />
          <h3 className="text-lg font-semibold">No Tasks Found</h3>
          <p>Your task list is empty. Try adding a new task or changing the filter.</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
