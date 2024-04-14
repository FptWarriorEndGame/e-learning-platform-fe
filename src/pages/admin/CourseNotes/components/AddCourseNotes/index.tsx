/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Drawer, Form, Input, InputNumber, Select, notification } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { INote } from '../../../../../types/note.type';

import {
  useCreateNoteMutation,
  useGetAllCoursesQuery,
  useGetLessonsQuery,
  useGetNoteByIdQuery,
  useUpdateNoteMutation
} from '../../courseNotes.service';

interface AddCourseNoteProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCourseNotes: React.FC<AddCourseNoteProps> = ({ isOpen, onClose }) => {
  const [addCourseNote] = useCreateNoteMutation();
  const [updateCourseNote] = useUpdateNoteMutation();
  const noteId = useSelector((state: RootState) => state.noteCourse.courseNotesId);
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const { data: lessons, isFetching: isFetchingLession } = useGetLessonsQuery();

  const { data: course, isFetching: isFetchingCourse } = useGetAllCoursesQuery();

  const { data: noteResponse, isFetching } = useGetNoteByIdQuery(noteId, {
    skip: !noteId
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (noteResponse && !isFetching) {
      form.setFieldsValue({
        ...noteResponse,
        lessonId:
          typeof noteResponse.notes?.lessonId !== 'string'
            ? noteResponse.notes?.lessonId._id
            : noteResponse.notes?.lessonId,
        courseId:
          typeof noteResponse.notes?.courseId !== 'string'
            ? noteResponse.notes?.courseId._id
            : noteResponse.notes?.courseId
      });
    } else {
      form.resetFields();
    }
  }, [form, noteId, noteResponse, isFetching]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const submitHandler = async (values: Omit<INote, '_id'>) => {
    try {
      const { courseId, lessonId, ...rest } = values;
      const payload = {
        ...rest,
        adminId: adminId,
        lessonId: lessonId,
        courseId: courseId
      };
      if (noteId) {
        await updateCourseNote({
          ...payload,
          id: noteId
        }).unwrap();
        notification.success({ message: 'Note updated successfully' });
      } else {
        await addCourseNote(payload).unwrap();
        notification.success({ message: 'Note added successfully' });
      }
      handleClose();
    } catch (error) {
      console.error('Error: ', error);
      notification.error({ message: 'Operation failed', description: 'An error occurred' });
    }
  };

  return (
    <Drawer
      title={noteId ? 'Edit Course Note' : 'Create a New Course Note'}
      width={720}
      onClose={handleClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout='vertical' onFinish={submitHandler}>
        <Form.Item name='content' label='Content' rules={[{ required: true, message: 'Please enter the content' }]}>
          <Input placeholder='Enter the content' />
        </Form.Item>
        {/* <Form.Item name='courseId' label='Course name' rules={[{ required: true, message: 'Please enter the Course' }]}>
          <Select placeholder='Select a course'>
            {course?.courses.map((course) => (
              <Select.Option key={course._id} value={course._id}>
                {course.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='lessonId' label='Lesson name' rules={[{ required: true, message: 'Please enter the Lesson' }]}>
          <Select placeholder='Select a lesson'>
            {lessons?.lessons.map((lesson) => (
              <Select.Option key={lesson._id} value={lesson._id}>
                {lesson.name}
              </Select.Option>
            ))}
          </Select> */}
        {/* </Form.Item> */}

        <Form.Item
          name='videoMinute'
          label='Video Minute'
          rules={[{ required: true, message: 'Please enter the video minute' }]}
        >
          <InputNumber min={0} placeholder='Enter the video minute' style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {noteId ? 'Update Course Note' : 'Add Course Note'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddCourseNotes;
