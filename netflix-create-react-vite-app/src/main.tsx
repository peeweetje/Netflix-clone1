import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../i18n';
import { App } from './app/App';
import { MyListProvider } from './context/myListContext';
import { TanStackDevtools } from '@tanstack/react-devtools';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyListProvider>
        <App />
        <TanStackDevtools />
      </MyListProvider>
    </BrowserRouter>
  </React.StrictMode>
);
