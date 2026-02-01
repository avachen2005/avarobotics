// main.tsx - Application entry point
// Initializes Cognito configuration and renders the React app

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configureCognito } from './auth/cognito';
import { App } from './App';

// Initialize Cognito before rendering
configureCognito();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
