import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './index.scss';

type FilmProps = {
  img: string;
  title: string;
  footerTexts: string[];
};

const Film = ({ img, title, footerTexts }: FilmProps) => {
  return (
    <div className="film">
      <LazyLoadImage effect="blur" className="film__img" src={img} alt="img" />
      <span className="film__title">{title}</span>
      <div className="film__footer">
        {footerTexts.map((text) => (
          <span key={text}>{text}</span>
        ))}
      </div>
    </div>
  );
};

export default Film;
