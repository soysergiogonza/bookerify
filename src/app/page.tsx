'use client';

import { Hero, OurServices } from '@/sections';
import { PricingPlans } from '@/sections/PricingPlans';
import styles from './page.module.css';

export default function Home() {
 return (
  <main className={styles.main}>
   <Hero />
   <OurServices />
   <PricingPlans />
  </main>
 );
}
