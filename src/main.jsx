import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './modern.css';
import './kids.css';
import './replay-and-space.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
