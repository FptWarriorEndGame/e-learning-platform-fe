import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessStatus, CourseLevel, ICourse } from '../../../types/course.type';

interface CourseState {
  courseId: string;
  isOpenCreateCourse: boolean;
  formData: ICourse;
  sectionId: string;
  isOpenAddSectionModal: boolean;
}

const initialState: CourseState = {
  courseId: '',
  isOpenCreateCourse: false,
  formData: {
    _id: '',
    name: '',
    description: '',
    price: 0,
    finalPrice: 0,
    access: AccessStatus.FREE,
    level: CourseLevel.BEGINNER,
    thumbnail: '',
    courseSlug: '',
    categoryId: {
      _id: '',
      name: ''
    },
    userId: {
      _id: '6468a145401d3810494f4797',
      name: 'Nguyen Van A',
      avatar: ''
    },
    willLearns: [],
    requirements: [],
    tags: [],
    subTitle: ''
  },
  sectionId: '',
  isOpenAddSectionModal: false
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    openCreateCourse: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateCourse = action.payload;
    },
  }
});

const courseReducer = courseSlice.reducer;
export const { openCreateCourse} =
  courseSlice.actions;
export default courseReducer;
