import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './app/app';
import registerServiceWorker from './registerServiceWorker';
import { theme } from './styles/theme';
import './i18n';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
