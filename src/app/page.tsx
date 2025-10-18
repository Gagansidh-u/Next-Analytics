import Header from '@/components/layout/header';
import Hero from '@/components/sections/hero';
import HowItWorks from '@/components/sections/how-it-works';
import Features from '@/components/sections/features';
import Pricing from '@/components/sections/pricing';
import Testimonials from '@/components/sections/testimonials';
import Faq from '@/components/sections/faq';
import Cta from '@/components/sections/cta';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Pricing />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
