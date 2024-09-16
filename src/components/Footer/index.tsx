import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
 return (
  <footer className='bg-gray-900 text-white'>
   <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
     <div className='mb-8 md:mb-0'>
      <h3 className='text-lg font-semibold mb-4'>Sobre Nosotros</h3>
      <p className='text-gray-400'>
       Somos tu solución integral para gestionar reservas de manera eficiente y
       profesional.
      </p>
     </div>
     <div>
      <h3 className='text-lg font-semibold mb-4'>Enlaces Rápidos</h3>
      <ul className='space-y-2'>
       <li>
        <a
         href='#'
         className='text-gray-400 hover:text-white transition-colors'
        >
         Inicio
        </a>
       </li>
       <li>
        <a
         href='#'
         className='text-gray-400 hover:text-white transition-colors'
        >
         Servicios
        </a>
       </li>
       <li>
        <a
         href='#'
         className='text-gray-400 hover:text-white transition-colors'
        >
         Precios
        </a>
       </li>
       <li>
        <a
         href='#'
         className='text-gray-400 hover:text-white transition-colors'
        >
         Contacto
        </a>
       </li>
      </ul>
     </div>
     <div>
      <h3 className='text-lg font-semibold mb-4'>Soporte</h3>
      <ul className='space-y-2'>
       <li>
        <a
         href='#'
         className='text-gray-400 hover:text-white transition-colors'
        >
         FAQ
        </a>
       </li>
       <li>
        <a
         href='#'
         className='text-gray-400 hover:text-white transition-colors'
        >
         Ayuda en Línea
        </a>
       </li>
       <li>
        <a
         href='#'
         className='text-gray-400 hover:text-white transition-colors'
        >
         Tutoriales
        </a>
       </li>
       <li>
        <a
         href='#'
         className='text-gray-400 hover:text-white transition-colors'
        >
         Contáctanos
        </a>
       </li>
      </ul>
     </div>
     <div>
      <h3 className='text-lg font-semibold mb-4'>Contacto</h3>
      <p className='text-gray-400 mb-2'>Email: info@bookerify.com</p>
      <p className='text-gray-400 mb-4'>Teléfono: +57 3008341223</p>
      <div className='flex space-x-4'>
       <a href='#' className='text-gray-400 hover:text-white transition-colors'>
        <FaFacebook size={24} />
        <span className='sr-only'>Facebook</span>
       </a>
       <a href='#' className='text-gray-400 hover:text-white transition-colors'>
        <FaTwitter size={24} />
        <span className='sr-only'>Twitter</span>
       </a>
       <a href='#' className='text-gray-400 hover:text-white transition-colors'>
        <FaInstagram size={24} />
        <span className='sr-only'>Instagram</span>
       </a>
       <a href='#' className='text-gray-400 hover:text-white transition-colors'>
        <FaLinkedin size={24} />
        <span className='sr-only'>LinkedIn</span>
       </a>
      </div>
     </div>
    </div>
    <div className='mt-12 pt-8 border-t border-gray-800 text-center'>
     <p className='text-gray-400'>
      © {new Date().getFullYear()} Bookerify. Todos los derechos reservados.
     </p>
    </div>
   </div>
  </footer>
 );
}
