// Google Analytics 4 setup
export const GA_TRACKING_ID = process.env.GOOGLE_ANALYTICS_ID || ''

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track article clicks
export const trackArticleClick = (articleTitle: string, source: string) => {
  event({
    action: 'click',
    category: 'article',
    label: `${source}: ${articleTitle}`,
  })
}

// Track search queries
export const trackSearch = (query: string) => {
  event({
    action: 'search',
    category: 'engagement',
    label: query,
  })
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (command: string, id: string, config?: object) => void
  }
}