import React, { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"

export default function Admin() {
  const [menus, setMenus] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [file, setFile] = useState(null)

  useEffect(() => {
    fetchMenus()
  }, [])

  async function fetchMenus() {
    const { data, error } = await supabase.from("menus").select("*")
    if (error) console.error(error)
    else setMenus(data)
  }

  async function addMenu() {
    let image_url = null
    if (file) {
      const fileName = `${Date.now()}-${file.name}`
      const { data, error: uploadError } = await supabase.storage
        .from("menu-images")
        .upload(fileName, file)
      if (uploadError) {
        console.error(uploadError)
      } else {
        const { data: publicUrl } = supabase.storage
          .from("menu-images")
          .getPublicUrl(fileName)
        image_url = publicUrl.publicUrl
      }
    }

    const { error } = await supabase.from("menus").insert([{ name, price, image_url }])
    if (error) console.error(error)
    setName("")
    setPrice("")
    setFile(null)
    fetchMenus()
  }

  async function deleteMenu(id) {
    const { error } = await supabase.from("menus").delete().eq("id", id)
    if (error) console.error(error)
    fetchMenus()
  }

  return (
    <div className="container">
      <h1>⚙️ Admin Panel</h1>
      <input
        placeholder="Nama menu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={addMenu}>Tambah</button>

      <h2>Daftar Menu</h2>
      {menus.map((m) => (
        <div key={m.id} style={{ marginBottom: "16px" }}>
          {m.image_url && <img src={m.image_url} alt={m.name} width="100%" />}
          <h3>{m.name}</h3>
          <p>Rp {m.price}</p>
          <button onClick={() => deleteMenu(m.id)}>Hapus</button>
        </div>
      ))}
    </div>
  )
}
