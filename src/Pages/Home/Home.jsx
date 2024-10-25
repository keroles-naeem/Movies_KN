import { CarouselDemo } from './../../components/ui/demo/CarouselDemo';
import { Slider } from '@/components/ui/demo/Slider';
import Moviewall from '@/components/MovieWall/Moviewall';

export default function Home() {
  return (
    <>
      <div className='px-12'>
        <CarouselDemo></CarouselDemo>
        <Slider pageNumber='4' title='Fan favorites'></Slider>
        <Slider pageNumber='2' title='Action & Adventure'></Slider>
        <Moviewall />
      </div>
    </>
  );
}
