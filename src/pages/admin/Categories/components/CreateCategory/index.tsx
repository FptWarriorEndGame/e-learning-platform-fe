/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button, Col, Drawer, Form, Input, Row, Select, Space, Upload, notification } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { ICategory } from '../../../../../types/category.type';
import { CategoryError } from '../../../../../utils/errorHelpers';
import { useAddCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from '../../category.service';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

interface CreateCategoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = (props) => {
  const [addCategory, addCategoryResult] = useAddCategoryMutation();
  const [updateCategory, updateCategoryResult] = useUpdateCategoryMutation();
  const [form] = Form.useForm();
  const categoryId = useSelector((state: RootState) => state.category.categoryId);
  const { data, isFetching } = useGetCategoryQuery(categoryId);
  const [fileList, setFileList] = useState<any[]>([]);

  const initialCategory: ICategory = useMemo(
    () => ({
      _id: categoryId,
      name: data?.category.name || '',
      cateImage: data?.category.cateImage || '',
      cateSlug: data?.category.cateSlug || '',
      description: data?.category.description || ''
    }),
    [categoryId, data]
  );

  const [formData, setFormData] = useState<ICategory>(initialCategory);

  useEffect(() => {
    if (categoryId && data) {
      setFormData(initialCategory);
      form.setFieldsValue(initialCategory);
    } else {
      setFormData({
        _id: '',
        name: '',
        cateImage: '',
        cateSlug: '',
        description: ''
      });
      form.setFieldsValue({
        _id: '',
        name: '',
        cateImage: '',
        cateSlug: '',
        description: ''
      });
    }

    return () => {
      // form.resetFields();
      // console.log('Unmount data: ');
    };
  }, [categoryId, data, form]);

  const handleChange = (info: UploadChangeParam) => {
    setFileList(info.fileList);
  };

  const submitHandler = (formData: Omit<ICategory, '_id'>) => {
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, cateImage: event.target?.result }));
      };
      reader.readAsDataURL(file.originFileObj);
    });

    const updatedCategory = {
      _id: categoryId,
      ...formData
    };

    if (categoryId) {
      props.onClose();
      updateCategory(updatedCategory)
        .then((result) => {
          notification.success({
            message: 'Update Category successfully',
            description: 'Update Category successfully hihi',
            duration: 2
          });
        })
        .catch((error: CategoryError) => {
          notification.error({
            message: 'Update Category failed',
            description: error.data.message
          });
        });
    } else {
      addCategory(formData)
        .unwrap()
        .then((result) => {
          props.onClose();
          notification.success({
            message: 'Add category successfully!',
            description: result.message
          });
        })
        .catch((error: { status: number; data: { message: string; errorType: string } }) => {
          notification.error({
            message: 'Add category failed',
            description: error.data.message
          });
        });
    }
  };

  return (
    <>
      <Drawer
        title={categoryId ? 'Edit Category' : 'Create a new Category'}
        width={720}
        onClose={props.onClose}
        open={props.isOpen}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={props.onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form
          form={form}
          name='basic'
          layout='vertical'
          hideRequiredMark
          onFinish={submitHandler}
          initialValues={{
            name: formData.name,
            cateImage: formData.cateImage,
            cateSlug: formData.cateSlug,
            description: formData.description
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter category name' }]}>
                <Input
                  name='name'
                  value={formData.name}
                  placeholder='Please enter category name'
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='cateImage'
                label='Cate Image'
                rules={[{ required: true, message: 'Please enter cate image' }]}
              >
                <Upload beforeUpload={() => false} onChange={handleChange} multiple={false} fileList={fileList}>
                  <Button icon={<UploadOutlined style={{ color: '#000' }} />}>Select Image</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='cateSlug'
                label='Cate Slug'
                rules={[{ required: true, message: 'Please select an owner' }]}
              >
                <Input
                  name='cateSlug'
                  style={{ width: '100%' }}
                  placeholder='Please enter your cate slug'
                  value={formData.cateSlug}
                  onChange={(event) => setFormData((prev) => ({ ...prev, cateSlug: event.target.value }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='type' label='Type'>
                <Select placeholder='Please choose the type'>
                  <Option value='private'>Private</Option>
                  <Option value='public'>Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item name='parentCate' label='Parent Category'>
                <Select placeholder='Please choose the parent category'>
                  <Option value='1'>parent 1</Option>
                  <Option value='2'>parent 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='description'
                label='Description'
                rules={[
                  {
                    required: true,
                    message: 'please enter description'
                  }
                ]}
              >
                <Input.TextArea
                  name='description'
                  rows={4}
                  placeholder='please enter  description'
                  value={formData.description}
                  onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default CreateCategory;
