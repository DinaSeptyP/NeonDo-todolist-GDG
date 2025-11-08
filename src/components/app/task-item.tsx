"use client";

import { format } from "date-fns";
import { Calendar, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PriorityIcon } from "./priority-icon";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskItem({
  task,
  onToggleComplete,
  onDeleteTask,
}: TaskItemProps) {
  return (
    <Card
      className={cn(
        "bg-card/50 border-border/50 transition-all duration-300",
        task.completed ? "bg-card/30" : "hover:border-primary/50"
      )}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <Switch
          id={`complete-${task.id}`}
          checked={task.completed}
          onCheckedChange={(checked) => onToggleComplete(task.id, checked)}
          className="data-[state=checked]:bg-primary data-[state=checked]:shadow-neon-primary"
          aria-label="Mark task as complete"
        />
        <div className="flex-grow">
          <label
            htmlFor={`complete-${task.id}`}
            className={cn(
              "font-medium transition-colors",
              task.completed ? "line-through text-muted-foreground" : "text-foreground"
            )}
          >
            {task.text}
          </label>
          {task.dueDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4" />
              <span>{format(task.dueDate, "MMM d, yyyy")}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <PriorityIcon priority={task.priority} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteTask(task.id)}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
