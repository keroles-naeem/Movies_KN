import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Footer() {
  const mode = useSelector((state) => state.mode.mode);

  const AboutFooterItems = [
    { id: 1, text: 'About Us', url: '#' },
    { id: 2, text: 'FAQ', url: '#' },
    { id: 3, text: 'Careers', url: '#' },
    { id: 4, text: 'Contact Us', url: '#' },
  ];
  const ExploreFooterItems = [
    { id: 2, text: 'Movies', url: 'movies' },
    { id: 3, text: 'Search', url: 'search' },
    { id: 4, text: 'Coming Soon', url: '#' },
  ];

  const LEGALFooterItems = [
    { id: 1, text: 'Privacy Policy', url: '#' },
    { id: 2, text: 'Licensing', url: '#' },
    { id: 3, text: 'Terms & Conditions', url: '#' },
    { id: 4, text: 'Terms of Use', url: '#' },
  ];

  const HELPFooterItems = [
    { id: 1, text: 'Facebook', url: 'https://www.facebook.com/keroles149/' },
    { id: 2, text: 'Discord Server', url: 'https://harmonious-daffodil-6c0b94.netlify.app/' },
    { id: 3, text: 'Twitter', url: 'https://harmonious-daffodil-6c0b94.netlify.app/' },
    { id: 4, text: 'whatsapp', url: 'https://wa.me/1210366070' },
  ];

  return (
    <>
      <footer>
        <div className='mx-auto w-full '>
          <div className='grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4 mx-10'>
            {/* About-footer-part */}
            <div>
              <h2
                className={`mb-6 font-bold uppercase hover:cursor-text ${
                  mode == 'light' ? 'text-black' : 'text-[#00df9a]'
                }`}
              >
                About
              </h2>
              <ul className='  font-medium'>
                {AboutFooterItems.map((ele,index) => (
                  <li className='mb-4' key={index}>
                    <a
                      href={ele.url}
                      className={` duration-500
                       ${
                         mode == 'light'
                           ? 'hover:text-[#b0b3b2] text-black'
                           : 'hover:text-white text-[#00df9a]'
                       }
                      `}
                    >
                      {ele.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Explore-footer-part */}
            <div>
              <h2
                className={`mb-6 font-bold uppercase hover:cursor-text ${
                  mode == 'light' ? 'text-black' : 'text-[#00df9a]'
                }`}
              >
                Explore Our Site
              </h2>
              <ul className='  font-medium'>
                {ExploreFooterItems.map((ele,index) => (
                  <li className='mb-4' key={index}>
                    <Link
                      to={`${ele.url}`}
                      onClick={() => {
                        window.scroll({ top: 0 });
                      }}
                      className={` duration-500 ${
                        mode == 'light'
                          ? 'hover:text-[#b0b3b2] text-black'
                          : 'hover:text-white text-[#00df9a]'
                      }`}
                    >
                      {ele.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Legal-footer-part */}
            <div>
              <h2
                className={`mb-6 font-bold uppercase hover:cursor-text ${
                  mode == 'light' ? 'text-black' : 'text-[#00df9a]'
                }`}
              >
                Privacy Policy
              </h2>
              <ul className='  font-medium'>
                {LEGALFooterItems.map((ele,index) => (
                  <li className='mb-4' key={index}>
                    <a
                      href={ele.url}
                      className={` duration-500 ${
                        mode == 'light'
                          ? 'hover:text-[#b0b3b2] text-black'
                          : 'hover:text-white text-[#00df9a]'
                      }`}
                    >
                      {ele.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* HelpCenter-footer-part */}
            <div>
              <h2
                className={`mb-6 font-bold uppercase hover:cursor-text ${
                  mode == 'light' ? 'text-black' : 'text-[#00df9a]'
                }`}
              >
                Help center
              </h2>
              <ul className='  font-medium'>
                {HELPFooterItems.map((ele,index) => (
                  <li className='mb-4' key={index}>
                    <Link
                      to={`${ele.url}`}
                      target='blank'
                      className={` duration-500 ${
                        mode == 'light'
                          ? 'hover:text-[#b0b3b2] text-black'
                          : 'hover:text-white text-[#00df9a]'
                      }`}
                    >
                      {ele.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='py-6 flex items-center justify-center'>
            <span
              className={`text-sm duration-500 ${
                mode == 'dark' && 'text-[#00df9a]'
              }`}
            >
              © 2024 Keroles Naeem
            </span>
            <div className='ms-4 md:mt-0 space-x-5 '>
              <Link to={'https://github.com/keroles-naeem'} target='blanc'>
                <svg
                  className={`w-4 h-4 duration-500 ${
                    mode == 'dark' && 'text-[#00df9a] hover:text-white'
                  }`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='sr-only'>GitHub account</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

