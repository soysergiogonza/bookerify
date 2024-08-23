'use client';

import { Hero } from '@/sections';
import styles from './page.module.css';

export default function Home() {
 return (
  <main className={styles.main}>
   <Hero />
  </main>
 );
}
