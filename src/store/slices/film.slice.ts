import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import filmService from '../../service/film';
import type { RootState } from '..';

export interface FilmState {
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  loadMoreStatus: 'idle' | 'loading' | 'failed' | 'succeeded';
  films: [];
  selectedCategory: Object | null;
  date: string | null;
}

const initialState: FilmState = {
  status: 'idle',
  loadMoreStatus: 'idle',
  films: [],
  selectedCategory: { name: 'Movie', code: 'movie' },
  date: null,
  search: 'Pokemon',
};

export const getFilms = createAsyncThunk(
  'films/getFilms',
  async (params: any, { rejectWithValue, getState }) => {
    const state = getState().films;
    try {
      const response: any = await filmService.getFilms({
        ...(state.selectedCategory && {
          type: state.selectedCategory.code,
        }),
        ...(state.date && {
          y: state.date,
        }),
        ...(state.search && {
          s: state.search,
        }),
        ...params,
      });
      if (response.Response !== 'False') {
        return {
          ...response,
          ...(params?.page && {
            page: params.page,
          }),
        };
      }
    } catch (error: any) {
      rejectWithValue(error);
    }
  },
);

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      state.selectedCategory = action?.payload;
    },
    updateDate: (state, action) => {
      state.date = action?.payload;
    },
    updateSearch: (state, action) => {
      state.search = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilms.pending, (state, { meta }) => {
        if (meta?.arg?.page) {
          state.loadMoreStatus = 'loading';
          return;
        }
        state.status = 'loading';
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        if (action?.payload?.page && action.payload?.Search) {
          state.films.Search = [...state.films.Search, ...action.payload.Search];
          state.loadMoreStatus = 'succeeded';
          return;
        }
        state.status = 'succeeded';

        if (action?.payload) {
          state.films = action?.payload;
        }
      })
      .addCase(getFilms.rejected, (state, { meta }) => {
        if (meta?.arg?.page) {
          state.loadMoreStatus = 'failed';
          return;
        }
        state.status = 'failed';
      });
  },
});

export const filmState = (state: RootState) => state.films;

export const { updateCategory, updateDate, updateSearch } = filmSlice.actions;
export default filmSlice.reducer;
