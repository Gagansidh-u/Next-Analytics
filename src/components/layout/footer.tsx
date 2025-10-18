import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <Image src="https://github.com/Gagansidh-u/My-Webapp/blob/master/Picsart_25-10-18_16-37-29-081.png?raw=true" alt="Next Analytics Logo" width={32} height={32} />
              <span className="text-xl font-bold">Next Analytics</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Actionable insights for data-driven teams.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold">Product</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link href="#testimonials" className="text-muted-foreground hover:text-foreground">Testimonials</Link></li>
              <li><Link href="/enterprise" className="text-muted-foreground hover:text-foreground">Enterprise</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
           <div className="md:col-span-2">
            <h3 className="font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Next Analytics, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
