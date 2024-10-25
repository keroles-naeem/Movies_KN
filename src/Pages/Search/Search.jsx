import instance from '@/axiosConfig/instance';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoSearch } from 'react-icons/io5';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [movieList, setMovieList] = useState([]);
  const loader = useSelector((state) => state.loader.loader);
  const modeState = useSelector((state) => state.mode.mode);
  const navigate = useNavigate();

  // set search value
  const movieName = (e) => {
    setSearchValue(e.target.value);
  };

  // get movie by search
  const getMovieSearch = async () => {
    await instance
      .get('search/movie', { params: { query: searchValue } })
      .then((res) => {
        setMovieList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMovieSearch();
  }, [searchValue]);

  return (
    <div>
      <div className='ps-4 mb-11'>
        {/* input */}
        <div className='flex justify-center mb-9 '>
          <div className='relative w-[60%] mb-1'>
            <input
              type='text'
              value={searchValue}
              maxLength={40}
              placeholder='Search movies'
              className={` w-full px-3 my-10 text-black py-3 border-2
                 ${
                   modeState == 'light'
                     ? 'border-[#9a90af] outline-[#9a90af]'
                     : 'border-[#2fa17d] outline-[#00df9a]'
                 } 
                  `}
              onChange={(e) => {
                movieName(e);
              }}
            />
            <div className='absolute top-0 right-2 my-10 py-3 text-2xl text-black'>
              <IoSearch />
            </div>
          </div>
        </div>
        <div className='flex flex-row flex-wrap justify-center'>
          {/* loader */}
          {loader ? (
            searchValue.length == 0 ? (
              <div></div>
            ) : (
              <div className='w-full'>
                <div className='flex flex-wrap justify-center items-center'>
                  {Array.apply(null, { length: 4 }).map((e, i) => (
                    <Stack
                      className='sm:w-2/4 md:w-1/4 w-full md:px-4 px-12 mb-10'
                      key={i}
                    >
                      <div
                        className={`h-[360px] rounded-lg overflow-hidden ${
                          modeState == 'light' ? 'bg-[#9a90af]' : 'bg-[#108c65]'
                        } `}
                      >
                        <Skeleton variant='rectangular' height={'70%'} />
                        <div className=' space-y-0 flex flex-col items-center'>
                          <Skeleton variant='text' className='w-[40%]' />
                          <Skeleton variant='text' height={100} width={160} />
                        </div>
                      </div>
                    </Stack>
                  ))}
                </div>
              </div>
            )
          ) : (
            // card
            movieList.map(
              (movie) =>
                movie.poster_path &&
                movie.overview && (
                  <div
                    className='sm:w-2/4 md:w-1/4 mb-10 sm:px-3 px-10  text-white cardEffectPerspective'
                    key={movie.id}
                  >
                    <button
                      className={` px-2 py-2 rounded-lg cardEffect ${
                        modeState == 'light'
                          ? 'bg-[#9a90af] text-black'
                          : 'bg-[#15533f]'
                      } `}
                      onClick={() => {
                        navigate(`/details/${movie.id}`);
                        window.scroll({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <CardActionArea>
                        <div
                          gutterBottom
                          component='div'
                          className='h-5 overflow-hidden font-bold '
                        >
                          {movie.title}
                        </div>
                        <CardMedia
                          component='img'
                          height='140'
                          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                          className='h-60 mt-3 w-full rounded-md'
                          alt='green iguana'
                        />
                        <CardContent>
                          <Typography
                            variant='body2'
                            className='h-16 overflow-hidden'
                          >
                            {movie.overview}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </button>
                  </div>
                )
            )
          )}
          {/* result is no movie  */}
          {searchValue.length > 1 && movieList.length == 0 && (
            <div className=' w-full md:text-[32px] sm:text-lg text-[10px] flex-wrap mt-3 my-12 flex flex-col justify-center items-center'>
              <span className='text-red-700 mb-3'>
                There is no movie with this name {' '}
              </span>
              <span>({searchValue})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
