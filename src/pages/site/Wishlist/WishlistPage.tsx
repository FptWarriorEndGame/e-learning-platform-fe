
import {  useState } from 'react';
import { IParams } from '../../../types/params.type';
import { useGetCoursesQuery} from '../client.service';
import CourseList from '../components/CourseList';

const WishlistPage = () => {


  const params: IParams = {
    _limit: 4,
    _page: 1
  };

  const [backendParams, setBackendParams] = useState({
    _limit: 4,
    _page: 1,
    _topic: ['646781266859a50acfca8e93'], 
  });


  const { data: backendData, isFetching: isBackendFetching } = useGetCoursesQuery(backendParams);
  const isBackendLoadMore = (backendData?.pagination._totalRows || 0) > (backendData?.courses.length || 0);
  // Backend courses
  const backendCourses = backendData?.courses;
  const backendLoadMoreHandler = () => {
    setBackendParams({
      ...backendParams,
      _limit: (backendParams._limit || 0) + 4
    });
  };
  return (
    <div>
      <div className='our-courses container spacing-h-sm'>
        <h2 className='our-courses__title'>Wishlist</h2>
          <CourseList
            courseState='notOrdered'
            isLoadMore={isBackendLoadMore}
            onLoadMore={backendLoadMoreHandler}
            courses={backendCourses}
            className='our-courses__wrapper'
          />
      </div>
    </div>
  );
};

export default WishlistPage;
