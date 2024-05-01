/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { UploadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Form, Input, Select, Upload, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Option } from 'antd/es/mentions';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { IUser } from '../../../types/user.type';
import { useGetUserQuery, useUpdateUserSettingMutation } from '../Users/user.service';
import './setting.scss';

const Settings = () => {
  const [form] = Form.useForm();
  const userId = useSelector((state: RootState) => state.auth.adminId);
  const [updateUser] = useUpdateUserSettingMutation();
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

  useEffect(() => {
    if (user) {
      const initialValues = {
        name: user.user.name,
        username: user.user.username,
        email: user.user.email,
        role: user.user.role,
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
      <Breadcrumb className='breakcrumb'>
        <Breadcrumb.Item>
          <Link to='/author/welcome'>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Settings</Breadcrumb.Item>
      </Breadcrumb>
      <Card className='mt-2'>
        <Form form={form} layout='vertical' onFinish={onFinish} autoComplete='off' className='form-setting m-auto'>
          <Form.Item className='setting-avatar' label='Avatar' name='avatar'>
            {/* <img src={avatarUrl} alt='Avatar' style={{ width: '100px' }} /> */}
            <Upload beforeUpload={() => false} onChange={handleChange} multiple={false} fileList={fileList}>
              <Button icon={<UploadOutlined style={{ color: '#000' }} />}>Select Image</Button>
            </Upload>
          </Form.Item>
          <div className='setting-dlex'>
            <div className='setting-item'>
              <div className='setting-group'>
                <Form.Item
                  className='setting-group-item'
                  label='Name'
                  name='name'
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input placeholder='Enter your full name' />
                </Form.Item>
                <Form.Item
                  className='setting-group-item'
                  label='Role'
                  name='role'
                  rules={[{ required: true, message: 'Please input your role!' }]}
                >
                  <Input disabled placeholder='Enter your role' />
                </Form.Item>
                <Form.Item
                  className='setting-group-item'
                  label='Username'
                  name='username'
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input disabled placeholder='Enter your username' />
                </Form.Item>
              </div>
              <div className='setting-group'>
                <Form.Item
                  className='setting-group-item'
                  label='Email'
                  name='email'
                  rules={[{ type: 'email', message: 'The input is not a valid E-mail!' }]}
                >
                  <Input placeholder='Enter your email' />
                </Form.Item>
                <Form.Item
                  className='setting-group-item'
                  label='Phone'
                  name='phone'
                  rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                  <Input placeholder='Enter your phone' />
                </Form.Item>
              </div>
              <div className='setting-group'>
                <Form.Item label='Headline' name='headline' className='setting-group-item'>
                  <Input placeholder='Enter your headline' />
                </Form.Item>
                <Form.Item label='Website' name='website' className='setting-group-item'>
                  <Input placeholder='Enter your website (URL)' />
                </Form.Item>
              </div>
              <Form.Item
                label='Language'
                name='language'
                rules={[{ required: true, message: 'Please select your language!' }]}
              >
                <Select placeholder='Select a language'>
                  <Option value='en'>Vietnamese</Option>
                  <Option value='en'>English</Option>
                  <Option value='es'>Spanish</Option>
                  <Option value='pt'>Portuguese</Option>
                  <Option value='it'>Italian</Option>
                  <Option value='de'>German</Option>
                  <Option value='fr'>French</Option>
                </Select>
              </Form.Item>
            </div>
            <div className='setting-item'>
              <Form.Item label='Biography' name='biography'>
                <TextArea rows={5} placeholder='Enter your biography' />
              </Form.Item>
              {/* Social Media Links */}
              <div className='setting-group'>
                <Form.Item label='Twitter' name='twitter' className='setting-group-item'>
                  <Input placeholder='Enter your twitter (http://twitter.com/)' />
                </Form.Item>
                <Form.Item label='Facebook' name='facebook' className='setting-group-item'>
                  <Input placeholder='Enter your facebook (http://facebook.com/)' />
                </Form.Item>
              </div>
              <div className='setting-group'>
                <Form.Item label='LinkedIn' name='linkedin' className='setting-group-item'>
                  <Input placeholder='Enter your linkedin (http://linkedin.com/in/)' />
                </Form.Item>
                <Form.Item label='YouTube' name='youtube' className='setting-group-item'>
                  <Input placeholder='Enter your youtube (http://youtube.com/)' />
                </Form.Item>
              </div>
            </div>
          </div>
          <Form.Item className='setting-btn'>
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
