import { PlusOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Button, Col, Drawer, Form, Input, Radio, Row, Select, Space, notification } from 'antd';
import React, { useState } from 'react';
import { ISection } from '../../../../../../../types/lesson.type';
import { useAddSectionMutation } from '../../../../course.service';
const { Option } = Select;

type AddSectionProps = {
  courseId: string;
};


const AddSection: React.FC<AddSectionProps> = (props) => {
  const [addSection, addSectionResult] = useAddSectionMutation();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState('FREE');

  const onChange = (e: RadioChangeEvent) => {
    setValue((e.target as HTMLInputElement).value);
  };

  const submitHandler = (formData: Omit<ISection, '_id'>) => {

    if (props.courseId) {
      const data = {
        name: formData.name,
        access: formData.access,
        courseId: props.courseId,
        description: formData.description
      };
      addSection(data)
        .unwrap()
        .then((res) => {
          notification.success({
            message: 'Add section successfully',
            description: 'You can start adding lesson to this section',
            duration: 2
          });
          form.resetFields();
          setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      throw Error('Course id is not exist');
    }
  };

  return (
    <>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
        Add Section
      </Button>
      <Drawer
        title='Section Edit'
        width={812}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Row>
          <Col md={8}></Col>
          <Col md={16}>
            <Form form={form} layout='vertical' hideRequiredMark onFinish={submitHandler}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter user name' }]}>
                    <Input placeholder='Please enter the section name here' />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name='access' label='Access' rules={[{ required: true, message: 'Please enter url' }]}>
                    <Radio.Group onChange={onChange} value={value}>
                      <Space direction='vertical'>
                        <Radio value='DRAFT'>DRAFT</Radio>
                        <Radio value='SOON'>SOON</Radio>
                        <Radio value='FREE'>FREE</Radio>
                        <Radio value='PAID'>PAID</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name='description'
                    label='Description'
                    rules={[
                      {
                        required: true,
                        message: 'please enter url description'
                      }
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder='please enter url description' />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default AddSection;
