import React, { useEffect, useRef, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import instance from '../../axiosConfig/instance';
import { useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { FaPlay } from 'react-icons/fa';
import { IoIosEye } from 'react-icons/io';
import { IoStarSharp } from 'react-icons/io5';

export default function Details() {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [video, setVideo] = useState([]);
  const movie = useLoaderData();
  const mode = useSelector((state) => state.mode.mode);

  // get video fun
  const getVideo = async () => {
    await instance
      .get(`movie/${id}/videos`)
      .then((res) => {
        setVideo(res.data.results[0].key);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get details Cast of movie
  const getCast = async () => {
    await instance
      .get(`movie/${id}/credits`)
      .then((res) => {
        setCast(res.data.cast.slice(0, 18));
      })
      .catch((err) => {
        console.log(err);
      });
  };

useEffect(() => {
  getVideo();
  getCast();
  }, []);

  console.log(cast);
  // scroll to video
  const myRef = useRef(null);
  const scrollToVideo = () => {
    myRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className=' pt-1'>
      <div className='container'>
        {/* Hero Section */}
        <div className='Hero-section flex items-center md:flex-row flex-col mx-auto my-12 w-12/12'>
          <img
            data-aos='fade-right'
            data-aos-delay='200'
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className=' h-[400px] w-10/12 mb-6 mx-auto  md:w-4/12  rounded-xl'
          />
          <div
            className='flex flex-col mx-12'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            <div className='text-2xl font-bold mb-5 justify-center flex md:block'>
              {movie.title}
            </div>
            <div className='flex md:flex-col flex-wrap  justify-around text-lg  font-semibold '>
              <div className='flex  items-center gap-2'>
                <div>
                  <IoIosEye />
                </div>
                <div>
                  <p>{movie.vote_count}</p>
                </div>
              </div>
              <div className='flex  items-center gap-2'>
                <div>
                  <IoStarSharp className='text-[#ffff00]' />
                </div>
                <div>{String(movie.vote_average).slice(0, 3)}</div>
              </div>
              <div className=''>{movie.release_date}</div>
            </div>
            <div className='flex justify-center md:block'>
              <button
                className={`${
                  mode == 'light'
                    ? 'bg-black text-white hover:text-[#9a90af]'
                    : 'bg-white text-black hover:text-[#15533f]'
                }  hover:cursor-pointer my-4 px-5 py-4 font-semibold  rounded-[25px] flex gap-2 justify-center items-center`}
                onClick={() => {
                  scrollToVideo();
                }}
              >
                <FaPlay />
                <span>Watch Free</span>
              </button>
            </div>
            <div className='lg:text-lg font-semibold'>{movie.overview}</div>
          </div>
        </div>

        {/* video Section */}
        <div className='Video-section'>
          <div className='md:mt-28' ref={myRef}></div>
          <div className='md:mt-40'>
            <YouTube
              videoId={`${video}`}
              iframeClassName=' w-10/12 md:w-8/12 mx-auto lg:h-[550px]'
            />
          </div>
        </div>

        {/* cast of movie Section */}
        <div className='Cast-section mt-8 text-center'>
          <div className=' text-sm md:text-lg font-bold ms-6 mb-8'>
            {' '}
            Cast of ( {movie.title} )
          </div>
          <div className='actors flex flex-wrap '>
            {cast.map(
              (actor, _index) =>
                actor.profile_path && (
                  <div
                    className='actor w-6/12 sm:w-4/12 md:w-3/12 lg:w-2/12 mb-10'
                    key={_index}
                  >
                    <div className='flex justify-center'>
                      <img
                        className={`rounded-[50%] sm:h-40 h-32 w-32 sm:w-40 ${
                          mode == 'light'
                            ? ' border-4 hover:border-[#9a90af]'
                            : ' border-4 hover:border-[#15533f]'
                        }`}
                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                      />
                    </div>
                    <div className='flex flex-col items-center mt-2 text-lg font-semibold'>
                      <p>{actor.name}</p>
                      <p className='font-normal'>{actor.character}</p>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const loader = async (arg) => {
  const movie = await instance.get(`movie/${arg.params.id}`);
  return movie.data;
};
