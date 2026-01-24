import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';

import ScrollToTop from './components/ScrollToTop';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

import Home from './pages/Home';
import Sales from './pages/Sales';
import Services from './pages/Services';
import Support from './pages/Support';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import Maintenance from './pages/Maintenance';

import Dashboard from './pages/admin/Dashboard';
import Settings from './pages/admin/Settings';
import Products from './pages/admin/Products';
import Tickets from './pages/admin/Tickets';
import Blogs from './pages/admin/Blogs';
import ServicesManagement from './pages/admin/ServicesManagement';
import Login from './pages/admin/Login';

import PrivacyPolicy from './pages/PrivacyPolicy';

const queryClient = new QueryClient();

function AppRoutes() {
  const { settings, loading } = useSettings();
  const location = useLocation();
  
  // Show loading state while fetching settings
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if in maintenance mode and not on admin route
  const isAdminRoute = location.pathname.startsWith('/admin');
  const inMaintenanceMode = settings?.maintenanceMode && !isAdminRoute;

  if (inMaintenanceMode) {
    return <Maintenance />;
  }

  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/services" element={<Services />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>

      {/* Admin login route */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="services-management" element={<ServicesManagement />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <SettingsProvider>
            <AppRoutes />
            <Toaster />
            <Sonner />
          </SettingsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
