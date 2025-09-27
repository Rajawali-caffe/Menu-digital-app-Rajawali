import React, { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"

export default function App() {
  const [menus, setMenus] = useState([])

  useEffect(() => {
    fetchMenus()
  }, [])

  async function fetchMenus() {
    const { data, error } = await supabase.from("menus").select("*")
    if (error) console.error(error)
    else setMenus(data)
  }

  return (
    <div className="container">
      <h1>🍽️ Daftar Menu</h1>
      {menus.map((m) => (
        <div key={m.id} style={{ marginBottom: "16px" }}>
          {m.image_url && <img src={m.image_url} alt={m.name} width="100%" />}
          <h3>{m.name}</h3>
          <p>Harga: Rp {m.price}</p>
        </div>
      ))}
    </div>
  )
}
