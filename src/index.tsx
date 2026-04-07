import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // <--- Remova o 'src/' daqui, pois ele já está na pasta src!
import App from './App'; // <--- Se o App.tsx também estiver na src, use './App'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);