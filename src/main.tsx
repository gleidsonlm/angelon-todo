import React from 'react'
import ReactDOM from 'react-dom/client'
import { Header, Main } from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('body') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <Main />
  </React.StrictMode>,
)
