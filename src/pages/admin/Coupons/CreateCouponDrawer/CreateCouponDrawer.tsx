import React from 'react';
import { Drawer, Form, Button, Input, DatePicker, Select, message } from 'antd';
import { usePostCouponMutation } from '../coupon.service';
import { useGetAllActiveCouponTypesQuery } from '../../CouponTypes/couponType.service';
import { useGetAllActiveCoursesQuery } from '../../Courses/course.service';
import { ICoupon } from '../../../../types/coupon.type';
import { ICouponType } from '../../../../types/couponType.type';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface CreateCouponDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCouponDrawer: React.FC<CreateCouponDrawerProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [postCoupon] = usePostCouponMutation();

  const { data: coursesData, isLoading: isCoursesLoading } = useGetAllActiveCoursesQuery();
  const { data: couponTypesData, isLoading: isCouponTypesLoading } = useGetAllActiveCouponTypesQuery();

  const handleSubmit = (values: ICoupon) => {
    const { dateRangeStart } = values as { dateRangeStart: { dateRangeEnd: string[] } };
    const [start, end] = (dateRangeStart as { dateRangeEnd: string[] }).dateRangeEnd;

    const formattedValues: ICoupon = {
      ...values,
      dateStart: new Date(start),
      dateEnd: new Date(end)
    };

    postCoupon(formattedValues)
      .unwrap()
      .then(() => {
        void message.success('Coupon created successfully');
        onClose();
        form.resetFields();
      })
      .catch(() => {
        void message.error('Failed to create coupon');
      });
  };

  return (
    <Drawer
      title='Create New Coupon'
      width={720}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={() => form.submit()} type='primary'>
            Submit
          </Button>
        </div>
      }
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please enter the description!' }]}
        >
          <Input placeholder='Enter description' />
        </Form.Item>
        <Form.Item
          name='discountAmount'
          label='Discount Amount'
          rules={[
            { required: true, message: 'Please enter the discount amount!' },
            {
              validator: (_, value) => {
                if (value < 0) {
                  return Promise.reject('Discount amount cannot be negative');
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input type='number' placeholder='Enter discount amount' />
        </Form.Item>

        <Form.Item
          name='couponTypeId'
          label='Coupon Type'
          rules={[{ required: true, message: 'Please select a coupon type!' }]}
        >
          <Select placeholder='Select a coupon type' loading={isCouponTypesLoading}>
            {couponTypesData?.couponTypes.map((couponType: ICouponType) => (
              <Option key={couponType._id} value={couponType._id}>
                {couponType.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name={['dateRangeStart', 'dateRangeEnd']}
          label='Date Range'
          rules={[{ required: true, message: 'Please select the date range!' }]}
        >
          <RangePicker showTime />
        </Form.Item>
        <Form.Item
          name='courseIds'
          label='Select Courses'
          rules={[{ required: true, message: 'Please select at least one course!' }]}
        >
          <Select mode='multiple' placeholder='Select courses' loading={isCoursesLoading} optionFilterProp='children'>
            {coursesData?.courses.map((course) => (
              <Option key={course._id} value={course._id}>
                {course.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateCouponDrawer;
