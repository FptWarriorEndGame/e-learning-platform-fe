/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Space, notification } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useAddCategoryMutation, useGetCategoryByIdQuery, useUpdateCategoryMutation } from '../categoriesBlog.service';
import { ICategoryBlogs } from '../../../../types/categoryBlogs.type';

interface CreateCategoryBlogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoriesBlog: React.FC<CreateCategoryBlogProps> = ({ isOpen, onClose }) => {
  const [addCategoryBlog] = useAddCategoryMutation();
  const [updateCategoryBlog] = useUpdateCategoryMutation();
  const categoryId = useSelector((state: RootState) => state.blogCategories.BlogcategoryId);

  const { data: categoriesResponse, isFetching } = useGetCategoryByIdQuery(categoryId, {
    skip: !categoryId
  });
  console.log(categoriesResponse);

  const [form] = Form.useForm();

  useEffect(() => {
    if (categoryId && categoriesResponse && categoriesResponse.blogsCategories) {
      form.setFieldsValue({
        name: categoriesResponse.blogsCategories.name,
        description: categoriesResponse.blogsCategories.description
      });
    }
  }, [categoryId, categoriesResponse, form]);

  const submitHandler = async (values: ICategoryBlogs) => {
    try {
      const categoryToSubmit = categoryId ? { ...values, _id: categoryId } : values;
      console.log(categoryToSubmit);

      if (categoryId) {
        await updateCategoryBlog(categoryToSubmit).unwrap();
        notification.success({ message: 'Category updated successfully' });
      } else {
        await addCategoryBlog(categoryToSubmit).unwrap();
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
      title={categoryId ? 'Edit Category Blog' : 'Create a new Category Blog'}
      width={720}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout='vertical' onFinish={submitHandler}>
        <Form.Item
          name='name'
          label='Category Name'
          rules={[{ required: true, message: 'Please enter category name' }]}
        >
          <Input placeholder='Enter category name' />
        </Form.Item>

        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please enter category description' }]}
        >
          <Input.TextArea rows={4} placeholder='Enter category description' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {categoryId ? 'Update Category Blog' : 'Add Category Blog'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddCategoriesBlog;
