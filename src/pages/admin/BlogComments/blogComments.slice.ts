import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  commentId: string;
  blogId: string;
  isOpenBlogComments: boolean;
}

const initialState: CategoryState = {
  commentId: '',
  blogId: '',
  isOpenBlogComments: false
};

const BlogCommentsSlice = createSlice({
  name: 'Blog comments',
  initialState,
  reducers: {
    openCreateBlogComments: (state, action: PayloadAction<boolean>) => {
      state.isOpenBlogComments = action.payload;
    },
    startEditBlogComments: (state, action: PayloadAction<string>) => {
      state.commentId = action.payload;
      state.blogId = action.payload;
    },
    cancelEditBlogComments: (state) => {
      state.commentId = '';
      state.blogId = '';
    }
  }
});

const BlogCommentsReducer = BlogCommentsSlice.reducer;
export const { openCreateBlogComments, cancelEditBlogComments, startEditBlogComments } = BlogCommentsSlice.actions;
export default BlogCommentsReducer;
