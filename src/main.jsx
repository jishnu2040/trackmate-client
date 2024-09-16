import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './ThemeContext';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer from React Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
    <ToastContainer /> {/* Render ToastContainer to manage toasts */}
  </ThemeProvider>
);
