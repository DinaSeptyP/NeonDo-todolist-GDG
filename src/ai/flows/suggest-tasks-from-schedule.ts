'use server';

/**
 * @fileOverview AI agent that suggests new tasks based on the user's schedule and historical task patterns.
 *
 * - suggestTasksFromSchedule - A function that suggests new tasks.
 * - SuggestTasksInput - The input type for the suggestTasksFromSchedule function.
 * - SuggestTasksOutput - The return type for the suggestTasksFromSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTasksInputSchema = z.object({
  schedule: z
    .string()
    .describe(
      'The user personal schedule, including time slots and typical activities.'
    ),
  historicalTasks: z
    .string()
    .describe(
      'The user historical task patterns, including the kind of task and the time they usually appears'
    ),
});
export type SuggestTasksInput = z.infer<typeof SuggestTasksInputSchema>;

const SuggestTasksOutputSchema = z.object({
  suggestedTasks: z
    .array(z.string())
    .describe('A list of tasks suggested, based on schedule and historical tasks'),
});
export type SuggestTasksOutput = z.infer<typeof SuggestTasksOutputSchema>;

export async function suggestTasksFromSchedule(
  input: SuggestTasksInput
): Promise<SuggestTasksOutput> {
  return suggestTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTasksPrompt',
  input: {schema: SuggestTasksInputSchema},
  output: {schema: SuggestTasksOutputSchema},
  prompt: `You are a personal assistant AI, specializing in suggesting tasks to users, so they can efficiently manage their time.

You will use this information to suggest a list of tasks that the user can enter in their to-do list application.

Consider the user's typical schedule and historical task patterns when making suggestions.

Schedule: {{{schedule}}}
Historical task: {{{historicalTasks}}}

Suggest new relevant tasks:
`,
});

const suggestTasksFlow = ai.defineFlow(
  {
    name: 'suggestTasksFlow',
    inputSchema: SuggestTasksInputSchema,
    outputSchema: SuggestTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
