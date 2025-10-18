// @/app/actions.ts
'use server';

import { 
  generateEnterpriseInsights, 
  GenerateEnterpriseInsightsInput 
} from '@/ai/flows/generate-enterprise-insights';
import { z } from 'zod';

const ActionInputSchema = z.object({
  dataDescription: z.string().min(10, 'Please provide a more detailed description.'),
  dataFile: z.string().min(1, 'A data file is required.'),
  specificQuestions: z.string().optional(),
});

export async function getAIInsights(data: GenerateEnterpriseInsightsInput) {
  const validation = ActionInputSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.flatten().fieldErrors };
  }

  try {
    const result = await generateEnterpriseInsights(validation.data);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in getAIInsights:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: { _root: [errorMessage] } };
  }
}
