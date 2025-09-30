import { useState, useEffect } from "react"
import { supabase } from "./supabaseClient"

export default function AdminPanel() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [message, setMessage] = useState("")
  const [menuList, setMenuList] = useState([])

  // Ambil data dari Supabase saat pertama kali load
  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = async () => {
    const { data, error } = await supabase.from("menu").select("*")
    if (error) {
      console.error(error)
    } else {
      setMenuList(data)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    const { error } = await supabase
      .from("menu")
      .insert([{ name, price }])

    if (error) {
      setMessage("❌ Gagal tambah data: " + error.message)
    } else {
      setMessage("✅ Data berhasil ditambahkan!")
      setName("")
      setPrice("")
      fetchMenu() // refresh list setelah tambah
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Tambah Menu</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Nama Menu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
      {message && <p className="mb-4">{message}</p>}

      <h2 className="text-xl font-bold mb-2">Daftar Menu</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Nama</th>
            <th className="border px-2 py-1">Harga</th>
          </tr>
        </thead>
        <tbody>
          {menuList.map((item) => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.id}</td>
              <td className="border px-2 py-1">{item.name}</td>
              <td className="border px-2 py-1">Rp {item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
