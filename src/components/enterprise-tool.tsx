'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getAIInsights } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, ServerCrash } from 'lucide-react';
import { GenerateEnterpriseInsightsOutput } from '@/ai/flows/generate-enterprise-insights';

const formSchema = z.object({
  dataDescription: z.string().min(10, { message: 'Please provide a more detailed data description.' }),
  dataFile: z.any(),
  specificQuestions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EnterpriseTool() {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateEnterpriseInsightsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataDescription: '',
      specificQuestions: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        form.setError('dataFile', { type: 'manual', message: 'File size must be less than 5MB.' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target?.result as string);
        form.clearErrors('dataFile');
      };
      reader.onerror = () => {
        form.setError('dataFile', { type: 'manual', message: 'Failed to read file.' });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!fileContent) {
      form.setError('dataFile', { type: 'manual', message: 'Please upload a data file.' });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    const response = await getAIInsights({
      ...data,
      dataFile: fileContent,
    });

    setIsLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
      toast({
        title: "Insights Generated!",
        description: "Your AI-powered analysis is ready.",
      });
    } else {
      let errorMessage = 'An unknown error occurred.';
      if (typeof response.error === 'string') {
        errorMessage = response.error;
      } else if (response.error?._root) {
        errorMessage = response.error._root.join(', ');
      }
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Error Generating Insights',
        description: errorMessage,
      });
    }
  };

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generate Insights</CardTitle>
          <CardDescription>Fill out the form to get AI-powered insights from your data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="dataFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data File (.csv, .xlsx)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".csv, .xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'Monthly sales data for our e-commerce store, including product category, region, and customer segments.'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specificQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Questions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'What are the top 3 drivers of customer churn? Which marketing channel has the highest ROI?'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Insights
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Generated Insights</CardTitle>
          <CardDescription>Your AI-generated analysis will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          {isLoading && (
            <div className="text-center text-muted-foreground">
              <Loader2 className="mx-auto h-12 w-12 animate-spin mb-4" />
              <p>Analyzing your data... this may take a moment.</p>
            </div>
          )}
          {error && !isLoading && (
            <div className="text-center text-destructive">
                <ServerCrash className="mx-auto h-12 w-12 mb-4" />
                <p className="font-semibold">Analysis Failed</p>
                <p className="text-sm">{error}</p>
            </div>
          )}
          {result && !isLoading && (
            <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
                <pre className="whitespace-pre-wrap font-sans text-sm bg-background p-4 rounded-md">{result.insights}</pre>
            </div>
          )}
          {!isLoading && !result && !error && (
            <div className="text-center text-muted-foreground">
              <Sparkles className="mx-auto h-12 w-12 mb-4" />
              <p>Your insights are waiting.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
