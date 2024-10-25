import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='flex justify-center h-[100vh]'>
      <Link to={''}>
        <img src={'/notFound.jpg'} alt='notfounfImage' />
      </Link>
    </div>
  );
}
