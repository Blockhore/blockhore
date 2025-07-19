import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as buffer from 'buffer';  // <== ini diubah
import App from './App.tsx';
import './index.css';

// Make Buffer available globally for browser compatibility
(window as any).Buffer = buffer.Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
