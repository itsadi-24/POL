import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useSettings } from '@/contexts/SettingsContext';

interface ScrollingHeadlineProps {
  enabled?: boolean;
}

export function ScrollingHeadline({ enabled = true }: ScrollingHeadlineProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { settings } = useSettings();

  // Get headlines from settings or use empty array
  const headlines = settings?.headlines || [];

  // Don't show if disabled, not visible, or no headlines
  if (!enabled || !isVisible || headlines.length === 0) return null;

  return (
    <div className="relative overflow-hidden text-blue-900 shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center gap-4">
        {/* Updates Badge */}
        <div className="shrink-0">
          <Badge className="gap-1.5 bg-green-500 text-white shadow-md hover:bg-green-600 hover:shadow-lg transition-all">
            <Zap className="h-3.5 w-3.5 fill-white" />
            <span className="font-semibold">Updates</span>
          </Badge>
        </div>

        {/* Scrolling Content */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-scroll-left whitespace-nowrap flex">
            {[...headlines, ...headlines].map((headline, index) => (
              <span
                key={index}
                className="text-sm font-medium px-8 inline-block text-gray-800 transition-colors"
              >
                {headline}
              </span>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="shrink-0 h-8 w-8 text-gray-600 hover:text-gray-700 hover:bg-gray-100"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
