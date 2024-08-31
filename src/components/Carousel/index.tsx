import type {
 EmblaCarouselType,
 EmblaEventType,
 EmblaOptionsType,
} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import './carousel.css';
import Image from 'next/image';

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
 Math.min(Math.max(number, min), max);

type PropType = {
 slides: number[];
 options?: EmblaOptionsType;
};

export const EmblaCarousel: React.FC<PropType> = (props) => {
 const { slides, options } = props;
 const [emblaRef, emblaApi] = useEmblaCarousel(options);
 const tweenFactor = useRef(0);
 const tweenNodes = useRef<HTMLElement[]>([]);

 const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
  tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
   return slideNode.querySelector('.embla__slide__number') as HTMLElement;
  });
 }, []);

 const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
  tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
 }, []);

 const tweenScale = useCallback(
  (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
   const engine = emblaApi.internalEngine();
   const scrollProgress = emblaApi.scrollProgress();
   const slidesInView = emblaApi.slidesInView();
   const isScrollEvent = eventName === 'scroll';

   emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
    let diffToTarget = scrollSnap - scrollProgress;
    const slidesInSnap = engine.slideRegistry[snapIndex];

    slidesInSnap.forEach((slideIndex) => {
     if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

     if (engine.options.loop) {
      engine.slideLooper.loopPoints.forEach((loopItem) => {
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
      });
     }

     const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
     const scale = numberWithinRange(tweenValue, 0, 1).toString();
     const tweenNode = tweenNodes.current[slideIndex];
     tweenNode.style.transform = `scale(${scale})`;
    });
   });
  },
  [],
 );

 useEffect(() => {
  if (!emblaApi) return;

  setTweenNodes(emblaApi);
  setTweenFactor(emblaApi);
  tweenScale(emblaApi);

  emblaApi
   .on('reInit', setTweenNodes)
   .on('reInit', setTweenFactor)
   .on('reInit', tweenScale)
   .on('scroll', tweenScale)
   .on('slideFocus', tweenScale);
 }, [emblaApi, tweenScale]);

 return (
  <div className='embla'>
   <div className='embla__viewport' ref={emblaRef}>
    <div className='embla__container'>
     {slides.map(({ title, img }) => (
      <picture className='relative embla__slide' key={title}>
       <Image
        src={img}
        className='embla__slide__number'
        width={500}
        height={500}
        alt={title}
       />
       <span className='absolute z-20 text-white bottom-4 left-10 text-3xl font-bold bg-gray-400 bg-opacity-50 px-2'>
        {title}
       </span>
      </picture>
     ))}
    </div>
   </div>
  </div>
 );
};
