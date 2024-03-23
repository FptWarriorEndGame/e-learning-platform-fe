import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetRelatedCoursesQuery } from '../../../client.service';
import CourseList from '../../../components/CourseList';
import { ICourse } from '../../../../../types/course.type';
import { RootState } from '../../../../../store/store';
import { Skeleton } from 'antd';
import style from './RelatedCourses.module.scss'

type RelatedCoursesProps = {
    courseId: string;
};

const RelatedCourses = ({ courseId }: RelatedCoursesProps) => {
    const userId = useSelector((state: RootState) => state.auth.userId);
    const { data, isFetching } = useGetRelatedCoursesQuery({ courseId, limit: 10, userId });
    const [relatedCourses, setRelatedCourses] = useState<ICourse[]>([]);

    useEffect(() => {
        if (data && data.relatedCourses) {
            setRelatedCourses(data.relatedCourses);
        }
    }, [data]);

    if (isFetching) {
        return (
            <div className={style.relatedCourses}>
                <h3 className={style.relatedCourses__title}>Related courses</h3>
                <Skeleton active />
            </div>
        );
    }

    if (relatedCourses.length < 4) {
        return null;
    }

    return (
        <div className={style.relatedCourses}>
            <h3 className={style.relatedCourses__title}>Related courses</h3>
            <CourseList
                className={style.relatedCourses__container}
                courses={relatedCourses}
                courseState="notOrdered"
                isCarousel={true}
            />
        </div>
    );
};

export default RelatedCourses;
