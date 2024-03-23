/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Drawer, Form, Input, Select, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { IDiscuss } from '../../../../types/discuss.type';
import { useCreateDiscussMutation, useGetDiscussionByIdQuery, useUpdateDiscussMutation } from '../discuss.service';
import { ICourse } from '../../../../types/course.type';
import { useGetSectionsByCourseIdQuery } from '../../Courses/course.service';
import { ISection } from '../../../../types/lesson.type';

interface CreateDiscussProps {
  isOpen: boolean;
  onClose: () => void;
  course: ICourse[];
}

const AddDiscuss: React.FC<CreateDiscussProps> = ({ isOpen, onClose, course }) => {
  const [addDiscuss] = useCreateDiscussMutation();
  const [updateDiscuss] = useUpdateDiscussMutation();
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const discussId = useSelector((state: RootState) => state.discuss.discussId);

  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const { data: sectionsData, isFetching: isFetchingSections } = useGetSectionsByCourseIdQuery(selectedCourseId, {
    skip: !selectedCourseId
  });

  const { data: discussResponse, isFetching } = useGetDiscussionByIdQuery(discussId, {
    skip: !discussId
  });

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ userId: adminId });
  }, [form, adminId]);

  useEffect(() => {
    if (discussId && discussResponse) {
      form.setFieldsValue(discussResponse.discuss);
      form.setFieldsValue({ userId: adminId });
    } else {
      form.resetFields();
      form.setFieldsValue({ userId: adminId });
    }
  }, [discussId, discussResponse, form, adminId]);

  const handleClose = () => {
    onClose();
  };

  const handleCourseChange = (value: string) => {
    setSelectedCourseId(value);
    form.setFieldsValue({ sectionId: undefined }); // Reset section selection
  };

  const submitHandler = async (values: IDiscuss) => {
    try {
      const DiscussToSubmit = discussId ? { ...values, _id: discussId } : values;
      if (discussId) {
        await updateDiscuss(DiscussToSubmit).unwrap();
        notification.success({ message: 'Category updated successfully' });
      } else {
        await addDiscuss(DiscussToSubmit).unwrap();
        notification.success({ message: 'Category added successfully' });
      }
      form.resetFields();
      onClose();
    } catch (error) {
      notification.error({ message: 'Operation failed', description: 'An error occurred' });
    }
  };

  return (
    <Drawer
      title={discussId ? 'Edit Discuss' : 'Create a new Discuss'}
      width={720}
      onClose={handleClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout='vertical' onFinish={submitHandler}>
        <Form.Item name='comments' label='Comments' rules={[{ required: false, message: 'Please enter content' }]}>
          <Input placeholder='Enter content' />
        </Form.Item>
        <Form.Item name='courseId' label='Course' rules={[{ required: true, message: 'Please select a course' }]}>
          <Select placeholder='Select a course' loading={isFetching} onChange={handleCourseChange}>
            {course.map((c) => (
              <Select.Option key={c._id} value={c._id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name='lessonId' label='Section' rules={[{ required: true, message: 'Please select a section' }]}>
          <Select placeholder='Select a section' loading={isFetchingSections}>
            {sectionsData?.sections.map((s: ISection) => (
              <Select.Option key={s._id} value={s._id}>
                {s.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name='userId' label='Admin ID' rules={[{ required: true, message: 'Please enter user ID' }]}>
          <Input placeholder='Enter user ID' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {discussId ? 'Update Discuss' : 'Add Discuss'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddDiscuss;
