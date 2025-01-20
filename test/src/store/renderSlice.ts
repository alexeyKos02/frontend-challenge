import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface rendserState {
  paginationPage: number;
}

const initialState: rendserState = {
  paginationPage: 1,
};

const renderSlice = createSlice({
  name: 'render',
  initialState,
  reducers: {
    increasePaginationPage(state, action: PayloadAction<number>) {
      state.paginationPage = action.payload;
    },
  },
});

export const { increasePaginationPage } = renderSlice.actions;

export default renderSlice.reducer;
