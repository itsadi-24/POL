import { useState, useEffect } from "react";
import { Save, Plus, X, GripVertical, Pencil } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
    headlines: [] as string[],
  });

  const [saving, setSaving] = useState(false);
  const [newHeadline, setNewHeadline] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

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

  const handleAddHeadline = () => {
    if (newHeadline.trim()) {
      setSettings((prev) => ({
        ...prev,
        headlines: [...prev.headlines, newHeadline.trim()],
      }));
      setNewHeadline("");
    }
  };

  const handleDeleteHeadline = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      headlines: prev.headlines.filter((_, i) => i !== index),
    }));
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditingText(settings.headlines[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && editingText.trim()) {
      setSettings((prev) => ({
        ...prev,
        headlines: prev.headlines.map((h, i) => 
          i === editingIndex ? editingText.trim() : h
        ),
      }));
      setEditingIndex(null);
      setEditingText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  const handleMoveHeadline = (index: number, direction: 'up' | 'down') => {
    const newHeadlines = [...settings.headlines];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newHeadlines.length) {
      [newHeadlines[index], newHeadlines[newIndex]] = [newHeadlines[newIndex], newHeadlines[index]];
      setSettings((prev) => ({
        ...prev,
        headlines: newHeadlines,
      }));
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

      {/* Headlines Management */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Scrolling Headlines</CardTitle>
          <CardDescription>
            Manage the messages that appear in the scrolling headline banner
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Headline */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter a new headline (e.g., 🔥 Special offer: 20% off!)"
              value={newHeadline}
              onChange={(e) => setNewHeadline(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddHeadline()}
              className="flex-1"
            />
            <Button onClick={handleAddHeadline} className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>

          {/* Headlines List */}
          <div className="space-y-2">
            {settings.headlines.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No headlines added yet. Add your first headline above.
              </p>
            ) : (
              settings.headlines.map((headline, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200"
                >
                  {/* Drag Handle */}
                  <div className="flex flex-col gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0"
                      onClick={() => handleMoveHeadline(index, 'up')}
                      disabled={index === 0}
                    >
                      <GripVertical className="h-3 w-3 rotate-180" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0"
                      onClick={() => handleMoveHeadline(index, 'down')}
                      disabled={index === settings.headlines.length - 1}
                    >
                      <GripVertical className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Headline Text or Edit Field */}
                  {editingIndex === index ? (
                    <Input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      className="flex-1"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1 text-sm">{headline}</span>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-1">
                    {editingIndex === index ? (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-600 hover:text-green-700"
                          onClick={handleSaveEdit}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-600 hover:text-slate-700"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:text-blue-700"
                          onClick={() => handleStartEdit(index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteHeadline(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

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
