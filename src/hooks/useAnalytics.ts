// hooks/useAnalytics.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

export const useAnalytics = () => {
 const router = useRouter();

 useEffect(() => {
  const handleRouteChange = (url: string) => {
   gtag.pageview(url);
  };

  router.events.on('routeChangeComplete', handleRouteChange);
  
  return () => {
   router.events.off('routeChangeComplete', handleRouteChange);
  };
 }, [router.events]);
};

// Property-specific tracking hook
export const usePropertyAnalytics = (propertyName: string, propertyType: string) => {
 useEffect(() => {
  // Track property page view
  gtag.trackPropertyView(propertyName, propertyType);
 }, [propertyName, propertyType]);
};

// Form tracking hook
export const useFormAnalytics = () => {
 const trackFormStart = (formType: 'contact' | 'quote' | 'newsletter') => {
  gtag.event({
   action: 'form_start',
   category: 'Lead Generation',
   label: formType,
  });
 };

 const trackFormSubmit = (formType: 'contact' | 'quote' | 'newsletter', propertyInterest?: string) => {
  gtag.trackFormSubmission(formType, propertyInterest);
 };

 const trackFormError = (formType: string, errorField: string) => {
  gtag.event({
   action: 'form_error',
   category: 'Lead Generation',
   label: `${formType} - ${errorField}`,
  });
 };

 return {
  trackFormStart,
  trackFormSubmit,
  trackFormError,
 };
};