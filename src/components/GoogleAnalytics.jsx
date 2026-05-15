import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Secure integration: The tracking ID must be defined in the .env file
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    
    if (!trackingId) {
      console.warn("Google Analytics tracking ID is missing (VITE_GA_TRACKING_ID). Analytics will not be loaded in this environment.");
      return;
    }

    // Inject the script dynamically only if we have a valid tracking ID
    if (!document.getElementById('google-analytics-script')) {
      const script = document.createElement('script');
      script.id = 'google-analytics-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.id = 'google-analytics-inline';
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${trackingId}', {
          send_page_view: false // We will handle page views manually for the SPA
        });
      `;
      document.head.appendChild(inlineScript);
    }
  }, []);

  // Track page views accurately when the user navigates through the React Router
  useEffect(() => {
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (trackingId && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};
