import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getFilms } from '../store/slices/film.slice';
import { useAppSelector } from '../store/hooks';

import Filters from '../components/Filters';
import Films from '../components/Films';

const Home = () => {
  const dispatch = useDispatch();
  const appState = useAppSelector((state) => state.films);

  useEffect(() => {
    if (!appState.films?.Search) {
      dispatch(getFilms({ type: 'movie', t: '' }));
    }
  }, [dispatch]);

  return (
    <div>
      <Filters />
      <Films />
    </div>
  );
};

export default Home;
