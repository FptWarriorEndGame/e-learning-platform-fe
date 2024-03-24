import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { IUser, UserRole } from '../../../../../types/user.type';
import { UserError } from '../../../../../utils/errorHelpers';
import { useAddUserMutation, useGetUserQuery, useUpdateUserMutation } from '../../user.service';
import type { UploadFile } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload/interface';

const { Option } = Select;

interface AddUserProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState: IUser = {
  _id: '',
  name: '',
  email: '',
  phone: '',
  password: '',
  role: UserRole.USER
};

interface FormValues extends Omit<IUser, '_id' | 'avatar'> {
  avatar?: UploadFile[];
}

const AddUser: React.FC<AddUserProps> = (props) => {
  const [formData, setFormData] = useState<IUser>(initialState);
  const [addUser, addUserResult] = useAddUserMutation();
  const [updateUser, updateUserResult] = useUpdateUserMutation();
  const [form] = Form.useForm();
  const userId = useSelector((state: RootState) => state.user.userId);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const { data } = useGetUserQuery(userId, {
    skip: !userId
  });

  const submitHandler = (formData: Omit<IUser, '_id'>) => {
    const newUser: Omit<IUser, '_id'> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      password: formData.password,
      avatar: formData.avatar,
      status: 'ACTIVE',
      username: formData.username
    };

    if (fileList.length > 0 && fileList[0].originFileObj) {
      newUser.avatar = fileList[0].originFileObj;
    }

    if (userId) {
      updateUser({
        _id: userId,
        body: newUser
      })
        .unwrap()
        .then((result) => {
          props.onClose();

          notification.success({
            message: 'Update User',
            description: 'Update user successfully!'
          });
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    } else {
      addUser(newUser)
        .then((result) => {
          props.onClose();
          notification.success({
            message: 'Add User',
            description: 'Add user successfully!'
          });
        })
        .catch((error: UserError) => {
          notification.error({
            message: 'Add User failed',
            description: error.data.message
          });
        });
    }
  };

  useEffect(() => {
    if (data && userId) {
      setFormData(data.user);
      form.setFieldsValue(data.user);
    } else {
      form.setFieldsValue({
        _id: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        avatar: '',
        role: UserRole.USER
      });
    }
  }, [data, form, userId]);

  const handleFileChange = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
  };

  return (
    <>
      <Drawer
        title={userId ? 'Edit User' : 'Add a new User'}
        width={820}
        onClose={props.onClose}
        open={props.isOpen}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={props.onClose}>Cancel</Button>
          </Space>
        }
      >
        <Row>
          <Col md={24}>
            <Form form={form} layout='vertical' hideRequiredMark onFinish={submitHandler}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter user name' }]}>
                    <Input placeholder='Please enter user name' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='email'
                    label='Email'
                    rules={[{ required: true, message: 'Please enter your email' }]}
                  >
                    <Input style={{ width: '100%' }} placeholder='Please enter email' />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name='phone' label='Phone'>
                    <Input placeholder='Enter your phone' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    className='w-full'
                    name='role'
                    label='Role'
                    rules={[{ required: true, message: 'Please select an owner' }]}
                  >
                    <Select className='w-full' placeholder='Please select a role'>
                      <Option value='Admin'>Admin</Option>
                      <Option value='User'>User</Option>
                      <Option value='Author'>Author</Option>
                      <Option value='Employee'>Employee</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name='avatar' label='Avatar'>
                    <Upload beforeUpload={() => false} onChange={handleFileChange} fileList={fileList}>
                      <Button icon={<UploadOutlined style={{ color: '#000' }} />}>Select File</Button>
                    </Upload>
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
                  <Form.Item
                    name='courses'
                    label='Select a course'
                    rules={[{ required: true, message: 'Please choose the type' }]}
                  >
                    <Select placeholder='Courses want to enroll'>
                      <Option value='private'>HTML CSS</Option>
                      <Option value='public'>Javascript</Option>
                    </Select>
                  </Form.Item>
                </Col> */}
                <Col span={12}>
                  <Form.Item name='username' label='Username' rules={[{ required: true, message: 'Please input your username' }]}>
                    <Input placeholder='Username' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {!userId && (
                    <Form.Item
                      name='password'
                      label='Password'
                      rules={[{ required: true, message: 'Please enter the password' }]}
                    >
                      <Input.Password type='password' placeholder='password' />
                    </Form.Item>
                  )}
                </Col>
              </Row>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default AddUser;
