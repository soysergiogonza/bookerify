import { NavLink } from '@/components/NavLink';
import { dashboardPages, pages } from '@/libs/routes';
import { authOptions } from '@/utils';
import Logo from '@assets/Logo.svg';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export const Header = async () => {
 const session = await getServerSession(authOptions);

 return (
  <header className={styles.header}>
   <nav className={styles.nav}>
    <Link href='/' className={styles.logo}>
     <Image src={Logo} alt='Logo' width={50} height={50} />
    </Link>
    {!session?.user ? (
     <ul className={styles.navList}>
      {pages.map(({ url, name }) => (
       <NavLink url={url} name={name} key={name} />
      ))}
     </ul>
    ) : (
     <ul className={styles.loggedItemList}>
      {dashboardPages.map(({ url, name }) => (
       <NavLink url={url} name={name} key={name} />
      ))}
     </ul>
    )}
   </nav>
  </header>
 );
};
