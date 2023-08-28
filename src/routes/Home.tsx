import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getFilms } from '../store/slices/film.slice';
import { useAppSelector } from '../store/hooks';
import type { AppDispatch } from '../store';

import Filters from '../components/Filters';
import Films from '../components/Films';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appState: any = useAppSelector((state) => state.films);

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
