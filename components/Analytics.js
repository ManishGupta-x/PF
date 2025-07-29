"use client";

export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Custom events for your portfolio
export const trackProjectView = (projectName) => {
  trackEvent('project_view', {
    event_category: 'engagement',
    event_label: projectName
  });
};

export const trackSkillView = (skillName) => {
  trackEvent('skill_view', {
    event_category: 'engagement',
    event_label: skillName
  });
};

export const trackContactAttempt = (method) => {
  trackEvent('contact_attempt', {
    event_category: 'lead',
    event_label: method
  });
};