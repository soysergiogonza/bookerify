'use client';

import { Hero, OurServices } from '@/sections';
import { Opinions } from '@/sections/Opinions';
import { PricingPlans } from '@/sections/PricingPlans';
import { WhatWeDo } from '@/sections/WhatWeDo';
import styles from './page.module.css';

export default function Home() {
 return (
  <main className='w-3/4 m-auto text-white'>
   <Hero />
   {/*<WhatWeDo />*/}
   {/*<OurServices />*/}
   <PricingPlans />
   <Opinions />
  </main>
 );
}
