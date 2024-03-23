import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiscussSate {
  discussId: string;
  isOpenDiscuss: boolean;
}

const initialState: DiscussSate = {
  discussId: '',
  isOpenDiscuss: false
};

const DiscussSlice = createSlice({
  name: 'Discuss',
  initialState,
  reducers: {
    openCreateDiscuss: (state, action: PayloadAction<boolean>) => {
      state.isOpenDiscuss = action.payload;
    },
    startEditDiscuss: (state, action: PayloadAction<string>) => {
      state.discussId = action.payload;
    },
    cancelEditDiscuss: (state) => {
      state.discussId = '';
    }
  }
});

const DiscussReducer = DiscussSlice.reducer;
export const { openCreateDiscuss, cancelEditDiscuss, startEditDiscuss } = DiscussSlice.actions;
export default DiscussReducer;
