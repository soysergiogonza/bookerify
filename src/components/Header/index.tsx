import { NavLink } from '@/components/NavLink';
import { dashboardPages, pages } from '@/libs/routes';
import { authOptions } from '@/utils';
import Logo from '@assets/Logo.svg';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export const Header = async () => {
 const session = await getServerSession(authOptions);

 return (
  <header className='sticky top-0 z-20 shadow-lg shadow-cyan-500/50 bg-cyan-50'>
   <nav className='flex justify-between items-center p-4'>
    <Link href='/' className='w-40'>
     <Image className='w-full' src={Logo} alt='Logo' width={50} height={50} />
    </Link>
    {!session?.user ? (
     <ul className='flex justify-between items-center'>
      {pages.map(({ url, name }) => (
       <NavLink url={url} name={name} key={name} />
      ))}
     </ul>
    ) : (
     <ul>
      {dashboardPages.map(({ url, name }) => (
       <NavLink url={url} name={name} key={name} />
      ))}
     </ul>
    )}
   </nav>
  </header>
 );
};
