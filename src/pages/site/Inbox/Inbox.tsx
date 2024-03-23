import { EditOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import InputFieldInbox from './components/inputFieldInbox';
import InputFieldMessage from './components/inputFieldMessage';

const Inbox = () => {
  return (
    <div className='main_inbox container mx-auto'>
      <Row gutter={[16, 16]} className='mt-40 mb-8'>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className='max-h-full relative '>
          <Card>
            <div className='flex min-h-96 min-h-full py-10' style={{ minHeight: '600px' }}>
              <div className='inbox__createMessage w-1/3 text-center bg-slate-100 py-6'>
                <button className='btn py-4 px-8 rounded-2xl mb-4'>
                  <EditOutlined className='mr-2 text-2xl' />
                  New Message
                </button>
                <div className='input__message'>
                  <InputFieldInbox />
                </div>
              </div>
              <div className='inbox__writeMessage w-2/3'>
                <InputFieldMessage />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Inbox;
