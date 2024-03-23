import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const InstructorsRevene = () => {
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
              title: <Link to='#'>Instructors Revenues</Link>
            }
          ]}
        />
      </div>
    InstructorsRevene</div>;
};

export default InstructorsRevene;
