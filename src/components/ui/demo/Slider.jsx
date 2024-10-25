import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import instance from '../../../axiosConfig/instance';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export function Slider({ pageNumber, title }) {
  const navigate = useNavigate();
  const [moviesList, setMoviesList] = useState([]);
  const modeState = useSelector((state) => state.mode.mode);
  const loader = useSelector((state) => state.loader.loader);

  // get movie
  const getmovie = async () => {
    await instance
      .get('movie/popular', { params: { page: pageNumber } })
      .then((res) => {
        setMoviesList(res.data.results.slice(4,));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getmovie();
  }, []);

  // to details of movie
  const toDetails = (id) => {
    navigate(`/details/${id}`);
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
    {
      loader?(
        <div className = 'flex justify-center items-center w-full h-[85vh]' >
          <CircularProgress />
        </div>
      ) : (
    <div className='flex justify-center flex-col md:my-20 my-5'>
      <div className='flex justify-center'>
        <Carousel
          opts={ {
            align: 'start',
          } }
        >
          <div className='mb-6 flex items-center'>
            <div
              className={ `w-3 rounded-md h-10 ${modeState == 'light' ? 'bg-[#9a90af]' : 'bg-[#00df9a]'
                }` }
            ></div>
            <div className='ms-3   md:text-[25px] font-bold'>{ title }</div>
          </div>
          <CarouselContent>
            { moviesList.map((movie, index) => (
              <CarouselItem
                data-aos="fade-left"
                key={ index }
                className=' lg:w-[22%] md:w-[27%] sm:w-[30%] w-[40%]  md:h-72 '
              >
                <div className='h-full'>
                  <Card className='h-full'>
                    <CardContent className='flex items-center h-full '>
                      <img
                        className='hover:opacity-60 rounded-xl h-full w-full'
                        src={ `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }
                        // src={`https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg`}
                        alt=''
                      />
                      <div
                        onClick={ () => {
                          toDetails(movie.id);
                        } }
                        className='w-full h-full absolute flex justify-center items-center flex-col
                                 bg-black text-white transition duration-1000 
                                   opacity-0 hover:opacity-70 hover:cursor-pointer'
                      >
                        <p className=' text-xl border-b mr-4 '>more</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )) }
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
    </>

      );
}
