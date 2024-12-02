'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-4">La página que buscas no existe.</p>
        <Link 
          href="/dashboard"
          className="text-indigo-600 hover:text-indigo-500"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
} 