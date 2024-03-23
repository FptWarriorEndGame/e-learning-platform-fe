import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Select, notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './ProfileForm.module.scss';
import { getUserResponse, useUpdateUserMutation } from '../../client.service';
import { IUser } from '../../../../types/user.type';

const ProfileForm: React.FC<{ userData: getUserResponse | undefined, isSuccess: boolean, userId: string }> = ({ userData, isSuccess, userId }) => {
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
          name: userData.user.name,
          email: userData.user.email,
          phone: userData.user.phone,
          headline: userData.user.headline,
          biography: userData.user.biography,
          website: userData.user.website,
          twitter: userData.user.twitter,
          facebook: userData.user.facebook,
          linkedin: userData.user.linkedin,
          youtube: userData.user.youtube,
          language: userData.user.language
      };

      form.setFieldsValue(initialValues);
      setFormInitialValues(initialValues);
      setIsFormChanged(false);
    }
  }, [userData, isSuccess, form]);

  const [updateUser] = useUpdateUserMutation();

  const { Option } = Select;

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
    <Form onValuesChange={handleFormChange} form={form} layout='vertical' onFinish={handleFinish} requiredMark={false} className={styles.profileForm}>
      <Row gutter={{ xs: 24, lg: 32 }}>
        <Col xs={24} md={18} lg={12}>
          <Form.Item
            name='name'
            label='Full Name'
            className={styles.profileForm__item}
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input className={styles.profileForm__input} />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            className={styles.profileForm__item}
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              }
            ]}
          >
            <Input className={styles.profileForm__input} />
          </Form.Item>

          <Form.Item
            name='phone'
            label='Phone'
            className={styles.profileForm__item}
            rules={[
              {
                required: true,
                message: 'Please input your phone number!'
              },
              {
                pattern: new RegExp(/^[0-9+\-\s()]+$/),
                message: 'Please input a valid phone number!'
              }
            ]}
          >
            <Input className={styles.profileForm__input} />
          </Form.Item>

          <Form.Item
            name='headline'
            label='Headline'
            className={styles.profileForm__item}
            rules={[{ required: true, message: 'Please input your headline!' }]}
          >
            <Input className={styles.profileForm__input} placeholder='Instructor at E-Learning' />
          </Form.Item>

          <Form.Item
            name='biography'
            label='Biography'
            className={`${styles.profileForm__item} mb-0`}
            rules={[{ required: true, message: 'Please input your biography!' }]}
          >
            <Input.TextArea
              rows={4}
              className={`${styles.profileForm__input} ${styles['profileForm__input--textarea']}`}
              placeholder='Share something about yourself'
            />
          </Form.Item>
          <div className={styles.profileForm__bioHint}>
            To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and
            Personality. Your biography should have at least 50 words, links and coupon codes are not permitted.
          </div>

          <Form.Item
            name='language'
            label='Language'
            className={styles.profileForm__item}
            rules={[{ required: true, message: 'Please select your language!' }]}
          >
            <Select
              className={`${styles.profileForm__input} ${styles['profileForm__input--select']}`}
              placeholder='Select a language'
              optionFilterProp='children'
            >
              <Option value='en'>English</Option>
              <Option value='es'>Spanish</Option>
              <Option value='pt'>Portuguese</Option>
              <Option value='it'>Italian</Option>
              <Option value='de'>German</Option>
              <Option value='fr'>French</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={18} lg={12}>
          <Form.Item name='website' className={styles.profileForm__item} label='Website'>
            <Input className={styles.profileForm__input} placeholder='Url' />
          </Form.Item>

          <Form.Item name='twitter' className={styles.profileForm__item} label='Twitter'>
            <Input
              className={`${styles.profileForm__input} ${styles['profileForm__input--social']}`}
              addonBefore='http://twitter.com/'
              placeholder='Username'
            />
          </Form.Item>

          <Form.Item name='facebook' className={styles.profileForm__item} label='Facebook'>
            <Input
              className={`${styles.profileForm__input} ${styles['profileForm__input--social']}`}
              addonBefore='http://facebook.com/'
              placeholder='Username'
            />
          </Form.Item>

          <Form.Item name='linkedin' className={styles.profileForm__item} label='LinkedIn'>
            <Input
              className={`${styles.profileForm__input} ${styles['profileForm__input--social']}`}
              addonBefore='http://linkedin.com/in/'
              placeholder='Resource ID'
            />
          </Form.Item>

          <Form.Item name='youtube' className={styles.profileForm__item} label='Youtube'>
            <Input
              className={`${styles.profileForm__input} ${styles['profileForm__input--social']}`}
              addonBefore='http://youtube.com/'
              placeholder='Username'
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item className={styles.profileForm__submit}>
        <Button type='primary' htmlType='submit' block disabled={!isFormChanged}>
          {loading ? <Spin indicator={antIcon} /> : 'Save '}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
