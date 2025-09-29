import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin(){
  const [email, setEmail] = useState('admin@rajawali.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if(error) alert('Login gagal: ' + error.message)
    else navigate('/admin')
  }

  return (
    <main className="container">
      <h2 className="text-2xl font-bold mb-4">🔐 Admin Login</h2>
      <form onSubmit={handleLogin} className="card">
        <label className="block mb-2">Email</label>
        <input className="border p-2 w-full mb-3" value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="block mb-2">Password</label>
        <input type="password" className="border p-2 w-full mb-3" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">{loading ? 'Loading...' : 'Login'}</button>
        <p className="text-sm text-gray-500 mt-3">(Jika belum ada akun, buat user di Supabase Auth → Users)</p>
      </form>
    </main>
  )
}
