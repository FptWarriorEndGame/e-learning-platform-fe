import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ICourse } from '../../../types/course.type';
import CourseList from '../components/CourseList';
import { useGetCoursesFromWishlistByUserIdQuery } from '../client.service';
import { Skeleton } from 'antd'; 
import './Wishlist.scss';

const WishlistPage: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [wishlistCourses, setWishlistCourses] = useState<ICourse[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  const { data: CoursesData, isLoading: isQueryLoading } = useGetCoursesFromWishlistByUserIdQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (CoursesData && CoursesData.courses) {
      setWishlistCourses(CoursesData.courses);
      setIsLoading(false);
    }
  }, [CoursesData]);

  return (
    <div className="wishlist-courses">
      <div className="container">
        <h2 className='wishlist-courses__title'>Your Wishlist</h2>
        {isLoading || isQueryLoading ? (
          <Skeleton active paragraph={{ rows: 3 }} />
        ) : (
          <CourseList
            className="wishlist-courses__list"
            courses={wishlistCourses}
            courseState="notOrdered"
          />
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
