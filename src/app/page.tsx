'use client';

import { Hero, OurServices, Testimonials, PricingPlans, WhatWeDo } from '@/components/sections';

export default function Home() {
 return (
  <main className='min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900'>
   <div className='max-w-7xl mx-auto'>
    <Hero />
    <WhatWeDo />
    <OurServices />
    <PricingPlans />
    <Testimonials />
   </div>
  </main>
 );
}
