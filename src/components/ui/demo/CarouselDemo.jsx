import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import instance from '../../../axiosConfig/instance';
import { Button } from '@/components/ui/button';

export function CarouselDemo() {
  const [moviesList, setMoviesList] = useState([]);
  // const [randomPage, setRandomPage] = useState(Math.ceil(Math.random() * 40));
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  // get movie
  const getmovie = async () => {
    await instance
      .get('movie/popular', { params: { page: 3 } })
      .then((res) => {
        setMoviesList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getmovie();
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className='flex justify-center items-center mt-2  '>
      <Carousel
        className='overflow-hidden'
        setApi={ setApi }
        opts={ { loop: true } }
      >
        <CarouselContent>
          { moviesList.map((movie, index) => (
            <CarouselItem key={ index }>
              <div className=''>
                <Card className='border-0'>
                  <CardContent className='flex justify-center items-center'>
                    <img
                      className='md:h-[90vh] h-[35vh]  mx-auto w-full '
                      src={ `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }
                      // src={`https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg`}
                      alt='home'
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )) }
        </CarouselContent>
        <CarouselPrevious
          onClick={ () => {
            api.scrollTo(current - 1);
          } }
        />
        <CarouselNext
          onClick={ () => {
            api.scrollTo(current + 1);
          } }
        />
      </Carousel>
    </div>
  );
}
