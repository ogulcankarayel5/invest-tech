import React from 'react';
import { useDispatch } from 'react-redux';
import './index.scss';

import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

import useDidMountEffect from '../../hooks/useDidMountEffect';

import { getFilms, updateCategory, updateDate, updateSearch } from '../../store/slices/film.slice';
import { useAppSelector } from '../../store/hooks';
import type { AppDispatch } from '../../store';

type FilterItemProps = {
  children: React.ReactNode;
  className?: string;
};

const FilterItem = ({ children, className = '', ...props }: FilterItemProps) => {
  return (
    <div className={`filter-item ${className}`} {...props}>
      {children}
    </div>
  );
};

const categories = [
  { name: 'Movie', code: 'movie' },
  { name: 'Series', code: 'series' },
  { name: 'Episode', code: 'episode' },
];

const Filters = () => {
  const appState: any = useAppSelector((state) => state.films);

  const dispatch = useDispatch<AppDispatch>();

  useDidMountEffect(() => {
    dispatch(getFilms({}));
  }, [appState.selectedCategory, appState.date, dispatch]);

  const onSearch = () => {
    dispatch(getFilms({}));
  };

  const onKeydown = (e: any) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  return (
    <div className="filters">
      <FilterItem className="filters__dropdown">
        <Dropdown
          value={appState.selectedCategory}
          options={categories}
          onChange={(e) => dispatch(updateCategory(e.value))}
          optionLabel="name"
          placeholder="Category"
        />
      </FilterItem>
      <FilterItem className="filters__calendar">
        <Calendar
          id="yearpicker"
          value={appState.date}
          onChange={(e) => dispatch(updateDate(e.value))}
          view="year"
          dateFormat="yy"
          placeholder="Release Date"
        />
      </FilterItem>
      <FilterItem>
        <InputText
          onKeyDown={onKeydown}
          className="filters__text"
          value={appState.search}
          onChange={(e) => dispatch(updateSearch(e.target.value))}
          placeholder="Search by name"
        />
        <div onClick={onSearch} onKeyPress={onSearch} role="button" tabIndex={0}>
          <i className="pi pi-search" />
        </div>
      </FilterItem>
    </div>
  );
};

export default Filters;
