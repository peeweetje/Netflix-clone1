import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../i18n';
import { App } from './app/App';
import { MyListProvider } from './context/myListContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MyListProvider>
        <App />
      </MyListProvider>
    </BrowserRouter>
  </React.StrictMode>
);
