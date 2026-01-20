import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Headphones,
  MessageSquare,
  Search,
  Clock,
  Send,
  Phone,
  Mail,
  Ticket,
  LifeBuoy,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How long does a typical repair take?',
    answer:
      "Most repairs are completed within 24-48 hours. Complex repairs like motherboard replacements may take 3-5 business days. We'll provide an estimate when you bring in your device.",
  },
  {
    question: 'Do you offer warranty on repairs?',
    answer:
      "Yes! All our repairs come with a 90-day warranty covering parts and labor. If the same issue occurs within this period, we'll fix it at no additional cost.",
  },
  {
    question: 'Can you recover data from a damaged hard drive?',
    answer:
      'In most cases, yes. Our data recovery service has a high success rate. We provide a free assessment before any recovery attempt.',
  },
  {
    question: 'Do you provide on-site support for businesses?',
    answer:
      'Absolutely! We offer on-site support for businesses including network setup, system maintenance, and emergency repairs.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept cash, all major credit/debit cards, UPI payments, and bank transfers. For businesses, we also offer invoice-based payments.',
  },
  {
    question: 'Can I track the status of my repair?',
    answer:
      'Yes! Use the search bar at the top of this page with your Ticket ID to get real-time status updates on your device.',
  },
];

const Support = () => {
  const { toast } = useToast();
  const [ticketSearch, setTicketSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Support Ticket Created',
      description: 'Ticket #TK-88392 has been sent to your email.',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section: Search Centric */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-[100%] blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <LifeBuoy className="h-4 w-4" />
              <span>24/7 Support Center</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              How can we help you today?
            </h1>

            {/* Ticket Tracking Bar */}
            <div className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-950/20 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto transform hover:scale-[1.01] transition-transform duration-300">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  className="pl-10 h-12 border-0 bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 text-base"
                  placeholder="Enter Ticket Number (e.g. TK-4921)"
                  value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value)}
                />
              </div>
              <Button
                size="lg"
                className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/20"
              >
                Track Status
              </Button>
            </div>
            <p className="mt-4 text-slate-400 text-sm">
              Enter your ticket ID to check repair status or technician notes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Quick Contact Cards (Floating) */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          <ContactCard
            icon={Phone}
            title="Phone Support"
            value="+91 98538 39432"
            sub="Mon-Sat 9am-9pm"
            action="Call Now"
            href="tel:+919853839432"
            color="blue"
          />
          <ContactCard
            icon={Mail}
            title="Email Us"
            value="support@paradip.com"
            sub="Response within 2 hours"
            action="Send Email"
            href="mailto:support@paradiponline.com"
            color="emerald"
          />
          <ContactCard
            icon={Clock}
            title="Live Chat"
            value="WhatsApp Support"
            sub="Average wait: 2 mins"
            action="Start Chat"
            href="https://wa.me/919853839432"
            color="indigo"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* 3. Ticket Form (Main) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Ticket className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-slate-900">
                      Submit a Request
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Fill out the form below for a new repair or inquiry.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        required
                        className="bg-slate-50 border-slate-200 focus:bg-white transition-colors h-11"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="bg-slate-50 border-slate-200 focus:bg-white transition-colors h-11"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="bg-slate-50 border-slate-200 focus:bg-white transition-colors h-11"
                        placeholder="+91..."
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-slate-700">
                        Department
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-50 border-slate-200 h-11">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="repair">
                            Hardware Repair
                          </SelectItem>
                          <SelectItem value="software">
                            Software Issue
                          </SelectItem>
                          <SelectItem value="sales">Product Sales</SelectItem>
                          <SelectItem value="amc">Corporate AMC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-slate-700">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      required
                      className="bg-slate-50 border-slate-200 focus:bg-white transition-colors h-11"
                      placeholder="e.g. Laptop Screen Flickering"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700">
                      Description
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      className="bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none"
                      placeholder="Please describe the issue in detail..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 shadow-lg shadow-slate-900/10"
                    >
                      Submit Ticket <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* 4. FAQ Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                Common Questions
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white border border-slate-200 rounded-xl px-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-blue-600 py-4 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-600/20">
              <h3 className="font-bold text-lg mb-2">Still need help?</h3>
              <p className="text-blue-100 text-sm mb-6">
                Our support team is available Mon-Sat to assist you with any
                technical issues.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50"
                >
                  Call Support
                </Button>
                <Button
                  variant="secondary"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50"
                >
                  Email Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for Contact Cards
function ContactCard({ icon: Icon, title, value, sub, action, href, color }) {
  const colorStyles = {
    blue: 'text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white',
    emerald:
      'text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white',
    indigo:
      'text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white',
  };

  return (
    <a
      href={href}
      className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 border border-slate-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            'h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-300',
            colorStyles[color]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex items-center text-slate-400 group-hover:text-slate-600 text-xs font-medium transition-colors">
          {action} <ArrowRight className="ml-1 h-3 w-3" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
        <p className="font-bold text-slate-800 text-lg mb-1">{value}</p>
        <p className="text-slate-500 text-xs">{sub}</p>
      </div>
    </a>
  );
}

export default Support;
