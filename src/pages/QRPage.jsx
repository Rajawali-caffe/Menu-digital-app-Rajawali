import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'

export default function QRPage(){
  const [qr, setQr] = useState('')
  useEffect(()=>{
    const url = window.location.origin + '/'
    QRCode.toDataURL(url, { width: 300 }).then(setQr).catch(()=>{})
  },[])
  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">QR Menu</h2>
      <p>Scan QR ini untuk membuka menu digital Rajawali Caffe:</p>
      {qr ? <img src={qr} alt="QR Menu" className="mt-4"/> : <p>Generating...</p>}
    </div>
  )
}
