import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function CustomerMenu(){
  const [menu, setMenu] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMenu = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('menu').select('*').order('id', {ascending:true})
    if(error) console.error(error)
    else setMenu(data)
    setLoading(false)
  }

  useEffect(()=>{ fetchMenu() },[])

  return (
    <main className="container">
      <h1 className="text-3xl font-bold mb-6">🍽️ Rajawali Caffe - Menu Digital</h1>
      <div className="mb-4">
        <a className="text-sm text-blue-600" href="/admin/login">Admin? Kelola Menu</a>
      </div>
      {loading ? <p>Loading...</p> : (
        menu.length === 0 ? <p>Menu masih kosong.</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {menu.map(m => (
              <div key={m.id} className="card">
                {m.image_url ? <img src={m.image_url} alt={m.name} className="w-full h-40 object-cover rounded mb-3"/> : <div className="w-full h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">No Image</div>}
                <h3 className="text-lg font-bold">{m.name}</h3>
                <p className="text-green-600 font-semibold">Rp {m.price.toLocaleString('id-ID')}</p>
                <p className="text-sm text-gray-500">{m.category ?? 'Umum'}</p>
              </div>
            ))}
          </div>
        )
      )}
    </main>
  )
}
