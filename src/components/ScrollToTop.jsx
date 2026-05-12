import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is no hash, scroll to top
    if (!hash) {
      window.scrollTo(0, 0);
    } 
    // If there is a hash (anchor link like #intervenants), handle it separately
    else {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname, hash]);

  return null;
};
