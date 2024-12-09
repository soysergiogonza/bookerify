'use client';

import { useUsersQuery, useUserMutation } from '@/store/queries/users';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  createColumnHelper,
  flexRender,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { FaEye, FaUserShield, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Badge } from '@/components/ui/Badge';
import type { User } from '@/types';

const columnHelper = createColumnHelper<User>();

export const UserTable = () => {
  const { data: users = [], isLoading } = useUsersQuery();
  const { mutate: updateUser } = useUserMutation();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const router = useRouter();

  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Nombre</span>
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? <FaSortUp /> : <FaSortDown />
          ) : (
            <FaSort />
          )}
        </div>
      ),
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
      header: ({ column }) => (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Email</span>
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? <FaSortUp /> : <FaSortDown />
          ) : (
            <FaSort />
          )}
        </div>
      ),
      cell: info => <span className="text-gray-500">{info.getValue()}</span>,
    }),
    columnHelper.accessor('role_name', {
      header: ({ column }) => (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Rol</span>
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? <FaSortUp /> : <FaSortDown />
          ) : (
            <FaSort />
          )}
        </div>
      ),
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
      header: ({ column }) => (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Fecha</span>
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? <FaSortUp /> : <FaSortDown />
          ) : (
            <FaSort />
          )}
        </div>
      ),
      cell: info => new Date(info.getValue()).toLocaleDateString(),
      filterFn: 'includesString',
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
      sorting,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
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
      <div className="flex items-center justify-between gap-4">
        <input
          type="search"
          placeholder="Buscar usuarios..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex-1 min-w-[200px]">
          <input
            type="date"
            placeholder="Filtrar por fecha..."
            value={(table.getColumn('created_at')?.getFilterValue() as string) ?? ''}
            onChange={e => table.getColumn('created_at')?.setFilterValue(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="px-2 py-1 border rounded"
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}; 