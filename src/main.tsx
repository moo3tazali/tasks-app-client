// Import CSS
import 'unfonts.css';
import './index.css';

import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './app';

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
