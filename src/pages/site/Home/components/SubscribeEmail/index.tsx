/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import './SubscribeEmail.scss';
import { useCreateSubscribeMutation } from '../../../client.service';
import { ISubscribe } from '../../../../../types/subscribe.type';
import { Button, Col, Drawer, Form, Input, Row, Select, notification } from 'antd';
export default function SubscribeEmail() {
  const [form] = Form.useForm();
  const [addSubscribe,{ isLoading, isSuccess, isError, error }] = useCreateSubscribeMutation();
  const submitHandler = async (values: ISubscribe) => {
    try {
      const subscribeToSubmit = values;
        await addSubscribe(subscribeToSubmit).unwrap();
        notification.success({ message: 'Subscription added successfully' });
        form.resetFields();
        console.log('addSubscribe',addSubscribe);
        
    } catch (error:any) {
      notification.error({ message: 'Operation failed', description: 'An error occurred' });
    }
  };
  return (
    <div className='subscribeemail'>
      <div className='container'>
        <div className='subscribeemail-list'>
          <div className='subscribeemail-item'>
            <p className='subscribeemail-mess'>JOIN THE COMMUNITY</p>
            <h2 className='subscribeemail-title'>Stay current. Subscribe to our newsletter.</h2>
            {/* <form action='' className='subscribeemail-box'>
              <div className='subscribeemail-input'>
                <input type='email' name='' id='' placeholder='Email address' />
              </div>
              <div className='subscribeemail-submit'>
                <button className='btn' type='submit' >
                  Join us now!
                </button>
              </div>
            </form> */}
            <Form onFinish={submitHandler} className='subscribeemail-box'>
              <Form.Item
              className='subscribeemail-input'
                name='email'
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input className='input' placeholder='Email address' />
              </Form.Item>
              <Form.Item className='subscribeemail-submit'>
                <Button type='primary' htmlType='submit' className='subscribeemail-submit-btn'>
                  Join us now!
                </Button>
              </Form.Item>
            </Form>
            <p className='subscribeemail-desc'>
              Our weekly email newsletter, is an indispensable weekly digest of the latest updates on industry insights,
              latest news and opportunities.
              <br />
              <br />
              Anyone can subscribe. Just fill in your email address above. It's easy to unsubscribe or change your
              preferences whenever you wish.
            </p>
          </div>
          <div className='subscribeemail-item'>
            <div className='subscribeemail-img'>
              <img src='https://i.imgur.com/Ufc9Fxj.png' alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className='learnworlds-divider-wrapper on-bottom js-learnworlds-divider js-learnworlds-divider-bottom js-learnworlds-divider-triangle -learnworlds-divider-triangle lw-light-fill'>
        <svg
          className='learnworlds-divider'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1000 100'
          preserveAspectRatio='none'
        >
          <path className='learnworlds-divider-fill js-learnworlds-divider-fill' d='M0,6V0h1000v100L0,6z'></path>
        </svg>
      </div>
    </div>
  );
}
