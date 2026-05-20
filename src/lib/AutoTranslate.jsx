import React, { useState, useEffect } from 'react';
import { useLanguage } from './i18n';

// Memory cache to prevent duplicate calls during the same session
const translationCache = new Map();

let batchQueue = [];
let batchTimeout = null;
let queueProcessors = []; // callbacks to trigger state updates

const processBatch = async (locale, translateTexts) => {
  if (batchQueue.length === 0) return;
  const currentBatch = [...batchQueue];
  const currentProcessors = [...queueProcessors];
  batchQueue = [];
  queueProcessors = [];

  const textsToTranslate = currentBatch.map(item => item.text);
  
  try {
    const results = await translateTexts(textsToTranslate, locale);
    
    // Save to cache and notify components
    currentBatch.forEach((item, index) => {
      const translatedText = results[index] || item.text;
      translationCache.set(item.cacheKey, translatedText);
      try {
        localStorage.setItem(`deepl_cache_${item.cacheKey}`, translatedText);
      } catch (e) {}
      
      currentProcessors[index](translatedText);
    });
  } catch (err) {
    console.warn("AutoTranslate batch error:", err);
    currentProcessors.forEach((processor, index) => {
      processor(currentBatch[index].text); // fallback
    });
  }
};

export const T = ({ children }) => {
  const { locale, translateTexts } = useLanguage();
  const [text, setText] = useState(children);

  useEffect(() => {
    // If the content is not a string, or the language is French (default), don't translate
    if (typeof children !== 'string' || locale === 'fr') {
      setText(children);
      return;
    }

    const cacheKey = `${locale}::${children}`;

    // 1. Check Memory Cache
    if (translationCache.has(cacheKey)) {
      setText(translationCache.get(cacheKey));
      return;
    }

    // 2. Check LocalStorage Cache
    try {
      const stored = localStorage.getItem(`deepl_cache_${cacheKey}`);
      if (stored) {
        translationCache.set(cacheKey, stored);
        setText(stored);
        return;
      }
    } catch (e) {}

    // 3. Add to batch queue
    let isMounted = true;
    
    batchQueue.push({ text: children, cacheKey });
    queueProcessors.push((translatedText) => {
      if (isMounted) setText(translatedText);
    });

    if (batchTimeout) clearTimeout(batchTimeout);
    batchTimeout = setTimeout(() => {
      processBatch(locale, translateTexts);
    }, 50); // 50ms window to batch everything

    return () => {
      isMounted = false;
    };
  }, [children, locale, translateTexts]);

  return <>{text}</>;
};

export const useTText = (originalText) => {
  const { locale, translateTexts } = useLanguage();
  const [text, setText] = useState(originalText);

  useEffect(() => {
    if (typeof originalText !== 'string' || locale === 'fr') {
      setText(originalText);
      return;
    }

    const cacheKey = `${locale}::${originalText}`;

    if (translationCache.has(cacheKey)) {
      setText(translationCache.get(cacheKey));
      return;
    }

    try {
      const stored = localStorage.getItem(`deepl_cache_${cacheKey}`);
      if (stored) {
        translationCache.set(cacheKey, stored);
        setText(stored);
        return;
      }
    } catch (e) {}

    let isMounted = true;
    batchQueue.push({ text: originalText, cacheKey });
    queueProcessors.push((translatedText) => {
      if (isMounted) setText(translatedText);
    });

    if (batchTimeout) clearTimeout(batchTimeout);
    batchTimeout = setTimeout(() => {
      processBatch(locale, translateTexts);
    }, 50);

    return () => {
      isMounted = false;
    };
  }, [originalText, locale, translateTexts]);

  return text;
};
