import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/libs/services';
import { iconMap } from '@/utils/icons';

export const OurServices = () => {
 return (
  <section className='relative py-24 px-4'>
   <div className='max-w-7xl mx-auto'>
    {/* Encabezado */}
    <div className='text-center mb-20'>
     <span className='text-sm font-semibold text-indigo-400 tracking-wide uppercase'>
      Servicios Premium
     </span>
     <h2 className='mt-4 text-3xl md:text-5xl font-bold text-white mb-6'>
      Soluciones Diseñadas para tu Éxito
     </h2>
     <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
      Optimiza tu negocio con nuestras herramientas especializadas y servicios personalizados.
     </p>
    </div>

    {/* Grid de servicios */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
     {services.map((service) => (
      <div
       key={service.title}
       className='group relative bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-all duration-300 overflow-hidden'
      >
       {/* Icono con gradiente */}
       <div className='relative z-10 flex items-center justify-center w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600'>
        {iconMap[service.icon]}
       </div>

       {/* Contenido */}
       <h3 className='relative z-10 text-2xl font-bold text-white mb-4'>
        {service.title}
       </h3>
       <p className='relative z-10 text-gray-300'>
        {service.description}
       </p>

       {/* Efecto de hover */}
       <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
       
       {/* Decoración */}
       <div className='absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-2xl' />
      </div>
     ))}
    </div>
   </div>
  </section>
 );
};
