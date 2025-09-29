import React from 'react'
export default function MenuCard({item}){
  return (
    <div className="card">
      {item.image_url ? <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover rounded mb-3"/> : <div className="w-full h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">No Image</div>}
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-green-600 font-semibold">Rp {item.price.toLocaleString('id-ID')}</p>
      <p className="text-sm text-gray-500">{item.category ?? 'Umum'}</p>
    </div>
  )
}
