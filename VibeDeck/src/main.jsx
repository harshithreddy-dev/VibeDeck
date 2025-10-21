// src/main.jsx (or main.tsx)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // <--- Must import App
import './index.css'        // <--- Must import index.css (for Tailwind)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* <--- App component is used here */}
  </React.StrictMode>,
)