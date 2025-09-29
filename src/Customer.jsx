import { useState } from "react";

export default function Customer() {
  // Contoh data menu (bisa diganti dengan data dari Supabase / API)
  const [menu] = useState([
    { id: 1, nama: "Es Teh", gambar: "/img/esteh.jpg" },
    { id: 2, nama: "Kopi Hitam", gambar: "/img/kopi.jpg" },
    { id: 3, nama: "Nasi Goreng", gambar: "/img/nasigoreng.jpg" },
  ]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>🍽️ Rajawali Caffe - Menu</h1>
      <p style={{ textAlign: "center" }}>
        Selamat datang! Silakan pilih menu favorit Anda.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {menu.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={item.gambar}
              alt={item.nama}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3 style={{ marginTop: "10px" }}>{item.nama}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
