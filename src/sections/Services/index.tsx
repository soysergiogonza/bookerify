import { ServiceCard } from '@/components/ServiceCard';
import { services } from '@/libs/services';
import { iconMap } from '@/utils/icons';

export const OurServices = () => {
 return (
  <section className='py-16 bg-gray-900'>
   <div className='container mx-auto px-4'>
    <h2 className='text-3xl font-bold text-center mb-12 text-white'>
     Por Qué Elegir Nuestros Servicios
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
     {services.map((service) => (
      <ServiceCard
       icon={iconMap[service.icon]}
       title={service.title}
       description={service.description}
       key={service.title}
      />
     ))}
    </div>
   </div>
  </section>
 );
};
