import React from 'react';
import { Button, Checkbox, Input, Form, notification } from 'antd';
import { IContact } from '../../../types/contact.type';
import { useCreateFeedbackMutation } from '../client.service';

const { TextArea } = Input;

import './Contact.scss';

const Contact: React.FC = () => {
  const [createFeedback] = useCreateFeedbackMutation();
  const [form] = Form.useForm();

  const handleFormSubmit = (values: IContact) => {
    createFeedback(values)
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Success',
          description: 'Your feedback information has been successfully sent.',
          placement: 'topRight'
        });
      })
      .catch(() => {
        notification.error({
          message: 'Error',
          description: 'There was an error sending your feedback information. Please try again.',
          placement: 'topRight'
        });
      });

    form.resetFields();
  };

  return (
    <div className='contact'>
      <div className='container px-4 md:px-0 my-24 mx-auto'>
        <section className='mb-32 text-center'>
          <div className='mx-auto max-w-[500px] md:max-w-[700px] lg:max-w-[900px] flex flex-col	flex-wrap'>
            <h2 className='contact__title mb-12 text-3xl font-bold pt-6'>Contact us</h2>
            <Form form={form} onFinish={handleFormSubmit}>
              <Form.Item name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input placeholder='Enter your name' />
              </Form.Item>
              <Form.Item name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input placeholder='Enter your email' />
              </Form.Item>
              <Form.Item name='message' rules={[{ required: true, message: 'Please input your message!' }]}>
                <TextArea placeholder='Your message' />
              </Form.Item>
              <Form.Item className='remember'>
                <Checkbox>Remember</Checkbox>
              </Form.Item>
              <Form.Item >
                <Button className='contact-btn' type='primary' htmlType='submit' style={{ width: '100%' }}>
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
