"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import type { Priority, Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const taskSchema = z.object({
  text: z.string().min(1, "Task description cannot be empty."),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z.date().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface AddTaskFormProps {
  onAddTask: (
    text: string,
    priority: Task["priority"],
    dueDate?: Date
  ) => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const { toast } = useToast();
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      text: "",
      priority: "Medium",
    },
  });

  function onSubmit(data: TaskFormValues) {
    onAddTask(data.text, data.priority as Priority, data.dueDate);
    toast({
      title: "Task Incepted",
      description: "A new task has been added to the matrix.",
    });
    form.reset();
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-accent drop-shadow-neon-accent">
          <PlusCircle className="h-6 w-6" />
          New Directive
        </CardTitle>
        <CardDescription>Add a new task to your list.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Description</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Hack the mainframe'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel className="mb-1.5">Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" variant="secondary">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
