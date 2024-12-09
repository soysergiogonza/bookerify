'use client';

import { useUsersQuery, useUserMutation } from '@/store/queries/users';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import { FaEye, FaUserShield } from 'react-icons/fa';
import { Badge } from '@/components/ui/Badge';
import type { User } from '@/types';

const columnHelper = createColumnHelper<User>();

export const UserTable = () => {
  const { data: users = [], isLoading } = useUsersQuery();
  const { mutate: updateUser } = useUserMutation();
  const [globalFilter, setGlobalFilter] = useState('');
  const router = useRouter();

  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: 'Nombre',
      cell: ({ row }) => {
        const user = row.original;
        const fullName = [
          user.name || '',
          user.lastname || '',
          user.second_lastname || ''
        ].filter(Boolean).join(' ') || 'Sin nombre';
        
        return (
          <div className="flex items-center gap-2">
            {user.role_name === 'admin' && (
              <FaUserShield className="text-blue-500" title="Usuario Administrador" />
            )}
            <span className="font-medium text-gray-900">{fullName}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => <span className="text-gray-500">{info.getValue()}</span>,
    }),
    columnHelper.accessor('role_name', {
      header: 'Rol',
      cell: ({ row }) => {
        const isAdmin = row.original.role_name === 'admin';
        return (
          <Badge
            variant={isAdmin ? 'blue' : 'green'}
            className="text-xs px-2 py-1"
          >
            {isAdmin ? 'Administrador' : 'Cliente'}
          </Badge>
        );
      },
    }),
    columnHelper.accessor('created_at', {
      header: 'Fecha',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => {
        const user = row.original;
        const isAdmin = user.role_name === 'admin';
        
        return (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => router.push(`/dashboard/users/${user.id}`)}
              className="text-blue-600 hover:text-blue-900 transition-colors"
              title="Ver detalles"
            >
              <FaEye className="h-5 w-5" />
            </button>
          </div>
        );
      },
    }),
  ], [router]);

  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <input
          type="search"
          placeholder="Buscar usuarios..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id}
                className={
                  row.original.role_name === 'admin' 
                    ? 'bg-blue-50/50' 
                    : 'hover:bg-gray-50'
                }
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 