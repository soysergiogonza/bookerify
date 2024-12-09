interface GeneralTabProps {
  formData: {
    email: string;
    name: string;
    lastname: string;
    second_lastname: string;
    is_active: boolean;
  };
  isAdminUser: boolean;
  hasChanges: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancel: () => void;
  updateUserMutation: {
    isPending: boolean;
  };
}

export const GeneralTab = ({
  formData,
  isAdminUser,
  hasChanges,
  handleInputChange,
  handleSubmit,
  handleCancel,
  updateUserMutation
}: GeneralTabProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
            disabled
          />
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
              ${isAdminUser ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
            disabled={isAdminUser}
            readOnly={isAdminUser}
          />
        </div>

        {/* Primer Apellido */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primer Apellido
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
              ${isAdminUser ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
            disabled={isAdminUser}
            readOnly={isAdminUser}
          />
        </div>

        {/* Segundo Apellido */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Segundo Apellido
          </label>
          <input
            type="text"
            name="second_lastname"
            value={formData.second_lastname}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 
              ${isAdminUser ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
            disabled={isAdminUser}
            readOnly={isAdminUser}
          />
        </div>

        {/* Usuario Activo */}
        <div className="col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleInputChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={isAdminUser}
            />
            <span className="text-sm font-medium text-gray-700">
              Usuario activo
            </span>
          </label>
        </div>
      </div>

      {/* Botones de acción */}
      {!isAdminUser && (
        <div className="flex justify-end space-x-3 pt-4">
          {hasChanges && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={!hasChanges || updateUserMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      )}
    </form>
  );
}; 