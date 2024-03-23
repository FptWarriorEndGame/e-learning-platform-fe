import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const Certifications = () => {
  return <div>
    <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Reports Center'
            },
            {
              title: 'Exams'
            },
            {
              title: <Link to='#'>Certifications</Link>
            }
          ]}
        />
      </div>
    Certifications</div>;
};

export default Certifications;
