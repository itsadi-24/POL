import { Link } from 'react-router-dom';
import {
  Wrench,
  Monitor,
  Cpu,
  Truck,
  HardDrive,
  Network,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: Wrench,
    title: 'Hardware Repair',
    description:
      'Expert diagnosis for motherboard issues, broken screens, and physical damage.',
    // Using specific color accents for each service
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50 group-hover:bg-blue-600',
    borderClass: 'group-hover:border-blue-100',
  },
  {
    icon: Monitor,
    title: 'Software Services',
    description:
      'OS installation, drivers update, virus removal, and performance optimization.',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50 group-hover:bg-emerald-600',
    borderClass: 'group-hover:border-emerald-100',
  },
  {
    icon: Cpu,
    title: 'Custom Builds',
    description:
      'Tailor-made PC builds for high-end gaming, video editing, or office work.',
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-50 group-hover:bg-purple-600',
    borderClass: 'group-hover:border-purple-100',
  },
  {
    icon: Truck,
    title: 'On-site Support',
    description:
      'We come to you. Professional on-site repairs for homes and offices.',
    colorClass: 'text-orange-600',
    bgClass: 'bg-orange-50 group-hover:bg-orange-600',
    borderClass: 'group-hover:border-orange-100',
  },
  {
    icon: HardDrive,
    title: 'Data Recovery',
    description:
      'Advanced recovery techniques for damaged HDDs, SSDs, and corrupted files.',
    colorClass: 'text-rose-600',
    bgClass: 'bg-rose-50 group-hover:bg-rose-600',
    borderClass: 'group-hover:border-rose-100',
  },
  {
    icon: Network,
    title: 'Network Setup',
    description:
      'Router configuration, LAN/WAN setup, and security implementation.',
    colorClass: 'text-cyan-600',
    bgClass: 'bg-cyan-50 group-hover:bg-cyan-600',
    borderClass: 'group-hover:border-cyan-100',
  },
];

export function ServicesHighlight() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Grid Pattern - Adds Tech Feel */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      {/* <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:32px_32px]"></div> */}

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-white px-3 py-1 text-sm font-medium text-primary shadow-sm mb-6">
            Our Expertise
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Comprehensive IT Solutions
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            We don't just fix computers; we optimize your digital life. Choose a
            service below to get started.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to="/services"
              className={cn(
                'group relative p-8 bg-white rounded-2xl border border-slate-200',
                'hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1',
                'transition-all duration-300 ease-out',
                service.borderClass // Adds a subtle colored border on hover
              )}
            >
              {/* Icon Container with Transition */}
              <div
                className={cn(
                  'h-14 w-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300',
                  service.bgClass
                )}
              >
                <service.icon
                  className={cn(
                    'h-7 w-7 transition-colors duration-300',
                    service.colorClass,
                    'group-hover:text-white' // Icon turns white on hover
                  )}
                />
              </div>

              {/* Text Content */}
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              <p className="text-slate-500 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Call to Action with Slide Animation */}
              <div className="flex items-center text-sm font-semibold text-primary">
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                  View Details
                </span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
