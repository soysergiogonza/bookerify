import { testimonials } from '@/libs';
import useEmblaCarousel from 'embla-carousel-react';

export const Testimonials = () => {
 const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

 return (
     <div className='container relative '>
      <div className='text-center mb-12'>
       <h2 className='text-4xl font-bold text-white mb-2'>
        Opiniones de nuestros clientes
       </h2>
      </div>
      <div className='overflow-hidden max-w-2xl m-auto' ref={emblaRef}>
       <div className='flex gap-4'  >
        {testimonials.map((testimonial) => (
            <div className='flex-[0_0_100%] border-2 border-white rounded-2xl' key={testimonial.id} >
             <div className='overflow-hidden  '>
              <div
                  className="text-white p-8 relative"
              >
               <h3 className='text-3xl font-bold mb-2'>{testimonial.name}</h3>
               <p className='text-base'>
                {testimonial.content}
               </p>
              </div>
             </div>
            </div>
        ))}
       </div>
      </div>
     </div>
 );
};
