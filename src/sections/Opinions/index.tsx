import Image from 'next/image';
import React, { useState } from 'react';

type Testimonial = {
 id: number;
 name: string;
 role: string;
 content: string;
 avatar: string;
};

const testimonials: Testimonial[] = [
 {
  id: 1,
  name: 'Adam Richman',
  role: 'Founder, Animatix',
  content:
   "It was a pleasure meeting you this past weekend. I appreciate all you shared and can't wait to review the Ecology of Commerce. I'll come see you again soon! Their website was easy to use, payment options very good. The estimated delivery window, on the day of my choice was very accurate, with actual time being updated by tracking my order.",
  avatar: '/placeholder.svg?height=80&width=80',
 },
 {
  id: 2,
  name: 'Jane Doe',
  role: 'CEO, TechCorp',
  content:
   "I've been consistently impressed with the quality of service and products. The attention to detail and customer-first approach sets them apart from competitors.",
  avatar: '/placeholder.svg?height=80&width=80',
 },
 {
  id: 3,
  name: 'John Smith',
  role: 'Marketing Director, InnovateCo',
  content:
   'Working with this team has been a game-changer for our business. Their innovative solutions and responsive support have helped us achieve our goals faster than we thought possible.',
  avatar: '/placeholder.svg?height=80&width=80',
 },
];

export const Opinions = () => {
 const [currentTestimonial, setCurrentTestimonial] = useState(0);

 const nextTestimonial = () => {
  setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
 };

 const prevTestimonial = () => {
  setCurrentTestimonial(
   (prev) => (prev - 1 + testimonials.length) % testimonials.length,
  );
 };

 return (
  <section className='relative py-16 overflow-hidden'>
   <div className='absolute top-0 left-0 w-64 h-64 bg-pink-100 rounded-full -translate-x-1/2 -translate-y-1/2' />
   <div className='absolute bottom-0 right-0 w-64 h-64 bg-yellow-100 rounded-full translate-x-1/3 translate-y-1/3' />
   <div className='absolute top-1/2 left-8 w-8 h-8 bg-red-400 rounded-full' />
   <div className='absolute bottom-1/4 right-8 w-8 h-8 bg-blue-400 rounded-full' />
   <div className='absolute top-1/4 right-1/4 w-12 h-12 bg-yellow-400 rounded-full' />

   <div className='container mx-auto px-4 relative z-10'>
    <div className='text-center mb-12'>
     <h2 className='text-4xl font-bold text-gray-800 mb-2'>
      What Our Clients Are Saying
     </h2>
     <p className='text-xl text-red-500'>Clients</p>
    </div>

    <div className='max-w-4xl mx-auto'>
     <div className='bg-white p-8 rounded-lg shadow-lg'>
      <div className='flex justify-center mb-6'>
       <Image
        src={testimonials[currentTestimonial].avatar}
        alt={testimonials[currentTestimonial].name}
        width={80}
        height={80}
        className='rounded-full'
       />
      </div>
      <blockquote className='text-center text-gray-700 mb-6'>
       "{testimonials[currentTestimonial].content}"
      </blockquote>
      <div className='text-center'>
       <p className='font-semibold text-gray-800'>
        {testimonials[currentTestimonial].name}
       </p>
       <p className='text-gray-600'>{testimonials[currentTestimonial].role}</p>
      </div>
     </div>
    </div>

    <div className='flex justify-center mt-8 space-x-2'>
     {testimonials.map((_, index) => (
      <button
       type='button'
       key={index}
       onClick={() => setCurrentTestimonial(index)}
       className={`w-3 h-3 rounded-full ${
        index === currentTestimonial ? 'bg-red-500' : 'bg-gray-300'
       }`}
       aria-label={`Go to testimonial ${index + 1}`}
      />
     ))}
    </div>
   </div>
  </section>
 );
};
