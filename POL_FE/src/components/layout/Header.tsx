import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, Lock, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo-paradeep-online.svg';

const ADMIN_PIN = '1234';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Sales', href: '/sales' },
  { name: 'Services', href: '/services' },
  { name: 'Support', href: '/support' },
  { name: 'About Us', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminError, setAdminError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === ADMIN_PIN) {
      setAdminError('');
      setShowAdminPin(false);
      setAdminPin('');
      navigate('/admin');
    } else {
      setAdminError('Wrong PIN');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-blue-100 shadow-sm">
      {/* Top bar with contact info + location */}
      <div className="hidden md:block bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between text-sm">
            {/* Left: contact */}
            <div className="flex items-center gap-6">
              <a
                href="tel:+919853839432"
                className="flex items-center gap-2 hover:text-blue-100 transition-colors font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>+91 987654321</span>
              </a>
              <a
                href="mailto:mail@paradiponline.com"
                className="flex items-center gap-2 hover:text-blue-100 transition-colors font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>mail@paradiponline.com</span>
              </a>
            </div>

            {/* Center: location */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">
                Paradip, Odisha, India - 754142
              </span>
            </div>

            {/* Right: timing */}
            <div className="flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4" />
              <span>Everyday: 9:00 AM - 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center transition-opacity">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Paradeep Online Computer Service – Your Trusted IT Navigator"
                className="h-16 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                  location.pathname === item.href
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700',
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA + Admin (desktop) */}
          <div className="hidden lg:flex items-center gap-3 relative">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transition-all font-semibold">
              Get Support
            </Button>

            {/* Admin trigger */}
            <button
              type="button"
              onClick={() => {
                setShowAdminPin((v) => !v);
                setAdminError('');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Admin</span>
            </button>

            {/* PIN popup */}
            {showAdminPin && (
              <form
                onSubmit={handleAdminSubmit}
                className="absolute right-0 top-12 w-56 rounded-lg border border-blue-200 bg-white shadow-lg px-4 py-3 space-y-2"
              >
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Enter PIN
                </label>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  maxLength={10}
                  autoFocus
                />
                {adminError && (
                  <p className="text-xs font-medium text-red-600">
                    {adminError}
                  </p>
                )}
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminPin(false);
                      setAdminPin('');
                      setAdminError('');
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-md transition-all"
                  >
                    Go
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-blue-100">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200',
                    location.pathname === item.href
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-700 hover:bg-blue-50',
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <Button className="mt-4 bg-green-500 text-white hover:bg-green-600 shadow-md font-semibold">
                Get Support
              </Button>

              {/* Inline PIN for mobile */}
              <form
                onSubmit={handleAdminSubmit}
                className="mt-3 px-4 flex items-center gap-2"
              >
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Admin PIN"
                  maxLength={10}
                />
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 text-white text-sm font-semibold px-4 py-2 hover:bg-blue-700 shadow-md transition-all"
                >
                  Go
                </button>
              </form>
              {adminError && (
                <p className="mt-1 px-4 text-xs font-medium text-red-600">
                  {adminError}
                </p>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
