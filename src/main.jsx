import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CustomerMenu from './pages/CustomerMenu'
import AdminLogin from './pages/AdminLogin'
import AdminPanel from './pages/AdminPanel'
import QRPage from './pages/QRPage'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CustomerMenu/>} />
        <Route path='/qr' element={<QRPage/>} />
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin' element={<AdminPanel/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
