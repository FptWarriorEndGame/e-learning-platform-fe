/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Card, Form, Input, Select, Upload, notification } from 'antd';
import { Link } from 'react-router-dom';
import './setting.scss';
import TextArea from 'antd/es/input/TextArea';
import { Option } from 'antd/es/mentions';
import { UploadOutlined } from '@ant-design/icons';
import { useGetUserQuery, useUpdateUserMutation } from '../Users/user.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IUser } from '../../../types/user.type';
import { UploadChangeParam } from 'antd/lib/upload/interface';

const Settings = () => {
  const [form] = Form.useForm();
  const userId = useSelector((state: RootState) => state.auth.adminId);
  const [updateUser] = useUpdateUserMutation();
  const { data: user } = useGetUserQuery(userId);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [fileList, setFileList] = useState<any[]>([]);

  const handleChange = (info: UploadChangeParam) => {
    setFileList(info.fileList);
  };

  const onFinish = async (formData: Omit<IUser, '_id'>) => {
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        formData = { ...formData, avatar: event.target?.result };
      };
      reader.readAsDataURL(file.originFileObj);
    });

    const updatedUser = {
      _id: userId,
      body: formData
    };

    updateUser(updatedUser)
      .unwrap()
      .then((result) => {
        notification.success({
          message: 'Update User successfully',
          description: 'Update User successfully',
          duration: 2
        });
      })
      .catch((error: any) => {
        notification.error({
          message: 'Update User failed',
          description: error.message
        });
      });
  };

  +useEffect(() => {
    if (user) {
      const initialValues = {
        name: user.user.name,
        username: user.user.username,
        email: user.user.email,
        phone: user.user.phone,
        headline: user.user.headline,
        biography: user.user.biography,
        website: user.user.website,
        twitter: user.user.twitter,
        facebook: user.user.facebook,
        linkedin: user.user.linkedin,
        youtube: user.user.youtube,
        language: user.user.language
      };
      form.setFieldsValue(initialValues);
      setFormInitialValues(initialValues);
    }
  }, [user, form]);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/author/welcome'>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Settings</Breadcrumb.Item>
      </Breadcrumb>
      <Card className='mt-2'>
        <Form form={form} layout='vertical' onFinish={onFinish} autoComplete='off' className='w-3/5 m-auto'>
          <Form.Item label='Avatar' name='avatar'>
            <Upload beforeUpload={() => false} onChange={handleChange} multiple={false} fileList={fileList}>
              <Button icon={<UploadOutlined style={{ color: '#000' }} />}>Select Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input placeholder='Enter your full name' />
          </Form.Item>
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder='Enter your username' />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ type: 'email', message: 'The input is not a valid E-mail!' }]}
          >
            <Input placeholder='Enter your email' />
          </Form.Item>
          <Form.Item
            label='Phone'
            name='phone'
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input placeholder='Enter your phone' />
          </Form.Item>
          <Form.Item label='Headline' name='headline'>
            <Input placeholder='Enter your headline' />
          </Form.Item>
          <Form.Item label='Biography' name='biography'>
            <TextArea rows={4} placeholder='Enter your biography' />
          </Form.Item>
          <Form.Item label='Website' name='website'>
            <Input placeholder='Enter your website (URL)' />
          </Form.Item>
          {/* Social Media Links */}
          <Form.Item label='Twitter' name='twitter'>
            <Input placeholder='Enter your twitter (http://twitter.com/)' />
          </Form.Item>
          <Form.Item label='Facebook' name='facebook'>
            <Input placeholder='Enter your facebook (http://facebook.com/)' />
          </Form.Item>
          <Form.Item label='LinkedIn' name='linkedin'>
            <Input placeholder='Enter your linkedin (http://linkedin.com/in/)' />
          </Form.Item>
          <Form.Item label='YouTube' name='youtube'>
            <Input placeholder='Enter your youtube (http://youtube.com/)' />
          </Form.Item>
          <Form.Item
            label='Language'
            name='language'
            rules={[{ required: true, message: 'Please select your language!' }]}
          >
            <Select placeholder='Select a language'>
              <Option value='en'>English</Option>
              <Option value='es'>Spanish</Option>
              <Option value='pt'>Portuguese</Option>
              <Option value='it'>Italian</Option>
              <Option value='de'>German</Option>
              <Option value='fr'>French</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default Settings;
