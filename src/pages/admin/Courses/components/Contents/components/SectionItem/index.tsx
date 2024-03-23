import { Button, Divider, Space } from 'antd';
import { ISection } from '../../../../../../../types/lesson.type';
import { useGetLessonsBySectionIdQuery } from '../../../../course.service';
import LessonItem from '../LessonItem';
import AddLesson from '../AddLesson';
import AddActivities from './AddActivities';
import './SectionItem.scss';
import { EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import EditSectionDrawer from '../EditSection';

type SectionItemProps = {
  section: ISection;
  index: number;
};

const SectionItem = (props: SectionItemProps) => {
  const { data, isFetching } = useGetLessonsBySectionIdQuery(props.section._id);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <div className='section-item'>
      <div className='section-item__content'>
        <div className='section-item__number'>
          <h2 className='section-item__number-head'>0{props.index + 1}</h2>
        </div>
        <div className='section-item__info'>
          <div className='flex items-center justify-between'>
            <h3 className='section-item__name'>{props.section.name}</h3>
            <Button type='default' onClick={toggleDrawer}>
              <EditOutlined />
            </Button>
            <EditSectionDrawer isVisible={isDrawerVisible} onClose={toggleDrawer} section={props.section} />
          </div>
          <div className='section-item__content'>
            {/* List lesson items here!!! */}
            {data?.lessons.map((lessonItem) => {
              return (
                <>
                  {' '}
                  <LessonItem key={lessonItem._id} lesson={lessonItem} section={props.section} />
                </>
              );
            })}
          </div>
          <div className='section-item__btns'>
            <Space>
              {/* <AddActivities sectionId={props.section._id} /> */}
              {/* or
              <Button>Import activity</Button> */}
              <AddLesson/>
            </Space>
          </div>
        </div>
      </div>

      <Divider />
    </div>
  );
};

export default SectionItem;
