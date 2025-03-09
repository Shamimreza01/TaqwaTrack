import React from 'react';

import { Link } from 'react-router';

export default function AlQuranCard({edition,name,AlQuranImage}) {
  return (
    <Link to={`/quran/${edition}`} className='itemCard'>
      <img  src={AlQuranImage} alt={`Al Quran ${edition}`} />
      <p>{name}</p>
    </Link>
  )
}
