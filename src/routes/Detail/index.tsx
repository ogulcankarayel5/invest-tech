import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactLoading from 'react-loading';
import { Rating } from 'primereact/rating';
import { useParams } from 'react-router-dom';
import filmService from '../../service/film';

import './index.scss';

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await filmService.getFilms({ i: id });
        setDetail(response);
      } catch (e) {
        setDetail(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <ReactLoading type="spin" color="white" height={150} width={150} />;
      </div>
    );
  }

  return (
    <div className="detail">
      <h2 className="detail__title">{detail?.Title}</h2>
      <div className="detail__info info">
        <div className="info__img">
          <LazyLoadImage effect="blur" className="film__img" src={detail.Poster} alt="img" />
        </div>
        <div className="info__texts-container">
          <div className="info__texts">
            <div className="info__text">
              <span className="info__title">Director:</span>
              <span className="info__text">{detail?.Director}</span>
            </div>
            <div className="info__text">
              <span className="info__title">Running:</span>
              <span className="info__text">{detail?.Runtime}</span>
            </div>
            <div className="info__text">
              <span className="info__title">Type:</span>
              <span className="info__text">{detail?.Type}</span>
            </div>
            <div className="info__text">
              <span className="info__title">Release Date:</span>
              <span className="info__text">{detail?.Released}</span>
            </div>
            <div className="info__text">
              <span className="info__title">Genre:</span>
              <span className="info__text">{detail?.Genre}</span>
            </div>
            <div className="info__text">
              <span className="info__title">Actors:</span>
              <span className="info__text">{detail?.Actors}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="detail__footer footer">
        <div className="footer__rating">
          <Rating value={1} disabled cancel={false} stars={1} />
          <span>{detail?.imdbRating} / 10</span>
        </div>
        <p>{detail?.Plot}</p>
      </div>
    </div>
  );
};

export default Detail;
