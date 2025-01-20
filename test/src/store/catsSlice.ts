import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatResponse } from '../types/cats';
import { Cat } from '../types/cats';
import { fetchCats, fetchCatsByID } from '../api/catsApi';
import { ResponseCats } from '../types/api';

interface catsState {
  cats: Cat[];
  favoriteCats: Cat[];
  loadingFirst: boolean;
  errorFirst: string | null;
  loadingSecond: boolean;
  errorSecond: string | null;
}
type FetchCatsParams = {
  page: number;
};

const initialState: catsState = {
  cats: [],
  favoriteCats: [],
  loadingFirst: false,
  errorFirst: null,
  loadingSecond: false,
  errorSecond: null,
};

export const fetchAllCats = createAsyncThunk<ResponseCats, FetchCatsParams>(
  'cats/fetchCats',
  async ({ page }, { rejectWithValue }) => {
    try {
      const data = await fetchCats(page);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchFavoriteCats = createAsyncThunk<ResponseCats, string[]>(
  'cats/fetchFavoriteCats',
  async (IDs, { rejectWithValue }) => {
    try {
      const data = await fetchCatsByID(IDs);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCats.pending, (state) => {
        state.loadingFirst = true;
        state.errorFirst = null;
      })
      .addCase(
        fetchAllCats.fulfilled,
        (state, action: PayloadAction<CatResponse[]>) => {
          state.loadingFirst = false;
          state.cats = action.payload.map((cat) => ({
            ...cat,
            liked: false,
          }));
        }
      )
      .addCase(fetchAllCats.rejected, (state, action) => {
        state.loadingFirst = false;
        state.errorFirst = action.error.message || 'Failed to fetch data';
      });

    builder
      .addCase(fetchFavoriteCats.pending, (state) => {
        state.loadingSecond = true;
        state.errorSecond = null;
      })
      .addCase(
        fetchFavoriteCats.fulfilled,
        (state, action: PayloadAction<CatResponse[]>) => {
          state.loadingSecond = false;
          state.favoriteCats = action.payload.map((cat) => ({
            ...cat,
            liked: true,
          }));
        }
      )
      .addCase(fetchFavoriteCats.rejected, (state, action) => {
        state.loadingSecond = false;
        state.errorSecond =
          action.error.message || 'Failed to fetch second data';
      });
  },
});

export default catsSlice.reducer;
