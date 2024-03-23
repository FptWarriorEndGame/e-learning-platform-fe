import { Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../store/store';
import { ICategory } from '../../../../../../../../types/category.type';
import { useGetCategoriesQuery } from '../../../../../../Categories/category.service';
import { handleFormData } from '../../../../../course.slice';
import './CourseTitle.scss';
import { useState } from 'react';

const { TextArea } = Input;

const CourseTitle = () => {
  const { data: categoriesData, isFetching } = useGetCategoriesQuery({ _q: '' });
  const formData = useSelector((state: RootState) => state.course.formData);
  const [titleError, setTitleError] = useState('');
  const [subTitleError, setSubTitleError] = useState('');
  const dispatch = useDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 100) {
      setTitleError('Course title must be minimum 100 characters.');
    } else {
      setTitleError('');
    }
    dispatch(handleFormData({ ...formData, name: e.target.value }));
  };

  const subTitleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length < 50) {
      setSubTitleError('Course subtitle must be minimum 50 characters.');
    } else {
      setSubTitleError('');
    }
    dispatch(handleFormData({ ...formData, subTitle: e.target.value }));
  };

  const optionsCateList = categoriesData?.categories.map((cate: ICategory) => {
    return {
      value: cate._id,
      label: cate.name
    };
  });
  const cateChangeHandler = (
    value: string,
    options: { label: string; value: string } | { label: string; value: string }[]
  ) => {
    dispatch(
      handleFormData({
        ...formData,
        categoryId: {
          _id: value,
          name: (options as { label: string; value: string }).label
        }
      })
    );
  };

  return (
    <div className='course-title'>
      <div className='course-title__wrap'>
        <h3 className='course-title__title'>Write a title for your course</h3>

        <p className='course-title__desc'>
          Craft a catchy title and capture your students’ imagination. Make it short, precise, memorable and SEO
          friendly by including strong keywords in it.
        </p>
        <div className='course-title__input-group'>
          <label htmlFor='' className='course-title__input-label'>
            Your title
          </label>
          <Input
            value={formData.name}
            onChange={handleInputChange}
            className='course-title__input-input'
            placeholder='Your course title. Ex: Learning C Programm'
          />
          {titleError && <p className='error-message text-red-500'>{titleError}</p>}
        </div>

        <div className='course-title__input-group mt-8'>
          <label htmlFor='' className='course-title__input-label me-4 block'>
            Course Categories
          </label>
          <Select
            value={formData.categoryId.name}
            style={{ width: '100%' }}
            onChange={cateChangeHandler}
            options={optionsCateList}
          />
        </div>
        {/* Sub title of course */}
        <div className='course-title__input-group mt-8'>
          <label htmlFor='' className='course-title__input-label me-4 block'>
            Course sub title
          </label>
          <TextArea rows={4} value={formData.subTitle} onChange={subTitleChangeHandler} />
          {subTitleError && <p className='error-message text-red-500'>{subTitleError}</p>}
        </div>
      </div>
    </div>
  );
};

export default CourseTitle;
