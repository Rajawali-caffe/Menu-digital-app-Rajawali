import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function AdminPanel(){
  const [user, setUser] = useState(null)
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name:'', price:'', category:'Minuman' })
  const [file, setFile] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    supabase.auth.getUser().then(r => setUser(r.data.user || null))
    fetchMenus()
  },[])

  async function fetchMenus(){
    const { data, error } = await supabase.from('menu').select('*').order('id', {ascending:true})
    if(error) console.error(error)
    else setMenus(data || [])
    setLoading(false)
  }

  async function handleUpload(file){
    if(!file) return null
    const fileName = `${Date.now()}_${file.name.replace(/\s/g,'_')}`
    const { data, error } = await supabase.storage.from('menu-images').upload(fileName, file)
    if(error){ alert('Upload gagal: '+error.message); return null }
    const { data: urlData } = supabase.storage.from('menu-images').getPublicUrl(fileName)
    return urlData.publicUrl
  }

  async function handleSubmit(e){
    e.preventDefault()
    let image_url = null
    if(file) image_url = await handleUpload(file)

    if(editingId){
      const updates = { name: form.name, price: parseInt(form.price), category: form.category }
      if(image_url) updates.image_url = image_url
      await supabase.from('menu').update(updates).eq('id', editingId)
      setEditingId(null)
    } else {
      await supabase.from('menu').insert([{ name: form.name, price: parseInt(form.price), category: form.category, image_url }])
    }

    setForm({ name:'', price:'', category:'Minuman' })
    setFile(null)
    fetchMenus()
  }

  function startEdit(item){
    setEditingId(item.id)
    setForm({ name:item.name, price:item.price, category:item.category || 'Minuman' })
  }

  async function handleDelete(id){
    if(!confirm('Hapus menu?')) return
    await supabase.from('menu').delete().eq('id', id)
    fetchMenus()
  }

  async function handleLogout(){
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  if(!user){
    return (
      <main className="container">
        <p className="text-red-600">Kamu belum login. Silakan <a className="text-blue-600" href="/admin/login">login</a>.</p>
      </main>
    )
  }

  return (
    <main className="container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">⚙️ Admin Panel</h2>
        <div>
          <span className="text-sm mr-3">{user.email}</span>
          <button onClick={handleLogout} className="bg-gray-200 px-3 py-1 rounded">Logout</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input placeholder="Nama menu" className="border p-2" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
          <input placeholder="Harga" className="border p-2" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required/>
          <select className="border p-2" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
            <option>Minuman</option>
            <option>Makanan</option>
          </select>
        </div>
        <div className="mt-3">
          <input type="file" onChange={e=>setFile(e.target.files[0])} />
        </div>
        <div className="mt-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded mr-2" type="submit">{editingId ? 'Simpan' : 'Tambah'}</button>
          {editingId && <button type="button" onClick={()=>{setEditingId(null); setForm({name:'',price:'',category:'Minuman'}); setFile(null)}} className="px-3 py-1">Batal</button>}
        </div>
      </form>

      <h3 className="text-xl mb-2">Daftar Menu</h3>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menus.map(m=> (
            <div key={m.id} className="card flex gap-3">
              {m.image_url ? <img src={m.image_url} className="w-24 h-24 object-cover rounded" alt={m.name}/> : <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">No Image</div>}
              <div>
                <h4 className="font-bold">{m.name}</h4>
                <p className="text-green-600">Rp {m.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{m.category}</p>
                <div className="mt-2">
                  <button onClick={()=>startEdit(m)} className="mr-2 px-3 py-1 bg-yellow-300 rounded">Edit</button>
                  <button onClick={()=>handleDelete(m.id)} className="px-3 py-1 bg-red-400 rounded text-white">Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
