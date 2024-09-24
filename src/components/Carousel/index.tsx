'use client';

import type {
 EmblaCarouselType,
 EmblaEventType,
 EmblaOptionsType,
} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

const TWEEN_FACTOR_BASE = 0.2;
const AUTOPLAY_INTERVAL = 3000;

interface SlideType {
 slides: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [x: string]: any;
  img: string;
  title: string;
 }[];
 options?: EmblaOptionsType;
}

interface Slides {
 img: string;
 title: string;
}

export const EmblaCarousel = ({ slides, options }: SlideType) => {
 const [emblaRef, emblaApi] = useEmblaCarousel(options);
 const tweenFactor = useRef(0);
 const tweenNodes = useRef<HTMLElement[]>([]);
 const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

 const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
  tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
   return slideNode.querySelector('.embla__parallax__layer') as HTMLElement;
  });
 }, []);

 const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
  tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
 }, []);

 const tweenParallax = useCallback(
  (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
   const engine = emblaApi.internalEngine();
   const scrollProgress = emblaApi.scrollProgress();
   const slidesInView = emblaApi.slidesInView();
   const isScrollEvent = eventName === 'scroll';

   emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
    let diffToTarget = scrollSnap - scrollProgress;
    const slidesInSnap = engine.slideRegistry[snapIndex];

    for (const slideIndex of slidesInSnap) {
     if (isScrollEvent && !slidesInView.includes(slideIndex)) continue;

     if (engine.options.loop) {
      for (const loopItem of engine.slideLooper.loopPoints) {
       const target = loopItem.target();

       if (slideIndex === loopItem.index && target !== 0) {
        const sign = Math.sign(target);

        if (sign === -1) {
         diffToTarget = scrollSnap - (1 + scrollProgress);
        }
        if (sign === 1) {
         diffToTarget = scrollSnap + (1 - scrollProgress);
        }
       }
      }
     }

     const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
     const tweenNode = tweenNodes.current[slideIndex];
     tweenNode.style.transform = `translateX(${translate}%)`;
    }
   });
  },
  [],
 );

 const autoplay = useCallback(() => {
  if (!emblaApi) return;

  autoplayIntervalRef.current = setInterval(() => {
   if (emblaApi.canScrollNext()) {
    emblaApi.scrollNext();
   } else {
    emblaApi.scrollTo(0);
   }
  }, AUTOPLAY_INTERVAL);
 }, [emblaApi]);

 useEffect(() => {
  if (!emblaApi) return;

  setTweenNodes(emblaApi);
  setTweenFactor(emblaApi);
  tweenParallax(emblaApi);
  autoplay();

  emblaApi
   .on('reInit', setTweenNodes)
   .on('reInit', setTweenFactor)
   .on('reInit', tweenParallax)
   .on('scroll', tweenParallax)
   .on('slideFocus', tweenParallax);

  return () => {
   if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  };
 }, [emblaApi, tweenParallax, autoplay, setTweenNodes, setTweenFactor]);

 return (
  <div className='max-w-lg mt-4 md:mt-16 mx-auto'>
   <div className='overflow-hidden' ref={emblaRef}>
    <div className='flex -ml-4 touch-pan-y touch-pinch-zoom'>
     {slides.map(({ img, title }: Slides) => (
      <picture
       className='transform translate-z-0 flex-[0_0_80%] min-w-0 pl-4'
       key={title}
      >
       <div className='h-[8rem] md:h-[12rem] overflow-hidden rounded-[1.8rem]'>
        <div className='relative flex justify-center h-full w-full embla__parallax__layer'>
         <Image
          className='block w-full h-full object-cover rounded-[1.8rem] '
          src={img}
          alt={title}
          width={32}
          height={32}
         />
         <span className='absolute z-20 text-white bottom-4 left-10 text-3xl font-bold bg-gray-400 bg-opacity-50 px-2'>
          {title}
         </span>
        </div>
       </div>
      </picture>
     ))}
    </div>
   </div>
  </div>
 );
};
