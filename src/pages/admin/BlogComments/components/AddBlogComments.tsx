/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Drawer, Form, Input, Select, notification } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { IBlogComment } from '../../../../types/blogComments.type';
import {
  useCreateBlogCommentsMutation,
  useGetBlogCommentsByIdQuery,
  useUpdateBlogCommentsMutation
} from '../blogComments.service';
import { IBlog } from '../../../../types/blog.type';
import { Option } from 'antd/es/mentions';

interface CreateBlogCommentsProps {
  isOpen: boolean;
  onClose: () => void;
  blog: IBlog[];
}

const AddBlogComments: React.FC<CreateBlogCommentsProps> = ({ isOpen, onClose, blog }) => {
  const [addCommentsBlog] = useCreateBlogCommentsMutation();
  const [updateCommentsBlog] = useUpdateBlogCommentsMutation();
  const commentId = useSelector((state: RootState) => state.blogComments.commentId);
  const blogId = useSelector((state: RootState) => state.blogComments.blogId);
  const adminId = useSelector((state: RootState) => state.auth.adminId);

  const { data: blogResponse, isFetching } = useGetBlogCommentsByIdQuery(blogId, {
    skip: !blogId
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (commentId && blogResponse) {
      form.setFieldsValue(blogResponse.comments);
    } else {
      form.resetFields();
      form.setFieldsValue({ userId: adminId });
    }
  }, [commentId, blogResponse, form, adminId]);

  const handleClose = () => {
    onClose();
  };

  const submitHandler = async (values: IBlogComment) => {
    try {
      const blogCommentsToSubmit = commentId ? { ...values, _id: commentId } : values;
      if (commentId) {
        await updateCommentsBlog(blogCommentsToSubmit).unwrap();
        notification.success({ message: 'Category updated successfully' });
      } else {
        await addCommentsBlog(blogCommentsToSubmit).unwrap();
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
      title={commentId ? 'Edit Blog Comments' : 'Create a new Blog Comments'}
      width={720}
      onClose={handleClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout='vertical' onFinish={submitHandler}>
        <Form.Item
          name='content'
          label='Comment with blog'
          rules={[{ required: false, message: 'Please enter content' }]}
        >
          <Input placeholder='Enter content' />
        </Form.Item>
        <Form.Item name='userId' label='Admin ID' rules={[{ required: true, message: 'Please enter user ID' }]}>
          <Input placeholder='Enter user ID' />
        </Form.Item>

        <Form.Item name='blogId' label='Blog Name' rules={[{ required: true, message: 'Please select a category' }]}>
          <Select placeholder='Select a blog' className='mb-4'>
            {blog
              .filter((blogs) => !blogs.isDeleted)
              .map((blogs) => (
                <Option key={blogs._id} value={blogs._id}>
                  {blogs.title}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {blogId ? 'Update Blog Comments' : 'Add Blog Comments'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddBlogComments;
