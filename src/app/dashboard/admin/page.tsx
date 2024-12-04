import { AdminRoute } from '@/components/auth/AdminRoute';

export default function AdminPage() {
  return (
    <AdminRoute>
      <div>
        {/* Contenido administrativo */}
        <h1>Panel de Administración</h1>
      </div>
    </AdminRoute>
  );
}
