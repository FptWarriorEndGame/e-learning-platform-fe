import { Col, Row } from 'antd';
import FeedBackUser from './components/FeedBack';
import ModalCreateFeedBack from './components/ModalCreateFeedBack';

export default function FeedBackCourse() {
  return (
    <div className='container p-8'>
      <div className='flex w-2/3 justify-between'>
        <h2 className='text-4xl font-bold mb-8 inline-block'>Course Reviews</h2>
        <ModalCreateFeedBack name='Trung' />
      </div>
      <Row gutter={[16, 16]} className='bg-gray-100 w-2/3 py-12 px-6'>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <FeedBackUser name='Trung' rate={5} content='Very good' />
          <FeedBackUser name='Trung' rate={5} content='Very good' />
        </Col>
      </Row>
    </div>
  );
}
