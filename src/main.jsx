import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Weather} from './Weather.jsx'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Weather />
  </StrictMode>,
)
