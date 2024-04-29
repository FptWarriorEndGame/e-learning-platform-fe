/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Col, Drawer, Form, Input, Row, Select, TimePicker, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { IBlog } from '../../../../../types/blog.type';
import { ICategoryBlogs } from '../../../../../types/categoryBlogs.type';
import { useAddBlogMutation, useGetBlogQuery, useUpdateBlogMutation } from '../../blog.service';
import ReactQuill from 'react-quill';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

interface CreateBlogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ICategoryBlogs[];
}

const AddBlog: React.FC<CreateBlogProps> = ({ isOpen, onClose, categories }) => {
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const blogId = useSelector((state: RootState) => state.blog.blogId);
  const userID = useSelector((state: RootState) => state.auth.adminId);
  const { data: blogData } = useGetBlogQuery(blogId, { skip: !blogId });
  const [content, setContent] = useState('');

  const [form] = Form.useForm();

  useEffect(() => {
    setContent(blogData?.blog.content || '');
  }, [blogId, blogData, form]);

  useEffect(() => {
    if (blogId && blogData) {
      const initialValues = {
        ...blogData.blog,
        tags: blogData.blog.tags.join(', '),
        readTime: blogData.blog.readTime ? moment(blogData.blog.readTime, 'HH:mm') : undefined
      };
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [blogId, blogData, form]);

  const submitHandler = async (values: Omit<IBlog, 'content'>) => {
    try {
      const blogToSubmit = {
        ...values,
        readTime: values.readTime ? values.readTime.format('HH:mm') : undefined,
        content,
        userId: userID,
        _id: blogId ? blogId : undefined
      };
      if (blogId) {
        await updateBlog(blogToSubmit).unwrap();
        notification.success({ message: 'Blog updated successfully' });
      } else {
        await addBlog(blogToSubmit).unwrap();
        notification.success({ message: 'Blog added successfully' });
      }
      form.resetFields();
      setContent('');
      onClose();
    } catch (error) {
      notification.error({ message: 'Operation failed', description: 'An error occurred' });
    }
  };

  return (
    <Drawer
      title={blogId ? 'Edit Blog' : 'Create a new Blog'}
      width={720}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout='vertical' onFinish={submitHandler}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Please enter blog title' }]}>
              <Input placeholder='Enter blog title' />
            </Form.Item>
            <Form.Item
              name='thumbnail'
              label='Thumbnail'
              rules={[{ required: true, message: 'Please enter Thumbnail' }]}
            >
              <Input placeholder='Enter Thumbnail' />
            </Form.Item>
            <Form.Item name='tags' label='Tags'>
              <Input placeholder='Enter tags' />
            </Form.Item>
            <Form.Item
              name='technology'
              label='Technology'
              rules={[{ required: true, message: 'Please enter technology used' }]}
            >
              <Input placeholder='Enter technology used' />
            </Form.Item>
            <Form.Item
              name='categoryId'
              label='Category'
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select placeholder='Select a category'>
                {categories
                  .filter((category) => !category.isDeleted)
                  .map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='blogImg'
              label='Blog Image URL'
              rules={[{ required: true, message: 'Please enter blog image URL' }]}
            >
              <Input placeholder='Enter blog image URL' />
            </Form.Item>
            <Form.Item
              name='readTime'
              label='Read Time'
              rules={[{ required: true, message: 'Please enter read time' }]}
            >
              <TimePicker placeholder='Enter read time' format='HH:mm' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label='Content' required>
              <ReactQuill theme='snow' value={content} onChange={setContent} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {blogId ? 'Update Blog' : 'Add Blog'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddBlog;
