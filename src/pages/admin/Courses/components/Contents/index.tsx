import { Breadcrumb, Button, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useGetSectionsByCourseIdQuery } from '../../course.service';
import AddSection from './components/AddSection';
import SectionItem from './components/SectionItem';
import './contents.scss';

const CourseContents = () => {
  const { courseId } = useParams();
  const { data, isFetching } = useGetSectionsByCourseIdQuery(courseId || '');
  
  return (
    <div className='course-contents'>
      <div className='course-contents__wrap'>
        <h2 className='course-contents__create-title'>Start creating your course by adding the first section!</h2>
      </div>
      <div className='course-contents__add-section'>
        <Space>
          <AddSection courseId={courseId as string} />
        </Space>
      </div>
      <div className='course-contents__list'>
        {data?.sections.map((section, index) => {
          return <SectionItem key={section._id} section={section} index={index} />;
        })}
      </div>
    </div>
  );
};

export default CourseContents;
