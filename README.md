# 🍽️ My Menu App

Aplikasi **Digital Menu** dengan 2 mode:
- **Customer View** → hanya lihat daftar menu + foto.  
- **Admin Panel** → bisa tambah, edit, hapus menu.  

Dibuat dengan **React + Vite** dan **Supabase** untuk database & storage.

---

## 🚀 Demo
- Customer: `https://namaproject.vercel.app/`
- Admin: `https://namaproject.vercel.app/admin-1234`

> ⚠️ Simpan URL admin baik-baik, jangan dibagikan sembarangan.

---

## 📂 Struktur Project
```
my-menu-app/
 ├─ package.json
 ├─ vite.config.js
 ├─ index.html
 ├─ src/
 │   ├─ App.jsx        # Customer menu
 │   ├─ Admin.jsx      # Admin CRUD panel
 │   ├─ main.jsx       # Routing sederhana
 │   └─ index.css
```

---

## ⚙️ Setup Local Development
1. Clone repo:
   ```bash
   git clone https://github.com/username/my-menu-app.git
   cd my-menu-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan lokal:
   ```bash
   npm run dev
   ```

---

## 🔑 Supabase Config
Buat file `.env` di root project:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Lalu, import di `src/lib/supabase.js`.

---

## 📦 Deploy ke Vercel
1. Push project ke GitHub.  
2. Masuk ke [Vercel](https://vercel.com/) → `New Project`.  
3. Hubungkan repo ini.  
4. Settings:  
   - Framework: `Vite`  
   - Build Command: `npm run build`  
   - Output Dir: `dist`  
   - Tambahkan `.env` di Project Settings.  

5. Klik **Deploy** 🎉  

---

## ✨ Features
- Customer:
  - Lihat daftar menu + foto
- Admin:
  - Tambah menu (nama, harga, foto)
  - Hapus menu

---

## 🔒 Security Note
- Admin panel disembunyikan di route khusus: `/admin-1234`.  
- Jika butuh lebih aman → aktifkan **Supabase Auth** + RLS policy.  
