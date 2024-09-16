'use client';

import { Hero, OurServices } from '@/sections';
import { Testimonials } from '@/sections';
import { PricingPlans } from '@/sections/PricingPlans';
import { WhatWeDo } from '@/sections/WhatWeDo';

export default function Home() {
 return (
  <main className='w-3/4 m-auto text-white flex flex-col gap-16'>
   <Hero />
   <WhatWeDo />
   <OurServices />
   <PricingPlans />
   <Testimonials />
  </main>
 );
}
