import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  BlogcategoryId: string;
  isOpenCreateCategory: boolean;
}

const initialState: CategoryState = {
  BlogcategoryId: '',
  isOpenCreateCategory: false
};

const categoryBlogSlice = createSlice({
  name: 'Blog category',
  initialState,
  reducers: {
    openCreateCategory: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateCategory = action.payload;
    },
    startEditCategory: (state, action: PayloadAction<string>) => {
      state.BlogcategoryId = action.payload;
    },
    cancelEditCategory: (state) => {
      state.BlogcategoryId = '';
    }
  }
});

const BlogcategoryReducer = categoryBlogSlice.reducer;
export const { openCreateCategory, startEditCategory, cancelEditCategory } = categoryBlogSlice.actions;
export default BlogcategoryReducer;
