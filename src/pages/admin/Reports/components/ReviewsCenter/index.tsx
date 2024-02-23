import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const ReviewsCenter = () => {
  return (
    <div>
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
              title: <Link to='#'>Review center</Link>
            }
          ]}
        />
      </div>
      ReviewsCenter
    </div>
  );
};

export default ReviewsCenter;
