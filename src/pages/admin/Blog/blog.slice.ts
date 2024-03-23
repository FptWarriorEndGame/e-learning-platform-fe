import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BlogState {
  blogId: string;
  isOpenCreateBlog: boolean;
}

const initialState: BlogState = {
  blogId: '',
  isOpenCreateBlog: false
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    openCreateBlog: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateBlog = action.payload;
    },
    startEditBlog: (state, action: PayloadAction<string>) => {
      state.blogId = action.payload;
    },
    cancelEditBlog: (state) => {
      state.blogId = '';
    }
  }
});

const blogReducer = blogSlice.reducer;
export const { openCreateBlog, startEditBlog, cancelEditBlog } = blogSlice.actions;
export default blogReducer;
