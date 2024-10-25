import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SwitchDemo } from './../ui/demo/Switch ';
import { useSelector } from 'react-redux';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export default function ResponsiveAppBar() {
  const modeState = useSelector((state) => state.mode.mode);

  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home', url: '' },
    { id: 2, text: 'Movies', url: 'movies' },
    { id: 3, text: 'Search', url: 'search' },
  ];

  return (
    <>
      <div
        className={`
       sticky top-0 z-10 flex justify-between items-center py-0.5  mx-auto px-12
      ${modeState == 'light' ? 'bg-[#9a90af]' : 'bg-black text-white'}
      `}
      >
        {/* Desktop Navigation Icon */}
        <span>
          <Link
            to={''}
            onClick={() => {
              window.scroll({ top: 0 });
            }}
            className={`w-full text-lg sm:text-2xl sm:font-bold font-medium 
          ${modeState == 'light' ? 'text-white' : 'text-[#00df9a]'}
          `}
          >
            Movies
          </Link>
        </span>
        {/* Desktop Navigation Menu */}
        <ul className='hidden md:flex'>
          {navItems.map((item) => (
            <NavLink
              to={`${item.url}`}
              onClick={() => {
                window.scroll({ top: 0 });
              }}
              style={({ isActive }) => {
                return isActive
                  ? {
                      color: modeState == 'light' ? 'black' : 'white',
                      fontWeight: '800',
                    }
                  : {};
              }}
              key={item.id}
              className={`mx-1 cursor-pointer px-5 py-3 duration-500
                 ${
                   modeState == 'light'
                     ? 'hover:text-black text-white'
                     : 'hover:text-white text-[#00df9a]'
                 }`}
            >
              {item.text}
            </NavLink>
          ))}
          <li className='py-3 '>
            <SwitchDemo></SwitchDemo>
          </li>
        </ul>
        {/* Mobile Navigation Icon */}
        <div
          onClick={handleNav}
          className='block md:hidden hover:cursor-pointer'
        >
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        {/* Mobile Navigation Menu */}
        <ul
          className={
            nav
              ? `fixed md:hidden left-0 top-0 w-[40%] h-full ease-in-out duration-500
                  ${
                    modeState == 'light'
                      ? 'bg-[#9a90af]'
                      : 'bg-black text-white'
                  }
                `
              : 'ease-in-out w-[40%] duration-500 fixed top-0 bottom-0 left-[-100%]'
          }
        >
          {/* Mobile Logo */}
          <h1
            className={`w-full text-lg sm:text-2xl sm:font-bold font-medium  m-2 sm:m-4 *
            ${
              modeState == 'light' ? 'text-white' : 'text-[#00df9a]'
            }            
            `}
          >
            Movies
          </h1>
          {/* Mobile Navigation Items */}
          <div className='flex flex-col mx-2  '>
            {navItems.map((item) => (
              <NavLink
                to={`${item.url}`}
                onClick={() => {
                  window.scroll({ top: 0 });
                }}
                style={({ isActive }) => {
                  return isActive
                    ? {
                        color: modeState == 'light' ? 'black' : 'white',
                        fontWeight: '800',
                      }
                    : {};
                }}
                key={item.id}
                className={` cursor-pointer rounded-xl px-5 py-3 duration-500
                 ${
                   modeState == 'light'
                     ? 'hover:text-black text-white'
                     : 'hover:text-white text-[#00df9a]'
                 }`}
              >
                {item.text}
              </NavLink>
            ))}
            <div className='flex mt-1 '>
              <SwitchDemo></SwitchDemo>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}
