import React from 'react';
import { Drawer, Form, Button, Input, message } from 'antd';
import { usePostCouponTypeMutation } from '../couponType.service';
import { ICouponType } from '../../../../types/couponType.type';

interface CreateCouponTypeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCouponTypeDrawer: React.FC<CreateCouponTypeDrawerProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm();
  const [postCouponType] = usePostCouponTypeMutation();

  const handleSubmit = (values: ICouponType) => {
    postCouponType(values)
      .unwrap()
      .then(() => {
        void message.success('Coupon type created successfully');
        onClose();
        form.resetFields();
      })
      .catch(() => {
        void message.error('Failed to create coupon type');
      });
  };

  return (
    <Drawer
      title='Create New Coupon Type'
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

export default CreateCouponTypeDrawer;
