import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [accepted, setAccepted] = useState<boolean>(true);

  useEffect(() => {
    const consent = localStorage.getItem('amaira_cookie_consent');
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('amaira_cookie_consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md bg-white border border-yellow-200 shadow-2xl rounded-2xl p-5 z-50 flex items-start space-x-3">
      <Cookie className="h-6 w-6 text-yellow-600 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs text-gray-600 space-y-2">
        <p className="font-semibold text-gray-900">We value your privacy</p>
        <p>
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
        </p>
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Accept Cookies
          </button>
        </div>
      </div>
      <button onClick={handleAccept} className="text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CookieBanner;
