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
import { FaEye, FaUserShield, FaSort, FaSortUp, FaSortDown, FaSync, FaTrash, FaSpinner } from 'react-icons/fa';
import { Badge } from '@/components/ui/Badge';
import type { User } from '@/types';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/infrastructure/database/supabase/client';

const columnHelper = createColumnHelper<User>();

export const UserTable = () => {
  const { data: users = [], isLoading, refetch } = useUsersQuery();
  const { mutate: updateUser } = useUserMutation();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const router = useRouter();
  const [rowSelection, setRowSelection] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <div className="px-1">
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={row.original.role_name === 'admin'}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>
      ),
    }),
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
    columnHelper.accessor('is_verified', {
      header: ({ column }) => (
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => column.toggleSorting()}>
          <span>Estado</span>
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? <FaSortUp /> : <FaSortDown />
          ) : (
            <FaSort />
          )}
        </div>
      ),
      cell: ({ row }) => {
        const isVerified = row.original.is_verified;
        return (
          <Badge
            variant={isVerified ? 'green' : 'yellow'}
            className="text-xs px-2 py-1"
          >
            {isVerified ? 'Verificado' : 'Pendiente'}
          </Badge>
        );
      },
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
      cell: info => <span className="text-gray-900">{new Date(info.getValue()).toLocaleDateString()}</span>,
      filterFn: 'includesString',
    }),
  ], []);

  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
      sorting,
      columnFilters,
      rowSelection,
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
    enableRowSelection: true,
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection,
  });

  const handleRefresh = async () => {
    await refetch();
  };

  const handleActionWithSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    console.log('Filas seleccionadas:', selectedRows);
    // Implementar la lógica necesaria
  };

  // Mutation para eliminar usuarios
  const deleteUsersMutation = useMutation({
    mutationFn: async (userIds: string[]) => {
      for (const userId of userIds) {
        const { error } = await supabase.rpc('delete_user', {
          user_id: userId
        });

        if (error) {
          console.error('Error al eliminar usuario:', error);
          throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
      }
    },
    onSuccess: () => {
      const count = Object.keys(rowSelection).length;
      toast.success(
        count > 1
          ? `${count} usuarios eliminados correctamente`
          : 'Usuario eliminado correctamente'
      );
      setRowSelection({});
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      console.error('Error al eliminar usuarios:', error);
      toast.error(error.message || 'Error al eliminar usuarios');
    },
    onSettled: () => {
      setIsDeleting(false);
    }
  });

  // Función para manejar la eliminación
  const handleDelete = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const userIds = selectedRows.map(row => row.original.id);
    
    if (!userIds.length) return;

    // Verificar si hay usuarios admin seleccionados
    const hasAdminUsers = selectedRows.some(row => row.original.role_name === 'admin');
    if (hasAdminUsers) {
      toast.error('No se pueden eliminar usuarios administradores');
      return;
    }

    const confirmMessage = userIds.length > 1
      ? `¿Estás seguro de que deseas eliminar ${userIds.length} usuarios?`
      : '¿Estás seguro de que deseas eliminar este usuario?';

    if (window.confirm(confirmMessage)) {
      setIsDeleting(true);
      try {
        await deleteUsersMutation.mutateAsync(userIds);
      } catch (error) {
        // El error ya se maneja en la mutación
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {Object.keys(rowSelection).length > 0 && (
        <div className="mb-4 p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between shadow-sm">
          <span className="text-sm text-gray-700">
            {Object.keys(rowSelection).length} {Object.keys(rowSelection).length === 1 ? 'usuario seleccionado' : 'usuarios seleccionados'}
          </span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <FaSpinner className="animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <FaTrash />
                Eliminar
              </>
            )}
          </button>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <input
          type="search"
          placeholder="Buscar usuarios..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-[200px]">
            <input
              type="date"
              placeholder="Filtrar por fecha..."
              value={(table.getColumn('created_at')?.getFilterValue() as string) ?? ''}
              onChange={e => table.getColumn('created_at')?.setFilterValue(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-600 hover:text-gray-900"
            title="Refrescar lista"
          >
            <FaSync className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto ring-1 ring-gray-300 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {table.getHeaderGroups().map(headerGroup => (
                headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b border-r border-gray-300 last:border-r-0"
                  >
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </th>
                ))
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id}
                className="hover:bg-gray-50"
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 border-b border-r border-gray-200 last:border-r-0"
                  >
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