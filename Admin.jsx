import { useState } from "react"
import { supabase } from "./supabaseClient"

export default function AdminPanel() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    // Insert ke Supabase
    const { data, error } = await supabase
      .from("menu") // nama tabel harus sama di Supabase
      .insert([{ name, price }])

    if (error) {
      setMessage("❌ Gagal tambah data: " + error.message)
    } else {
      setMessage("✅ Data berhasil ditambahkan!")
      setName("")
      setPrice("")
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Tambah Menu</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
      {message && <p className="mt-2">{message}</p>}
    </div>
  )
}
