export const theme = {
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      },
      success: {
        light: '#86efac',
        main: '#22c55e',
        dark: '#15803d'
      },
      warning: {
        light: '#fde047',
        main: '#eab308',
        dark: '#a16207'
      },
      error: {
        light: '#fca5a5',
        main: '#ef4444',
        dark: '#b91c1c'
      }
    },
    animation: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    }
  }
  
  export type Theme = typeof theme