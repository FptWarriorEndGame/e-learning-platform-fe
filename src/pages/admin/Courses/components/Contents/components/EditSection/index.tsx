/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { Drawer, Form, Input, Button, Radio, Space, notification } from 'antd';
import { ISection } from '../../../../../../../types/lesson.type';
import { useGetSectionsByCourseIdQuery, useUpdateSectionMutation } from '../../../../course.service';
import { useParams } from 'react-router-dom';

type EditSectionProps = {
  isVisible: boolean;
  onClose: () => void;
  section: ISection;
};

const EditSectionDrawer: React.FC<EditSectionProps> = ({ isVisible, onClose, section }) => {
  const [form] = Form.useForm();
  const courseId = useParams<{ courseId: string }>().courseId;
  const [currentSection, setCurrentSection] = useState<ISection | null>(null);
  const [updateSection, { isLoading }] = useUpdateSectionMutation();

  React.useEffect(() => {
    form.setFieldsValue({
      name: section.name,
      access: section.access,
      description: section.description
    });
  }, [section]);

  const handleFormSubmit = async (values: ISection) => {
    try {
      const updatedSection = await updateSection({ id: section._id, body: values }).unwrap();
      setCurrentSection(updatedSection);
      notification.success({ message: 'Section updated successfully' });
      onClose();
    } catch (error) {
      notification.error({ message: 'Failed to update section' });
    }
  };

  return (
    <Drawer title='Edit Section' placement='right' onClose={onClose} visible={isVisible} width={520}>
      <Form form={form} layout='vertical' onFinish={handleFormSubmit}>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter the section name' }]}>
          <Input placeholder='Please enter the section name here' />
        </Form.Item>
        <Form.Item name='access' label='Access' rules={[{ required: true, message: 'Please select access level' }]}>
          <Radio.Group>
            <Space direction='vertical'>
              <Radio value='DRAFT'>DRAFT</Radio>
              <Radio value='SOON'>SOON</Radio>
              <Radio value='FREE'>FREE</Radio>
              <Radio value='PAID'>PAID</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditSectionDrawer;
