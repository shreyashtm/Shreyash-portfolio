import React from 'react';
import ReactDOM from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/global.css';
import App from './App';

// Register GSAP plugins globally once to prevent duplicate initialization in React Strict Mode
gsap.registerPlugin(ScrollTrigger);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
