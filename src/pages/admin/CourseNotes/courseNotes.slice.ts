import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoteCourseState {
  courseNotesId: string;
  isOpenNotesCourse: boolean;
}

const initialState: NoteCourseState = {
  courseNotesId: '',
  isOpenNotesCourse: false
};

const noteCourseSlice = createSlice({
  name: 'Note Course',
  initialState,
  reducers: {
    openCreateNotesCourse: (state, action: PayloadAction<boolean>) => {
      state.isOpenNotesCourse = action.payload;
    },
    startEditNotesCourse: (state, action: PayloadAction<string>) => {
      state.courseNotesId = action.payload;
    },
    cancelEditNotesCourse: (state) => {
      state.courseNotesId = '';
    }
  }
});

const notesCourseReducer = noteCourseSlice.reducer;
export const { cancelEditNotesCourse, startEditNotesCourse, openCreateNotesCourse } = noteCourseSlice.actions;
export default notesCourseReducer;
