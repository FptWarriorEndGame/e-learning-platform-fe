import React, { useEffect, useState } from 'react';
import { Form, Checkbox, Button, notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getUserResponse, useUpdateUserMutation } from '../../client.service';
import { IUser } from '../../../../types/user.type';
import styles from './PrivacyForm.module.scss';

const PrivacyForm: React.FC<{ userData: getUserResponse | undefined, isSuccess: boolean, userId: string }> = ({ userData, isSuccess, userId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState({});

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleFormChange = (_: IUser, allValues: IUser) => {
    setIsFormChanged(JSON.stringify(allValues) !== JSON.stringify(formInitialValues));
  };

  useEffect(() => {
    if (isSuccess && userData) {
      const initialValues = {
        showProfile: userData.user.showProfile,
        showCourses: userData.user.showCourses
      };

      form.setFieldsValue(initialValues);
      setFormInitialValues(initialValues);
      setIsFormChanged(false);
    }
  }, [userData, isSuccess, form]);

  const [updateUser] = useUpdateUserMutation();

  const handleFinish = (values: IUser) => {
    onFinish(values).catch((error) => {
      console.error('Error during form submission:', error);
    });
  };



  const onFinish = async (values: IUser) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const value = values[key as keyof IUser];
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    try {
      const result = await updateUser({ userId, formData }).unwrap();
      notification.success({
        message: 'Success',
        description: result.message,
        placement: 'topRight',
      });
      setFormInitialValues(values);
      setIsFormChanged(false);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error updating profile',
        placement: 'topRight',
      });
    } finally {
      setLoading(false);
    }

  };
  return (
    <Form
      form={form}
      onValuesChange={handleFormChange}
      name='privacyForm'
      onFinish={handleFinish}
      scrollToFirstError
      className={styles.privacyForm}
    >
      <Form.Item name='showProfile' valuePropName='checked' className={styles.privacyForm__item}>
        <Checkbox className={styles.privacyForm__checkbox}>Show your profile to logged-in users</Checkbox>
      </Form.Item>

      <Form.Item name='showCourses' valuePropName='checked' className={styles.privacyForm__item}>
        <Checkbox className={styles.privacyForm__checkbox}>Show courses you're taking on your profile page</Checkbox>
      </Form.Item>

      <Form.Item className={styles.privacyForm__submit}>
        <Button type='primary' htmlType='submit' block disabled={!isFormChanged}>
          {loading ? <Spin indicator={antIcon} /> : 'Save '}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PrivacyForm;
