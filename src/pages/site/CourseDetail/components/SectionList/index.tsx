import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Collapse } from 'antd';
import { formatTime } from '../../../../../utils/functions';
import { useGetSectionsByCourseIdQuery } from '../../../client.service';
import CourseDetailLessonList from '../LessonList';
import './SectionList.scss';

type SectionListProps = {
  courseId: string;
  courseName: string;
};

const SectionList = (props: SectionListProps) => {
  const { data: sectionData } = useGetSectionsByCourseIdQuery(props.courseId);
  const [visibleSections, setVisibleSections] = useState<number>(10);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const loadMoreSections = () => {
    setVisibleSections((prevVisibleSections) => prevVisibleSections + 10);
  };

  const sectionItems = sectionData?.sections.slice(0, visibleSections).map((sectionItem, index) => {
    const { _id, name, numOfLessons, totalVideosLength } = sectionItem;

    const sectionTemplateItem = {
      key: `${index}`,
      label: (
        <div className='section__title'>
          <h3>{name}</h3>
          <div className='section__summary'>
            {numOfLessons} lectures • {formatTime(totalVideosLength as number)}
          </div>
        </div>
      ),
      children: <CourseDetailLessonList sectionId={_id} courseId={props.courseId} courseName={props.courseName} />
    };
    return sectionTemplateItem;
  });

  return (
    <div className='course-detail__content-collapse'>
      <Collapse
        items={sectionItems}
        defaultActiveKey={sectionData?.sections.map((sectionItem, index) => `${index}`)}
        onChange={onChange}
      />
      {sectionData && sectionData.sections.length > visibleSections && (
        <Button className='course-detail__content-collapse-btn' onClick={loadMoreSections}>
          Load more sections <DownOutlined />
        </Button>
      )}
    </div>
  );
};

export default SectionList;
