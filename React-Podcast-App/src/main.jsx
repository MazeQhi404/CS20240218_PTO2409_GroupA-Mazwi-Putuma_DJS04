import React from 'react'; // Core React library for building components
import ReactDOM from 'react-dom/client'; // ReactDOM for rendering to the DOM
import App from './App.jsx'; // Main App component
import './App.css'; 

// Renders the App component into the root DOM element

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/*Enables Strict Mode for development checks */}
    <App />
  </React.StrictMode>
);
