import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Laptop,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50 isolate">
      {/* 1. Ambient Background Glows (Softer for light mode) */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary/30 to-purple-200 opacity-40"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* 2. Grid Pattern (Dark lines on light bg) */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      {/* <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:32px_32px]"></div> */}

      <div className="container mx-auto px-4 relative">
        {/* Main Card Container - White with shadow */}
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white/60 px-6 py-12 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:px-12 sm:py-16">
          <div className="flex flex-col items-center text-center">
            {/* Badge/Icon Top */}
            <div className="rounded-full bg-primary/10 p-3 mb-6 ring-1 ring-primary/20">
              <Laptop className="h-6 w-6 text-primary" />
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              Computer acting up?
              <span className="block text-primary mt-1">
                We'll fix it today.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
              From hardware upgrades to complex repairs, our expert team brings
              your devices back to life. Fast turnaround, transparent pricing.
            </p>

            {/* Trust Indicators */}
            <div className="mt-6 flex gap-4 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Free
                Diagnostics
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 30-Day
                Warranty
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 h-12 px-8 text-base"
                asChild
              >
                <a href="tel:+919853839432">
                  <Phone className="mr-2 h-5 w-5" />
                  Call +91 98538 39432
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 h-12 px-8 text-base"
                asChild
              >
                <a
                  href="https://wa.me/919853839432"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="mr-1 h-5 w-5 text-emerald-600" />
                  WhatsApp Us
                </a>
              </Button>
            </div>

            {/* Secondary Link */}
            <div className="mt-8 pt-8 border-t border-slate-200/60 w-full max-w-sm flex justify-center">
              <Button
                variant="link"
                className="text-slate-500 hover:text-primary transition-colors group"
                asChild
              >
                <Link to="/support">
                  Or submit a support ticket
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
