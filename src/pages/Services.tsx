import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Wrench,
  Monitor,
  Cpu,
  Truck,
  HardDrive,
  Network,
  Shield,
  Zap,
  Clock,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FaWhatsapp } from 'react-icons/fa';

const services = [
  {
    icon: Wrench,
    title: 'Hardware Repair',
    description:
      'Expert diagnosis for laptops & desktops. We fix screens, keyboards, and motherboards with precision.',
    features: [
      'Screen replacement',
      'Keyboard repair',
      'Battery replacement',
      'Port repairs',
    ],
    colorClass:
      'text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white',
    price: 'From ₹500',
    popular: true,
  },
  {
    icon: Monitor,
    title: 'Software Solutions',
    description:
      'OS installation, virus removal, and speed optimization to make your computer run like new.',
    features: [
      'OS installation',
      'Virus removal',
      'Driver updates',
      'Speed tuning',
    ],
    colorClass:
      'text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white',
    price: 'From ₹300',
  },
  {
    icon: Cpu,
    title: 'Custom PC Builds',
    description:
      'Tailor-made rigs for gaming or workstations. We handle component selection and assembly.',
    features: [
      'Component selection',
      'Pro Assembly',
      'Cable management',
      'Stress testing',
    ],
    colorClass:
      'text-purple-600 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white',
    price: 'From ₹2,000',
  },
  {
    icon: Truck,
    title: 'On-site Support',
    description:
      'We come to you. Professional repairs and network setup for homes and offices.',
    features: [
      'Home visits',
      'Office support',
      'Network setup',
      'Printer config',
    ],
    colorClass:
      'text-orange-600 bg-orange-50 group-hover:bg-orange-600 group-hover:text-white',
    price: 'From ₹800',
  },
  {
    icon: HardDrive,
    title: 'Data Recovery',
    description:
      'Advanced recovery for lost files from damaged hard drives, SSDs, and USB sticks.',
    features: [
      'HDD recovery',
      'SSD recovery',
      'Corrupted files',
      'Formatted drives',
    ],
    colorClass:
      'text-rose-600 bg-rose-50 group-hover:bg-rose-600 group-hover:text-white',
    price: 'From ₹1,500',
  },
  {
    icon: Network,
    title: 'Network Setup',
    description:
      'Seamless connectivity solutions. WiFi optimization, LAN cabling, and router configuration.',
    features: ['WiFi setup', 'LAN cabling', 'Router config', 'Security setup'],
    colorClass:
      'text-cyan-600 bg-cyan-50 group-hover:bg-cyan-600 group-hover:text-white',
    price: 'From ₹1,000',
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Certified Experts',
    description: 'Our team consists of certified hardware engineers.',
  },
  {
    icon: Zap,
    title: 'Express Service',
    description: 'Same-day diagnosis and 24-hour turnaround.',
  },
  {
    icon: Clock,
    title: 'Open 7 Days',
    description: 'We are available weekends for emergency repairs.',
  },
  {
    icon: CheckCircle2,
    title: '90-Day Warranty',
    description: 'We stand behind every repair we perform.',
  },
];

const Services = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-20 lg:py-24 bg-slate-900 overflow-hidden isolate">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Professional IT Solutions</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Expert Repairs & <br />{' '}
            <span className="text-transparent bg-clip-text bg-blue-500">
              Custom Solutions
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From cracked screens to complex networking, we deliver technology
            services that you can rely on. Fast, affordable, and guaranteed.
          </p>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container mx-auto px-4 mt-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={cn(
                  'group relative flex flex-col p-8 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50',
                  'hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-1 transition-all duration-300 ease-out',
                  service.popular && 'ring-2 ring-blue-500 ring-offset-2'
                )}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="flex justify-between items-start mb-6">
                  <div
                    className={cn(
                      'h-14 w-14 rounded-2xl flex items-center justify-center transition-colors duration-300',
                      service.colorClass
                    )}
                  >
                    <service.icon className="h-7 w-7" />
                  </div>
                  <div className="bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                    <span className="text-sm font-bold text-slate-700">
                      {service.price}
                    </span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-500 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>

                <div className="mt-auto">
                  <div className="w-full h-px bg-slate-100 mb-4" />
                  <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-xs font-medium text-slate-600"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full justify-between hover:bg-slate-50 group/btn border border-slate-200"
                  >
                    Book Service
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover/btn:translate-x-1 group-hover/btn:text-blue-600 transition-all" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              The Paradeep Online Difference
            </h2>
            <p className="text-slate-500 text-lg">
              We don't just fix computers; we build trust. Here is why thousands
              of locals choose us.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA Section - Dark Card Style */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-3xl bg-slate-900 px-6 py-16 sm:px-12 sm:py-20 md:py-24 overflow-hidden text-center shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30">
              <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-500 rounded-full blur-[80px]"></div>
              <div className="absolute left-0 bottom-0 translate-y-12 -translate-x-12 w-64 h-64 bg-purple-500 rounded-full blur-[80px]"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Computer Acting Up?
              </h2>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                Don't let tech issues slow you down. Get a free quote today and
                let our experts handle the rest.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white hover:text-slate-900 h-12 px-8 backdrop-blur-sm"
                  asChild
                >
                  <a href="tel:+919876543210">
                    <Phone className="mr-2 h-5 w-5" />
                    Call +91 98765 43210
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white hover:text-slate-900 h-12 px-8 backdrop-blur-sm"
                  asChild
                >
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="mr-2 h-5 w-5" />
                    WhatsApp Chat
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
