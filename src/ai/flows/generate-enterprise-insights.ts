'use server';

/**
 * @fileOverview A flow that generates AI-powered insights and predictions for enterprise users.
 *
 * - generateEnterpriseInsights - A function that handles the generation of insights.
 * - GenerateEnterpriseInsightsInput - The input type for the generateEnterpriseInsights function.
 * - GenerateEnterpriseInsightsOutput - The return type for the generateEnterpriseInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEnterpriseInsightsInputSchema = z.object({
  dataDescription: z
    .string()
    .describe('A description of the uploaded data, including its source and key metrics.'),
  dataFile: z
    .string()
    .describe(
      'The uploaded data as a string, which must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  specificQuestions: z
    .string()
    .optional()
    .describe('Specific questions the user has about the data.'),
});
export type GenerateEnterpriseInsightsInput = z.infer<typeof GenerateEnterpriseInsightsInputSchema>;

const GenerateEnterpriseInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-powered insights and predictions based on the data.'),
});
export type GenerateEnterpriseInsightsOutput = z.infer<typeof GenerateEnterpriseInsightsOutputSchema>;

export async function generateEnterpriseInsights(
  input: GenerateEnterpriseInsightsInput
): Promise<GenerateEnterpriseInsightsOutput> {
  return generateEnterpriseInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEnterpriseInsightsPrompt',
  input: {schema: GenerateEnterpriseInsightsInputSchema},
  output: {schema: GenerateEnterpriseInsightsOutputSchema},
  prompt: `You are an AI assistant that analyzes enterprise data and provides insights and predictions.

  You are given a description of the data, the data itself, and optionally some questions the user has.
  You should provide clear, actionable insights and predictions that will help the user make informed business decisions.
  Be concise and focus on the most important aspects of the data.

  Data Description: {{{dataDescription}}}
  Data: {{{dataFile}}}
  {{~#if specificQuestions}}
  Specific Questions: {{{specificQuestions}}}
  {{~/if}}
  `,
});

const generateEnterpriseInsightsFlow = ai.defineFlow(
  {
    name: 'generateEnterpriseInsightsFlow',
    inputSchema: GenerateEnterpriseInsightsInputSchema,
    outputSchema: GenerateEnterpriseInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input, {
      config: {
        // Add safety settings to allow more content, since enterprise data may contain sensitive info.
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
        ],
      },
    });
    return output!;
  }
);
