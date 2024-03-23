import React, { useEffect } from 'react';
import { Drawer, Form, Button, Input, message } from 'antd';
import { useUpdateCouponTypeMutation, useGetCouponTypeByIdQuery } from '../couponType.service';
import { ICouponType } from '../../../../types/couponType.type';

interface UpdateCouponTypeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  couponTypeId: string;
}

const UpdateCouponTypeDrawer: React.FC<UpdateCouponTypeDrawerProps> = ({ isOpen, onClose, couponTypeId }) => {
  const [form] = Form.useForm();
  const [updateCouponType] = useUpdateCouponTypeMutation();
  const { data: couponTypeData } = useGetCouponTypeByIdQuery(couponTypeId);

  useEffect(() => {
    if (couponTypeData) {
      form.setFieldsValue(couponTypeData.couponType);
    }
  }, [couponTypeData, form]);

  const handleSubmit = (values: ICouponType) => {
    updateCouponType({ ...values, _id: couponTypeId })
      .unwrap()
      .then(() => {
        void message.success('Coupon type updated successfully');
      })
      .catch(() => {
        void message.error('Failed to update coupon type');
      });
  };

  return (
    <Drawer
      title='Update Coupon Type'
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
        <Form.Item
          name='name'
          label='Coupon Type Name'
          rules={[{ required: true, message: 'Please input the coupon type name!' }]}
        >
          <Input placeholder='Input coupon type name' />
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea rows={4} placeholder='Input description' />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UpdateCouponTypeDrawer;
