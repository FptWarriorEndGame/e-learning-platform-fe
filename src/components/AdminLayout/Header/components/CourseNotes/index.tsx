import { Space } from 'antd';
import { Fragment } from 'react';
const CoursesNotes = () => {
  return (
    <Fragment>
      <Space>
        <h3 className='admin-header__page-title'>Courses Notes</h3>
      </Space>
      <Space className='admin-header__notify'></Space>
    </Fragment>
  );
};

export default CoursesNotes;
