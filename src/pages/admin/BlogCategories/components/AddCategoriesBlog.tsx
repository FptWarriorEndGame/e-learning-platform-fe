/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Drawer, Form, Input, Upload, notification } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ICategoryBlogs } from '../../../../types/categoryBlogs.type';
import {
  useCreateBlogCategoryMutation,
  useGetBlogCategoryByIdQuery,
  useUpdateBlogCategoryMutation
} from '../categoriesBlog.service';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload/interface';

interface CreateCategoryBlogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCategoriesBlog: React.FC<CreateCategoryBlogProps> = ({ isOpen, onClose }) => {
  const [addCategoryBlog] = useCreateBlogCategoryMutation();
  const [updateCategoryBlog] = useUpdateBlogCategoryMutation();
  const BlogcategoryId = useSelector((state: RootState) => state.blogCategories.BlogcategoryId);
  const [fileList, setFileList] = React.useState<any[]>([]);
  const { data: categoryResponse, isFetching } = useGetBlogCategoryByIdQuery(BlogcategoryId, {
    skip: !BlogcategoryId
  });

  const [form] = Form.useForm();

  const handleChange = (info: UploadChangeParam) => {
    setFileList(info.fileList);
  };

  useEffect(() => {
    if (BlogcategoryId && categoryResponse) {
      form.setFieldsValue(categoryResponse.blogsCategories);
    } else {
      form.resetFields();
    }
  }, [BlogcategoryId, categoryResponse, form]);

  const handleClose = () => {
    onClose();
  };

  const submitHandler = async (values: ICategoryBlogs) => {
    try {
      const categoryToSubmit = BlogcategoryId ? { ...values, _id: BlogcategoryId } : values;
      if (BlogcategoryId) {
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
      title={BlogcategoryId ? 'Edit Category Blog' : 'Create a new Category Blog'}
      width={720}
      onClose={handleClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form form={form} layout='vertical' onFinish={submitHandler}>
        <Form.Item name='cateImage' label='Cate Image' rules={[{ required: true, message: 'Please enter cate image' }]}>
          <Upload beforeUpload={() => false} onChange={handleChange} multiple={false} fileList={fileList}>
            <Button icon={<UploadOutlined style={{ color: '#000' }} />}>Select Image</Button>
          </Upload>
        </Form.Item>
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
            {BlogcategoryId ? 'Update Category Blog' : 'Add Category Blog'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddCategoriesBlog;
