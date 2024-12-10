interface GeneralTabProps {
  formData: UserFormData;
  isAdminUser: boolean;
  hasChanges: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancel: () => void;
  updateUserMutation: any;
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
  const isUpdating = updateUserMutation.isPending;

  const inputClassName = (disabled: boolean) => `
    mt-1 
    block 
    w-full 
    rounded-md 
    px-3 
    py-2 
    text-sm
    border
    ${disabled 
      ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed' 
      : 'bg-white border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
    }
    transition-colors
    duration-200
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isUpdating || isAdminUser}
            className={inputClassName(isUpdating || isAdminUser)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apellido
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            disabled={isUpdating || isAdminUser}
            className={inputClassName(isUpdating || isAdminUser)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Segundo Apellido
          </label>
          <input
            type="text"
            name="second_lastname"
            value={formData.second_lastname}
            onChange={handleInputChange}
            disabled={isUpdating || isAdminUser}
            className={inputClassName(isUpdating || isAdminUser)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled={true}
            className={inputClassName(true)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {hasChanges && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isUpdating}
            className={`px-4 py-2 text-sm font-medium rounded-md
              ${isUpdating 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors duration-200`}
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={!hasChanges || isUpdating || isAdminUser}
          className={`px-4 py-2 text-sm font-medium text-white rounded-md 
            ${!hasChanges || isUpdating || isAdminUser 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors duration-200`}
        >
          {isUpdating ? (
            <span className="flex items-center gap-2">
              <svg 
                className="animate-spin h-4 w-4" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Actualizando...
            </span>
          ) : (
            'Actualizar'
          )}
        </button>
      </div>
    </form>
  );
}; 