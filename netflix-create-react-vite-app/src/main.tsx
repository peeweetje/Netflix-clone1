import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import '../i18n';
import { App } from './app/App';
import { MyListProvider } from './context/myListContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <MyListProvider>
          <App />
        </MyListProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
