import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#01a952]">
      <div className="flex items-center justify-between py-2 px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">🎉 Grand Opening! Join us for special offers!</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
