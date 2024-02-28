import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import './CourseIngishts.scss';
import AllCourses from './components/AllCourses';
import Insights from './components/Insights';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const CourseInsights = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `All Courses`,
      children: <AllCourses />
    },
    {
      key: '2',
      label: `Insights`,
      children: <Insights />
    }
  ];

  return (
    <div className='course-insights'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Reports Center'
            },
            {
              title: 'User Analytics'
            },
            {
              title: <Link to='#'>Course Insights</Link>
            }
          ]}
        />
      </div>
      <div className='course-insights__wrap'>
        <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
      </div>
    </div>
  );
};

export default CourseInsights;
