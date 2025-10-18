import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "What file formats do you accept?",
    answer: "We accept Excel (.xlsx), CSV (.csv), and direct links to Google Sheets. For our Enterprise plan, we can connect to various databases and APIs like SQL, Google BigQuery, Stripe, and more."
  },
  {
    question: "How secure is my data?",
    answer: "Data security is our top priority. We use industry-standard encryption for data in transit and at rest. We are committed to protecting your confidential information and never share your data with third parties."
  },
  {
    question: "Can I customize my dashboard?",
    answer: "Yes! While the Basic plan comes with a standard layout, our Professional and Enterprise plans offer extensive customization, including custom metrics, drill-down filters, and tailored branding to match your company's style."
  },
  {
    question: "What if I need more than one revision?",
    answer: "Our Basic plan includes one revision to ensure you are satisfied. Professional and Enterprise plans come with more extensive support, including multiple revisions and dedicated analyst time to perfect your dashboards."
  },
  {
    question: "How does the AI-based prediction work?",
    answer: "Our Enterprise plan leverages advanced machine learning models to provide forecasts and insights. We analyze your historical data to identify trends, predict future outcomes (like sales or customer churn), and offer actionable recommendations to help you strategize effectively."
  }
];


export default function Faq() {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
