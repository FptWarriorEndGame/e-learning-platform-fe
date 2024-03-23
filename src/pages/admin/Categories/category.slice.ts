import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  categoryId: string;
  isOpenCreateCategory: boolean;
}

const initialState: CategoryState = {
  categoryId: '',
  isOpenCreateCategory: false
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    openCreateCategory: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateCategory = action.payload;
    },
    startEditCategory: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    cancelEditCategory: (state) => {
      state.categoryId = '';
    }
  }
});

const categoryReducer = categorySlice.reducer;
export const { cancelEditCategory, startEditCategory, openCreateCategory } = categorySlice.actions;
export default categoryReducer;
