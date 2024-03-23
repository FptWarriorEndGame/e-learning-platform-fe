import './LessonItem.scss';

import { EditOutlined, YoutubeOutlined } from '@ant-design/icons';
import { ILesson, ISection } from '../../../../../../../types/lesson.type';
import { Button } from 'antd';
import { useUpdateLessonMutation } from '../../../../course.service';
import { useState } from 'react';
import EditLesson from '../EditLesson';

type LessonItemProps = {
  lesson: ILesson;
  section: ISection;
};

const LessonItem = (props: LessonItemProps) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };
  return (
    <div className='lesson-item flex justify-between'>
      <div className='flex'>
        <YoutubeOutlined className='lesson-item__icon' />
        <div className='lesson-item__content'>{props.lesson.name}</div>
      </div>
      <Button type='ghost' onClick={toggleDrawer}>
        <EditOutlined />
      </Button>
      <EditLesson isVisible={isDrawerVisible} onClose={toggleDrawer} lesson={props.lesson} section={props.section} />
    </div>
  );
};

export default LessonItem;
