/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Space, notification } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { IBlog } from '../../../../../types/blog.type';
import { BlogError } from '../../../../../utils/helpers';
import { useAddBlogMutation, useGetBlogQuery, useUpdateBlogMutation } from '../../blog.service';

interface CreateBlogProps {
  isOpen: boolean;
  onClose: () => void;
}
const AddBlog: React.FC<CreateBlogProps> = ({ isOpen, onClose }) => {
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const blogId = useSelector((state: RootState) => state.blog.blogId);
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const { data: blogData, isFetching } = useGetBlogQuery(blogId, {
    skip: !blogId
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (blogId && blogData) {
      form.setFieldsValue(blogData.blog);
    } else {
      form.setFieldsValue({
        userId: adminId
      });
    }
  }, [blogId, blogData, form, adminId]); // Include adminId in the dependency array

  const submitHandler = async (values: IBlog) => {
    try {
      const blogToSubmit = blogId ? { ...values, _id: blogId } : { ...values, userId: adminId }; // Use adminId if creating a new blog

      if (blogId) {
        await updateBlog(blogToSubmit).unwrap();
        notification.success({ message: 'Blog updated successfully' });
      } else {
        await addBlog(blogToSubmit).unwrap();
        notification.success({ message: 'Blog added successfully' });
      }
      form.resetFields();
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
        <Row>
          <Col span={12}>
            <Form.Item name='title' label='Title' rules={[{ required: true, message: 'Please enter blog title' }]}>
              <Input placeholder='Enter blog title' />
            </Form.Item>
            <Form.Item name='author' label='Author' rules={[{ required: true, message: 'Please enter author name' }]}>
              <Input placeholder='Enter author name' />
            </Form.Item>
            <Form.Item name='category' label='Category' rules={[{ required: true, message: 'Please enter category' }]}>
              <Input placeholder='Enter category' />
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
              <Input placeholder='Enter read time' />
            </Form.Item>
            <Form.Item name='userId' label='Admin ID' rules={[{ required: true, message: 'Please enter user ID' }]}>
              <Input placeholder='Enter user ID' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name='content'
              label='Content'
              rules={[{ required: true, message: 'Please enter blog content' }]}
            >
              <Input.TextArea rows={4} placeholder='Enter blog content' />
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
