import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Check karein path sahi hai
import './index.css'

console.log("Main.tsx load ho rahi hai!");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)