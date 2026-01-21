import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/contexts/SettingsContext";

const Settings = () => {
  const { toast } = useToast();
  const { settings: globalSettings, loading, updateSettings } = useSettings();
  
  const [settings, setSettings] = useState({
    showScrollingHeadline: true,
    showSidebar: true,
    enableTicketing: true,
    maintenanceMode: false,
  });

  const [saving, setSaving] = useState(false);

  // Load settings from context when available
  useEffect(() => {
    if (globalSettings) {
      setSettings(globalSettings);
    }
  }, [globalSettings]);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(settings);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const featureToggles = [
    {
      key: "showScrollingHeadline" as const,
      title: "Scrolling Headline",
      description: "Show the scrolling news ticker at the top of the page",
    },
    {
      key: "showSidebar" as const,
      title: "Right Sidebar",
      description: "Show the sidebar on applicable pages",
    },
    {
      key: "enableTicketing" as const,
      title: "Support Ticketing",
      description: "Allow customers to create support tickets",
    },
  ];

  const systemToggles = [
    {
      key: "maintenanceMode" as const,
      title: "Maintenance Mode",
      description: "Put the website in maintenance mode (visitors will see a maintenance page)",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage website features and toggles
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2" disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Feature Toggles */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Feature Toggles</CardTitle>
          <CardDescription>
            Enable or disable website features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {featureToggles.map((toggle) => (
            <div
              key={toggle.key}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div className="space-y-0.5">
                <Label htmlFor={toggle.key} className="text-base font-medium">
                  {toggle.title}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {toggle.description}
                </p>
              </div>
              <Switch
                id={toggle.key}
                checked={settings[toggle.key]}
                onCheckedChange={() => handleToggle(toggle.key)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card className="border-0 shadow-sm border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">System Settings</CardTitle>
          <CardDescription>
            Critical system controls - use with caution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {systemToggles.map((toggle) => (
            <div
              key={toggle.key}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div className="space-y-0.5">
                <Label htmlFor={toggle.key} className="text-base font-medium">
                  {toggle.title}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {toggle.description}
                </p>
              </div>
              <Switch
                id={toggle.key}
                checked={settings[toggle.key]}
                onCheckedChange={() => handleToggle(toggle.key)}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
