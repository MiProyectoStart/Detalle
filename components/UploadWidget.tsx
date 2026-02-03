'use client'

//para cargar imagen desde el admin para cloudinary
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function UploadWidget({ onUpload }: { onUpload: (url: string) => void }) {
  const [status, setStatus] = useState("📸 Subir Foto de Fondo");

  return (
    <CldUploadWidget 
      uploadPreset="san_valentin_preset" // preset de Cloudinary
      onSuccess={(result: any) => {
        if (result.event === "success") {
          const url = result.info.secure_url;
          console.log(" Cloudinary URL:", url); 
          setStatus(" Imagen Cargada");
          onUpload(url); // Enviamos la URL al componente padre
        }
      }}
    >
      {({ open }) => (
        <button 
          type="button"
          className="w-full py-2 bg-gray-700 rounded border border-dashed border-gray-500 hover:bg-gray-600 transition text-sm"
          onClick={() => open()}
        >
          {status}
        </button>
      )}
    </CldUploadWidget>
  );
}