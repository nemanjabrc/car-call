import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import { store } from './app/store/configureStore.ts';
import { Provider } from 'react-redux';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
  },
  palette: {
    background: {
      default: '#f8f8f8',
    },
  }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
