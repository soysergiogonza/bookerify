import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Hero.css';

import { HeroSlides } from '@/libs/hero-slides';
import { Autoplay, Navigation, Pagination, Parallax } from 'swiper/modules';

export const Hero = () => {
 return (
  <>
   <Swiper
    style={{
     '--swiper-navigation-color': '#FFFFFF',
     '--swiper-pagination-color': '#FFFFFF',
    }}
    speed={600}
    spaceBetween={30}
    parallax={true}
    pagination={{
     clickable: true,
     dynamicBullets: true,
    }}
    loop={true}
    navigation={true}
    autoplay={{
     delay: 2500,
     disableOnInteraction: false,
    }}
    modules={[Autoplay, Parallax, Pagination, Navigation]}
    className='mySwiper'
   >
    <div
     slot='container-start'
     className='parallax-bg'
     data-swiper-parallax='-23%'
    />
    {HeroSlides.map(({ image, title, content }) => (
     <SwiperSlide
      key={image}
      style={{
       backgroundImage: `url(${image})`,
       backgroundPosition: 'center',
       backgroundSize: 'cover',
       width: 'auto',
       height: 'calc(100vh - 80px)',
      }}
     >
      <div className='title' data-swiper-parallax='-300'>
       {title}
      </div>
      <div className='subtitle' data-swiper-parallax='-200'>
       {content}
      </div>
      <div className='text' data-swiper-parallax='-100'>
       <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum
        mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo
        vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet
        magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit
        lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula
        nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non
        eros quis feugiat.
       </p>
      </div>
     </SwiperSlide>
    ))}
   </Swiper>
  </>
 );
};
