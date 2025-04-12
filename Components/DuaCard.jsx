import React from 'react';

import { Link } from 'react-router';

export default function DuaCard({edition,name,DuaCardImage}) {
  return (
    <Link to={`/${edition}`} className='DuaCard'>
      <img  src={DuaCardImage} alt={` ${edition} Dua`} />
      <p>{name}</p>
    </Link>
  )
}