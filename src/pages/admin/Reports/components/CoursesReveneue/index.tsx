import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const CoursesRevenues = () => {
  return <div>
    <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Reports Center'
            },
            {
              title: 'Sales'
            },
            {
              title: <Link to='#'>Courses revenues</Link>
            }
          ]}
        />
      </div>
    CoursesRevenue</div>;
};

export default CoursesRevenues;
