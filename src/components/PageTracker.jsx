import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Skip analytics entirely in development to avoid Firefox's Enhanced Tracking
    // Protection (spoofer.js) blocking the GA script and throwing a module load error.
    if (import.meta.env.DEV) return;

    // Secure integration: The tracking ID must be defined in the .env file
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;

    if (!trackingId) {
      console.warn("Google Analytics tracking ID is missing (VITE_GA_TRACKING_ID). Analytics will not be loaded in this environment.");
      return;
    }

    const initGA = () => {
      // Inject the script dynamically only if we have a valid tracking ID
      if (!document.getElementById("google-analytics-script")) {
        const script = document.createElement("script");
        script.id = "google-analytics-script";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
        
        // Handle adblock blocking gracefully without breaking standard execution
        script.onerror = () => {
          console.warn("Google Analytics script load blocked by browser or adblocker.");
        };
        
        document.head.appendChild(script);

        const inlineScript = document.createElement("script");
        inlineScript.id = "google-analytics-inline";
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
    };

    // Performance Optimization: Defer script loading until browser is idle
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => initGA());
    } else {
      setTimeout(initGA, 1000);
    }
  }, []);

  // Track page views accurately when the user navigates through the React Router
  useEffect(() => {
    if (import.meta.env.DEV) return;

    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    if (trackingId && window.gtag) {
      try {
        window.gtag("event", "page_view", {
          page_path: location.pathname + location.search,
        });
      } catch (err) {
        // Prevent any error if window.gtag is overridden or non-functional due to adblockers
        console.debug("Failed to send page_view event:", err);
      }
    }
  }, [location]);

  return null;
};
