import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider, DirectionProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import App from './App';
import './i18n/config';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './styles/global.css';

const theme = createTheme({
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  headings: {
    fontFamily: 'Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: '700',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <DirectionProvider>
          <Notifications />
          <App />
        </DirectionProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
