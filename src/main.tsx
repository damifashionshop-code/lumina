import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { LangProvider } from './i18n';
import { SettingsProvider } from './lib/settings';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <LangProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </LangProvider>
    </HashRouter>
  </React.StrictMode>,
);
