import { Button, Result } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { CheckCircleOutlined, SmileOutlined } from '@ant-design/icons';
import './SubscribeCourse.scss';

const SubsribeCourse = () => {
  const { courseId } = useParams();
  return (
    <div className='subscribe-course'>
      <div className='subscribe-course__wrapper container bg-slate-300 rounded-2xl'>
        <div className='py-16'>
          <Result className='reset-margin p-0' icon={<CheckCircleOutlined />} />
          <div className='flex flex-col	items-center'>
            <h2 className='subscribe-course__title uppercase text-6xl'>Subscribe Course successfully</h2>
            <Link to={`/path-player/?courseId=${courseId as string}`}>
              <Button type='primary' className='text-2xl mt-6'>
                Start course
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubsribeCourse;
