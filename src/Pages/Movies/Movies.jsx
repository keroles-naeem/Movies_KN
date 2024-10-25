import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../index.css';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoStarSharp } from 'react-icons/io5';
import { IoIosEye } from 'react-icons/io';
import instance from '@/axiosConfig/instance';

export default function Movies() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(1);
  const [moviesList, setMoviesList] = useState([]);
  const loader = useSelector((state) => state.loader.loader);
  const modeState = useSelector((state) => state.mode.mode);

  // get movies
  const getMovies = async () => {
    await instance
      .get('movie/popular', { params: { page: counter } })
      .then((res) => {
        setMoviesList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMovies();
  }, [counter]);

  // To next or prev page
  const toAnotherPage = (e) => {
    e.target.value == 'next'
      ? setCounter(counter + 1)
      : setCounter(counter - 1);
  };

  return (
    <>
      {loader ? (
        <div className='flex justify-center items-center w-full h-[85vh]'>
          <CircularProgress />
        </div>
      ) : (
        <div className='flex justify-center'>
          <div className='flex justify-center flex-col '>
            {/* card */}
            <div className='flex flex-row flex-wrap mt-10 '>
              {moviesList.map(
                (movie) =>
                  movie.poster_path &&
                  movie.overview && (
                    <div
                      data-aos='fade-up'
                      data-aos-delay='200'
                      className='sm:w-2/4 md:w-1/4 px-3 text-white rounded-lg cardEffectPerspective'
                      key={movie.id}
                    >
                      <button
                        className={` px-2 py- rounded-lg cardEffect ${
                          modeState == 'light'
                            ? 'bg-[#9a90af] text-black hover:'
                            : 'bg-[#15533f]'
                        } `}
                        onClick={() => {
                          navigate(`/details/${movie.id}`),
                            window.scroll({ top: 0 });
                        }}
                      >
                        <CardActionArea>
                          <div
                            gutterBottom
                            component='div'
                            className='h-6 overflow-hidden font-bold '
                          >
                            {movie.title}
                          </div>
                          <CardMedia
                            component='img'
                            height='140'
                            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            className='h-60 mt-3 rounded-md '
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
                          <div className='flex justify-between p-3'>
                            <div className='flex justify-center items-center gap-2'>
                              <div>
                                <IoStarSharp className='text-[#ffff00]' />
                              </div>
                              <div>
                                {String(movie.vote_average).slice(0, 3)}
                              </div>
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                              <div>
                                <IoIosEye />
                              </div>
                              <div>
                                <p>{movie.vote_count}</p>
                              </div>
                            </div>
                          </div>
                        </CardActionArea>
                      </button>
                    </div>
                  )
              )}
            </div>
            {/* pagination */}
            <div className='mx-auto flex flex-row justify-center items-center mb-10 mt-2 '>
              <button
                className={`flex justify-center px-10 py-3 rounded-lg  ${
                  modeState == 'light'
                    ? 'bg-[#9a90af] text-black hover:text-white'
                    : 'bg-[#15533f] text-white hover:text-black'
                } 
                    ${
                      counter == 1
                        ? ' cursor-not-allowed !text-[#626565bb]'
                        : ''
                    }`}
                value={'previous'}
                onClick={(e) => {
                  toAnotherPage(e);
                  window.scroll({ top: 0 });
                }}
                disabled={counter == 1}
              >
                prev
              </button>
              <div
                className={`flex justify-center px-4 py-3 mx-5 rounded-lg  ${
                  modeState == 'light'
                    ? 'bg-[#9a90af] text-black'
                    : 'bg-[#15533f] text-white'
                } `}
              >
                {counter}
              </div>
              <button
                className={`flex justify-center px-10 py-3 rounded-lg  ${
                  modeState == 'light'
                    ? 'bg-[#9a90af] text-black hover:text-white'
                    : 'bg-[#15533f] text-white hover:text-black'
                } `}
                value={'next'}
                onClick={(e) => {
                  toAnotherPage(e);
                  window.scroll({ top: 0, behavior: 'smooth' });
                }}
              >
                next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
