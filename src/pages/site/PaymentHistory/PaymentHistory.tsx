import { Button, Card, Col, DatePicker, Row, Select } from 'antd';
import PaymentHistoryMain from './components/PaymentHistoryMain';

const PaymentHistory = () => {
  return (
    <div className='main_payment container mx-auto'>
      <Row gutter={[16, 16]} className='mt-40 mb-8'>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className='max-h-full relative '>
          <Card>
            <h1 className='text-4xl text-center'>PAYMENT HISTORY</h1>
            <div className='flex min-h-96 min-h-full py-10' style={{ minHeight: '600px' }}>
              <div className='w-1/3 text-center bg-slate-100 py-6'>
                <div className='filter__payment-course'>
                  <h1>FILTER COURSE NAME</h1>
                  <div className='flex justify-center mt-6 '>
                    <input
                      type='text'
                      className='border border-gray-300 rounded-md w-3/4 py-2 px-4'
                      placeholder='Course name'
                    />
                  </div>
                </div>
                <div className='filter__payment-price'>
                  <h1 className='mt-6'>FILTER PRICE</h1>
                  <div className='flex justify-center mt-6 '>
                    <input
                      type='text'
                      className='border border-gray-300 rounded-md w-3/4 py-2 px-4'
                      placeholder='Price'
                    />
                  </div>
                </div>
                <div className='filter__payment-course mt-4'>
                  <h1>FILTER NAME USER</h1>
                  <div className='flex justify-center mt-6 '>
                    <input
                      type='text'
                      className='border border-gray-300 rounded-md w-3/4 py-2 px-4'
                      placeholder='Name user'
                    />
                  </div>
                </div>
                <div className='filter__payment-status'>
                  <h1 className='mt-6'>FILTER STATUS</h1>
                  <div className='flex justify-center mt-6 '>
                    <Select className='w-3/4' placeholder='Select a status'>
                      <Select.Option value='status1'>Success</Select.Option>
                      <Select.Option value='status2'>UnSuccess</Select.Option>
                      <Select.Option value='status3'>Pedding</Select.Option>
                    </Select>
                  </div>
                </div>
                <div className='filter__payment-time'>
                  <h1 className='mt-6'>FILTER TIME</h1>
                  <div className='flex justify-center mt-6 '>
                    <DatePicker.RangePicker className='w-3/4' />
                  </div>
                </div>
                <Button className='mt-6 w-3/4' type='primary'>
                  {' '}
                  Search{' '}
                </Button>
              </div>
              <div className='payment__history w-2/3'>
                <PaymentHistoryMain />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentHistory;
