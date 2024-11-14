import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './ThemeContext';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer from React Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import './index.css';

// Register service worker in production mode
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js') // The location of the service worker
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
    <ToastContainer /> {/* Render ToastContainer to manage toasts */}
  </ThemeProvider>
);
