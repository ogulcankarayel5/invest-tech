import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';

import ReactLoading from 'react-loading';

import './index.scss';
import { useAppSelector } from '../../store/hooks';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { getFilms } from '../../store/slices/film.slice';
import Film from './components/Film';

const Films = () => {
  const navigate = useNavigate();
  const appState = useAppSelector((state) => state.films);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const onFilmClick = (id) => {
    navigate(`/detail/${id}`);
  };

  useDidMountEffect(() => {
    if (!loadMore) {
      setLoadMore(true);
    }
    if (page > 1) {
      setPage(1);
    }
  }, [appState.search]);

  const onLoadMore = () => {
    dispatch(getFilms({ page: page + 1 }));
    setPage(page + 1);
    if (page * 10 >= appState.films?.totalResults) {
      setLoadMore(false);
    }
  };

  if (appState.status === 'loading') {
    return (
      <div className="loading">
        <ReactLoading type="spin" color="white" height={150} width={150} />;
      </div>
    );
  }

  if (appState.status === 'succeeded') {
    return (
      <div className="films">
        {appState.films?.Search.length > 0 ? (
          <>
            <div className="films__container">
              {appState.films?.Search.map((film) => (
                <div
                  key={film.imdbID}
                  onClick={() => onFilmClick(film.imdbID)}
                  tabIndex={0}
                  role="button"
                  onKeyPress={() => {}}
                >
                  <Film
                    img={film.Poster}
                    title={film.Title}
                    footerTexts={[film.Year.toString(), film.imdbID]}
                  />
                </div>
              ))}
            </div>
            {loadMore && (
              <div className="films__more">
                <Button label="Load more" severity="success" onClick={onLoadMore} />
              </div>
            )}
          </>
        ) : (
          <div style={{ color: 'white' }}>Uygun Sonuç Bulunamadı</div>
        )}
      </div>
    );
  }
};

export default Films;
