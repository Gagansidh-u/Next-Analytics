import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Newspaper } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Analytics Blog',
  description: 'Explore insights on data analytics, business intelligence, and how Indian startups can leverage data for growth. The official blog of Next Analytics.',
  keywords: ['data analytics blog', 'business intelligence India', 'startup growth', 'Punjab tech'],
  openGraph: {
    title: 'The Next Wave: Data-Driven Decisions in India | Next Analytics Blog',
    description: 'An in-depth look at Next Analytics and the future of business intelligence in India.',
  },
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container py-12 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <Newspaper className="h-9 w-9 text-primary" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                The Next Wave: How Data-Driven Decisions are Powering Indian Startups
              </h1>
              <p className="mt-6 text-lg text-foreground/70">
                An in-depth look at Next Analytics and the future of business intelligence in India.
              </p>
                <p className="mt-4 text-sm text-muted-foreground">Published on: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="prose prose-lg dark:prose-invert mx-auto mt-12 text-foreground/80">
                <Image 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBjaGFydHN8ZW58MHx8fHwxNzYwNzgxMjM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Data analytics dashboard showing charts and graphs"
                    width={1080}
                    height={720}
                    className="rounded-lg shadow-lg"
                    data-ai-hint="dashboard charts"
                />

              <h2>The Dawn of a Data-Driven Era in India</h2>
              <p>
                In the heart of Punjab, a revolution is quietly unfolding. From the bustling streets of Barnala to the tech hubs of Bangalore, Indian startups and small to medium-sized businesses (SMBs) are awakening to a powerful new reality: data is the new currency. For too long, valuable insights have been trapped in disorganized spreadsheets and unmonitored databases. Business owners, armed with intuition and experience, have navigated complex markets, but in today's competitive landscape, intuition alone is no longer enough.
              </p>
              <p>
                This is where Next Analytics enters the picture. Founded in 2024 with a clear and ambitious vision, we are on a mission to democratize data analytics. We believe that every business, regardless of its size or technical expertise, deserves access to the kind of powerful, data-driven insights that have traditionally been the exclusive domain of large corporations with deep pockets.
              </p>
              
              <h2>Our Story: From a Local Problem to a National Mission</h2>
              <p>
                Next Analytics was born from a simple observation: countless promising businesses in Barnala, Punjab, and across India were making critical decisions in the dark. They had the data—sales figures, customer information, website traffic—but it was a chaotic puzzle with no clear picture. The available tools were either too expensive, too complex, or required a dedicated team of analysts, putting them out of reach for most SMBs.
              </p>
              <p>
                We saw an opportunity to build something different. A service that was not just a tool, but a partnership. We decided to combine cutting-edge technology with human expertise to offer a streamlined, affordable, and incredibly effective solution. Our goal was to take the raw, often messy, data from our clients and transform it into something beautiful, intuitive, and, most importantly, actionable.
              </p>

              <blockquote>
                "Our mission is to empower every Indian business with the clarity and confidence to make data-driven decisions that fuel sustainable growth."
              </blockquote>

              <h2>What We Do: The Journey from Data to Decision</h2>
              <p>
                Our process is designed to be as simple as possible for our clients, while being incredibly thorough behind the scenes. It's a three-step journey that turns potential into performance.
              </p>
              <ol>
                <li><strong>Data Consolidation and Cleaning:</strong> You provide us with your data—be it an Excel file, a CSV, or a link to a Google Sheet. Our first job, and one of the most critical, is to clean and prepare this data. We handle duplicates, fix formatting errors, and structure the information in a way that makes meaningful analysis possible.</li>
                <li><strong>Analysis and Visualization:</strong> This is where the magic happens. Our team of analysts, supported by sophisticated algorithms, dives deep into your data. We identify key performance indicators (KPIs), unearth hidden trends, and analyze customer behavior. We then build a custom, interactive dashboard—a visual command center for your business—featuring clear charts, graphs, and KPI cards.</li>
                <li><strong>Insight Delivery:</strong> You receive your interactive dashboard along with a concise PDF summary report. This report doesn't just present data; it tells a story. It highlights the most critical insights and provides actionable recommendations, empowering you to make immediate, impactful changes to your strategy.</li>
              </ol>

                <Image 
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx0ZWFtJTIwd29ya2luZ3xlbnwwfHx8fDE3NjA3ODEyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="A team of professionals collaborating around a computer"
                    width={1080}
                    height={720}
                    className="rounded-lg shadow-lg"
                    data-ai-hint="team working"
                />

              <h2>Why Next Analytics is the Right Choice for Indian Businesses</h2>
              <p>
                We understand the unique challenges and opportunities within the Indian market. Our service is built from the ground up to serve the specific needs of startups and SMBs in this vibrant ecosystem.
              </p>
              <ul>
                <li><strong>Affordability:</strong> Our pricing is transparent and designed to provide a massive return on investment. We've eliminated the overhead of traditional BI tools, passing the savings directly to you.</li>
                <li><strong>Speed:</strong> In business, speed matters. Our streamlined process ensures you get from data to insights in a fraction of the time it would take to implement an in-house solution.</li>
                <li><strong>Expertise on Demand:</strong> You get the benefit of a dedicated data analytics team without the cost and complexity of hiring one. Our analysts are your partners in growth.</li>
                <li><strong>AI-Powered Future:</strong> For our enterprise clients, we're pushing the boundaries with AI-driven predictive analytics. Imagine forecasting sales trends, identifying potential customer churn before it happens, and receiving AI-generated recommendations to optimize your marketing spend. This is the future we are building.</li>
              </ul>
              
              <h2>Join Us on the Data-Driven Journey</h2>
              <p>
                The next chapter of India's growth story will be written by businesses that can effectively harness their data. At Next Analytics, we are proud to be the enabling force behind this transformation, starting from our home in Barnala and reaching every corner of the nation.
              </p>
              <p>
                If you're ready to stop guessing and start knowing, to turn your data from a liability into your most valuable asset, then you're ready for Next Analytics. Let's build the future of your business, together.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
