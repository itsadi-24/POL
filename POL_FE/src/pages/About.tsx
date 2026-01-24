import { Button } from '@/components/ui/button';
import {
  Users,
  Target,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Linkedin,
  Twitter,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Timeline, TimelineContent, TimelineDot, TimelineItem } from '@/components/ui/timeline';

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '10k+', label: 'Happy Customers' },
  { value: '5k+', label: 'Repairs Done' },
  { value: '500+', label: 'Custom Builds' },
];

const values = [
  {
    icon: Target,
    title: 'Precision First',
    description:
      'We treat every device like our own. Zero compromise on part quality or repair standards.',
  },
  {
    icon: Users,
    title: 'Customer Centric',
    description:
      "We don't speak 'tech jargon'. We explain problems simply and offer transparent solutions.",
  },
  {
    icon: Award,
    title: 'Certified Experts',
    description:
      'Our technicians undergo regular training to stay updated with the latest hardware tech.',
  },
  {
    icon: Clock,
    title: 'Rapid Turnaround',
    description:
      'We know downtime hurts. We aim for same-day diagnosis and quick repairs.',
  },
];

const team = [
  {
    name: 'Rakesh Mohanty',
    role: 'Founder & CEO',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    description:
      'The visionary behind Paradeep Online, with 15+ years of hardware expertise.',
  },
  {
    name: 'Sunita Das',
    role: 'Service Manager',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    description:
      'Ensures every customer ticket is resolved smoothly and on time.',
  },
  {
    name: 'Amit Sahoo',
    role: 'Senior Technician',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    description:
      'Master of chip-level repairs, data recovery, and complex troubleshooting.',
  },
];

const milestones = [
  {
    year: '2010',
    event: 'Founded Paradeep Online Computer Services in a small garage.',
  },
  {
    year: '2013',
    event: 'Expanded operations to include Custom Gaming PC builds.',
  },
  {
    year: '2016',
    event: 'Opened our second major service center in Market Area.',
  },
  {
    year: '2019',
    event: 'Launched dedicated On-site Corporate Support services.',
  },
  {
    year: '2022',
    event: 'Celebrated the milestone of 10,000 satisfied local customers.',
  },
  {
    year: '2024',
    event: 'Launched digital platform for seamless ticket tracking.',
  },
];

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section with Background Pattern */}
      <section className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-blue-300 text-sm font-semibold mb-6 border border-white/10">
            Since 2010
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            We are the <span className="text-blue-500">IT Backbone</span> <br />
            of Paradeep.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            More than just a repair shop. We are a team of passionate
            technologists dedicated to keeping your digital life running
            smoothly.
          </p>
        </div>
      </section>

      {/* 2. Floating Stats Bar (Overlapping) */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center px-4 first:pl-0">
                <p className="font-display text-4xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Our Story (Split Layout) */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-xs">
                <div className="w-8 h-px bg-blue-600"></div>
                Our Story
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                From a small garage to <br />
                <span className="text-blue-600">Odisha's trusted IT hub.</span>
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  Paradeep Online Computer Services started with a simple
                  mission: to provide honest, reliable, and affordable computer
                  services to our community. What began as a one-man repair
                  station has grown into a full-service technology center.
                </p>
                <p>
                  We realized early on that technology can be intimidating.
                  That's why we don't just fix computers; we educate our
                  customers. We believe in transparent pricing, genuine parts,
                  and building relationships that last longer than the devices
                  we repair.
                </p>
              </div>

              <div className="pt-4">
                <Button className="h-12 px-8 bg-slate-900 text-white hover:bg-slate-800">
                  Meet The Team <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Composition */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/5 rounded-2xl transform rotate-3 scale-105"></div>
              <img
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
                alt="Our workshop"
                className="relative rounded-2xl shadow-2xl border border-slate-100 w-full object-cover aspect-[4/3]"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">
                      Award Winning
                    </p>
                    <p className="text-slate-500 text-sm">
                      Best Service Center 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Values Grid */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-slate-500 text-lg">
              Our core values define how we treat our customers and how we do
              business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="group p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-slate-100"
              >
                <div className="h-14 w-14 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <value.icon className="h-7 w-7 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Meet the Experts
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Social Overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="p-2 bg-white rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-white rounded-full hover:bg-blue-400 hover:text-white transition-colors">
                      <Twitter className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-500 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Our Journey
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Timeline>
              {milestones.map((milestone, index) => (
                <TimelineItem
                  key={milestone.year}
                  isLast={index === milestones.length - 1}
                >
                  <TimelineDot />

                  <TimelineContent>
                    <span className="font-display font-bold text-2xl text-blue-600">
                      {milestone.year}
                    </span>
                    <p className="text-slate-700 text-lg leading-relaxed">
                      {milestone.event}
                    </p>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>
      </section>

      {/* 7. Location & Contact */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-2">
              {/* Info Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2">
                  Visit Us
                </span>
                <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">
                  Stop by our Shop
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Address</p>
                      <p className="text-slate-500 text-sm mt-1">
                        Paradeep Online, Unit-1, Vijaya Market
                        <br />
                        Badapadia, Paradeep, Odisha - 754142
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Phone</p>
                      <p className="text-slate-500 text-sm mt-1">
                        +91 98538 39432
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Hours</p>
                      <p className="text-slate-500 text-sm mt-1">
                        Mon - Sat: 9:00 AM - 9:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Side */}
              <div className="h-80 lg:h-auto bg-slate-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3742.772711152472!2d86.661546!3d20.268259!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1a4b620ab7e9df%3A0xdc752602c15e6167!2sParadip%20Online%20Computer%20Services!5e0!3m2!1sen!2sus!4v1766828583554!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
