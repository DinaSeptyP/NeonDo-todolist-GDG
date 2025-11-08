"use client";

import { useState } from "react";
import { suggestTasksFromSchedule } from "@/ai/flows/suggest-tasks-from-schedule";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, Lightbulb, Loader2, Plus } from "lucide-react";
import type { Task } from "@/lib/types";

interface AITaskSuggesterProps {
  onAddTask: (
    text: string,
    priority: Task["priority"],
    dueDate?: Date
  ) => void;
}

export function AITaskSuggester({ onAddTask }: AITaskSuggesterProps) {
  const [schedule, setSchedule] = useState("");
  const [historicalTasks, setHistoricalTasks] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestTasks = async () => {
    if (!schedule && !historicalTasks) {
      setError("Please provide at least one input to get suggestions.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await suggestTasksFromSchedule({
        schedule,
        historicalTasks,
      });
      setSuggestions(result.suggestedTasks);
    } catch (e) {
      setError("Failed to get suggestions. Please try again later.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSuggestion = (text: string) => {
    onAddTask(text, "Medium");
    setSuggestions(suggestions.filter(s => s !== text));
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-primary drop-shadow-neon-primary">
          <Bot className="h-6 w-6" />
          AI Task Oracle
        </CardTitle>
        <CardDescription>
          Let AI analyze your patterns and suggest new tasks.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="schedule">Your Schedule</Label>
          <Textarea
            id="schedule"
            placeholder="e.g., 'Mornings are for deep work, afternoons for meetings...'"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="historical-tasks">Past Tasks</Label>
          <Textarea
            id="historical-tasks"
            placeholder="e.g., 'Weekly report due on Fridays. Project updates every Monday.'"
            value={historicalTasks}
            onChange={(e) => setHistoricalTasks(e.target.value)}
          />
        </div>
        {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-4">
        <Button onClick={handleSuggestTasks} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Analyzing..." : "Suggest Tasks"}
        </Button>
        {suggestions.length > 0 && (
          <div className="space-y-2 pt-4 border-t border-border">
            <h4 className="font-semibold text-muted-foreground">Suggestions:</h4>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/50">
                  <span className="text-sm">{suggestion}</span>
                  <Button size="sm" variant="ghost" onClick={() => handleAddSuggestion(suggestion)} className="text-accent hover:text-accent hover:bg-accent/10">
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
