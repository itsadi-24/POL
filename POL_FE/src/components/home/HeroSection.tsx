import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Monitor,
  Wrench,
  Cpu,
  Headphones,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const heroSlides = [
  {
    id: 1,
    title: 'Complete Computer Solutions',
    subtitle: 'Home & Business',
    description:
      'Expert sales, repair, and IT services. We transform your technology frustrations into seamless productivity.',
    image:
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1920&q=80',
    cta: { text: 'Explore Products', href: '/sales' },
    accent: 'bg-blue-600',
  },
  {
    id: 2,
    title: 'Professional Repair Services',
    subtitle: 'Same Day Service',
    description:
      'Cracked screen? Slow laptop? Our certified technicians bring your devices back to life with a 30-day warranty.',
    image:
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1920&q=80',
    cta: { text: 'Book Repair', href: '/services' },
    accent: 'bg-emerald-600',
  },
  {
    id: 3,
    title: 'Custom PC Builds',
    subtitle: 'Extreme Performance',
    description:
      'Dominate your games or crush your workload. Custom workstations built with premium components and cable management.',
    image:
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1920&q=80',
    cta: { text: 'Start Building', href: '/services' },
    accent: 'bg-purple-600',
  },
];

const features = [
  { icon: ShieldCheck, title: 'Warranty', desc: '30-Day Guarantee' },
  { icon: Wrench, title: 'Expert Techs', desc: 'Certified Team' },
  { icon: Zap, title: 'Fast Service', desc: 'Same Day Repair' },
  { icon: Headphones, title: 'Support', desc: '24/7 Assistance' },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timeoutRef = useRef(null);

  // Auto-advance logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const next = () =>
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const interval = setInterval(next, 6000); // 6 Seconds per slide

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Reset auto-play timer on interaction
  const handleManualSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () =>
    handleManualSlide((currentSlide + 1) % heroSlides.length);
  const prevSlide = () =>
    handleManualSlide(
      (currentSlide - 1 + heroSlides.length) % heroSlides.length
    );

  return (
    <section className="relative bg-slate-900 pb-16 lg:pb-0">
      {/* 1. Main Slider Container */}
      <div className="relative h-[650px] lg:h-[750px] w-full overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className={cn(
                  'w-full h-full object-cover transition-transform duration-[8000ms] ease-linear',
                  index === currentSlide ? 'scale-110' : 'scale-100' // Subtle Ken Burns effect
                )}
              />
              {/* Professional Gradient Overlay - Improves text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-2xl pt-10">
                {/* Animated Text Wrapper */}
                <div key={index} className="space-y-6">
                  {/* Subtitle Badge */}
                  <div className="animate-fade-in-up [animation-delay:100ms] opacity-0 fill-mode-forwards">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20 backdrop-blur-md bg-white/10'
                      )}
                    >
                      <span
                        className={cn(
                          'mr-2 h-2 w-2 rounded-full',
                          slide.accent
                        )}
                      />
                      {slide.subtitle}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] animate-fade-in-up [animation-delay:200ms] opacity-0 fill-mode-forwards">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed animate-fade-in-up [animation-delay:400ms] opacity-0 fill-mode-forwards">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up [animation-delay:600ms] opacity-0 fill-mode-forwards">
                    <Button
                      asChild
                      size="lg"
                      className="h-14 px-8 text-base bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                    >
                      <Link to={slide.cta.href}>
                        {slide.cta.text}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-base border-white/20 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40"
                    >
                      <Link to="/support">Contact Support</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 2. Navigation Controls */}
        <div className="absolute bottom-28 left-0 w-full z-20">
          <div className="container mx-auto px-4 flex items-center justify-between">
            {/* Dots / Progress */}
            <div className="flex gap-3">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleManualSlide(idx)}
                  className="group relative h-1.5 rounded-full overflow-hidden bg-white/20 transition-all duration-300 w-12 hover:w-20 hover:bg-white/40"
                >
                  {/* Fill animation for active slide */}
                  <div
                    className={cn(
                      'absolute top-0 left-0 h-full w-full bg-white origin-left transition-transform duration-[6000ms] ease-linear',
                      idx === currentSlide && isAutoPlaying
                        ? 'scale-x-100'
                        : 'scale-x-0',
                      idx === currentSlide &&
                        !isAutoPlaying &&
                        'scale-x-100 transition-none'
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <Button
                onClick={prevSlide}
                size="icon"
                variant="ghost"
                className="rounded-full text-white hover:bg-white/10 hover:text-white border border-white/10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={nextSlide}
                size="icon"
                variant="ghost"
                className="rounded-full text-white hover:bg-white/10 hover:text-white border border-white/10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Floating Features Card */}
      <div className="relative -mt-20 z-30 container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-6 md:p-8 translate-y-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {features.map((feature, i) => (
              <div
                key={i}
                className={cn(
                  'flex items-center gap-4',
                  i % 2 !== 0 ? 'pl-0 md:pl-6' : '', // Layout adjustment for mobile borders
                  i > 1 ? 'pt-6 md:pt-0' : ''
                )}
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
