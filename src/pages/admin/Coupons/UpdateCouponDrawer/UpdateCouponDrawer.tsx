import React, { useEffect } from 'react';
import { Drawer, Form, Button, Input, DatePicker, Select, message } from 'antd';
import { useUpdateCouponMutation, useGetCouponByIdQuery } from '../coupon.service';
import { useGetAllActiveCoursesQuery } from '../../Courses/course.service';
import { useGetAllActiveCouponTypesQuery } from '../../CouponTypes/couponType.service';
import { ICoupon } from '../../../../types/coupon.type';
import { ICouponType } from '../../../../types/couponType.type';
import moment from 'moment';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface UpdateCouponDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  couponId: string;
}

const UpdateCouponDrawer: React.FC<UpdateCouponDrawerProps> = ({ isOpen, onClose, couponId }) => {
  const [form] = Form.useForm();
  const [updateCoupon] = useUpdateCouponMutation();

  const { data: coursesData, isLoading: isCoursesLoading } = useGetAllActiveCoursesQuery();
  const { data: couponTypesData, isLoading: isCouponTypesLoading } = useGetAllActiveCouponTypesQuery();
  const { data: couponData } = useGetCouponByIdQuery(couponId);

  useEffect(() => {
    if (couponData) {
      const { coupon, couponCourses } = couponData;
      let couponTypeId: string;

      if (typeof coupon.couponTypeId === 'string') {
        couponTypeId = coupon.couponTypeId;
      } else {
        couponTypeId = coupon.couponTypeId?._id ?? '';
      }

      form.setFieldsValue({
        ...coupon,
        _id: coupon._id,
        couponTypeId: couponTypeId,
        courseIds: couponCourses.map((course) => course.courseId._id),
        dateRangeStart: {
          dateRangeEnd: [
            dayjs(moment(coupon.dateStart).format('YYYY-MM-DD HH:mm:ss')),
            dayjs(moment(coupon.dateEnd).format('YYYY-MM-DD HH:mm:ss'))
          ]
        }
      });
    }
  }, [couponData, form]);

  const handleSubmit = (values: ICoupon) => {
    const { dateRangeStart } = values as { dateRangeStart: { dateRangeEnd: string[] } };
    const [start, end] = (dateRangeStart as { dateRangeEnd: string[] }).dateRangeEnd;

    const formattedValues: ICoupon = {
      ...values,
      dateStart: new Date(start),
      dateEnd: new Date(end)
    };

    updateCoupon(formattedValues)
      .unwrap()
      .then(() => {
        void message.success('Coupon updated successfully');
        onClose();
        form.resetFields();
      })
      .catch(() => {
        void message.error('Failed to update coupon');
      });
  };

  return (
    <Drawer
      title='Update Coupon'
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
            Update
          </Button>
        </div>
      }
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item name='_id' label='Coupon ID' rules={[{ required: true, message: 'Please enter the coupon ID!' }]}>
          <Input disabled placeholder='Coupon ID' />
        </Form.Item>
        <Form.Item
          name='code'
          label='Coupon Code'
          rules={[{ required: true, message: 'Please enter the coupon code!' }]}
        >
          <Input placeholder='Enter coupon code' />
        </Form.Item>
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

export default UpdateCouponDrawer;
