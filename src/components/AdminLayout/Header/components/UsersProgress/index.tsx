import { PlusCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Space } from 'antd';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { openCreateCourse } from '../../../../../pages/admin/Courses/course.slice';
const UsersProgressHeader = () => {
  const adminInfoItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          1st menu item
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
          2nd menu item
        </a>
      )
    },
    {
      key: 'logout',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
          Logout
        </a>
      )
    }
  ];

  const dispatch = useDispatch();

  const openCreateCourseHandler = () => {
    dispatch(openCreateCourse(true));
  };

  return (
    <Fragment>
      <Space>
        <h3 className='admin-header__page-title'>User Progress</h3>

        <Button onClick={openCreateCourseHandler} className='btn-wrap'>
          <PlusCircleOutlined />
          Save Segment
        </Button>
        <Button className='btn-wrap'>
          <PlusCircleOutlined />
          View segments
        </Button>
        <Button className='btn-wrap'>
          <PlusCircleOutlined />
          Shedule report
        </Button>
        <Button className='btn-wrap'>
          <PlusCircleOutlined />
          Export user progress
        </Button>
      </Space>
      <Space className='admin-header__notify'>
      </Space>
    </Fragment>
  );
};

export default UsersProgressHeader;
