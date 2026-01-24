import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollingHeadline } from "./ScrollingHeadline";
import { Sidebar } from "./Sidebar";
import { useSettings } from "@/contexts/SettingsContext";

const MainLayout = () => {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollingHeadline enabled={settings?.showScrollingHeadline ?? true} />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Sidebar enabled={settings?.showSidebar ?? true} />
    </div>
  );
};

export default MainLayout;
