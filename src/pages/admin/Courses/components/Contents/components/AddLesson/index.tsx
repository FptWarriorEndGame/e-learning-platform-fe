import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { RadioChangeEvent, UploadProps } from 'antd';
import { Button, Col, Drawer, Form, Input, Radio, Row, Space, notification, Upload, message } from 'antd';
import React, { useRef, useState } from 'react';
import { BACKEND_URL } from '../../../../../../../constant/backend-domain';
import { UploadFile } from 'antd/lib/upload/interface';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../../store/store';
import { ILesson } from '../../../../../../../types/lesson.type';
import { formatTime } from '../../../../../../../utils/functions';
import { useAddLessonMutation } from '../../../../course.service';

type AddLessonProps = {
  // onSubmit: (formData: Omit<ILesson, '_id'>) => void;
  // videoLength?: number;
  // onCloseActivies: () => void;
};

interface UploadVideoResponse {
  message: string;
  videoPath: string;
}


const AddLesson: React.FC<AddLessonProps> = () => {
  const [open, setOpen] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const [contentLink, setContentLink] = useState('');
  const [form] = Form.useForm();
  const [addLesson, addLessonResult] = useAddLessonMutation();

  const [uploadMethod, setUploadMethod] = useState('link');
  const [uploadedVideoPath, setUploadedVideoPath] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);
  const [fileList, setFileList] = useState<UploadFile<UploadVideoResponse>[]>([]);
  const [uploadedPDFPath, setUploadedPDFPath] = useState('');
  const [pdfFileList, setPdfFileList] = useState<UploadFile[]>([]);


  const uploadVideoProps: UploadProps = {
    name: 'videoFile',
    action: `${BACKEND_URL}/uploads/video`,
    fileList: fileList,
    maxCount: 1,
    onChange(info) {
      setFileList(info.fileList);
      if (info.file.status === 'done') {
        void message.success(`${info.file.name} file uploaded successfully`);

        const response = info.file.response as { videoPath: string };
        if (response && response.videoPath) {
          setUploadedVideoPath(response.videoPath);
        }


      } else if (info.file.status === 'error') {
        void message.error(`${info.file.name} file upload failed.`);
      }
    },

  };

  const uploadPDFProps: UploadProps = {
    name: 'pdfFile',
    action: `${BACKEND_URL}/uploads/pdf`, 
    fileList: pdfFileList,
    maxCount: 1,
    onChange(info) {
      setPdfFileList(info.fileList);
      if (info.file.status === 'done') {
        void message.success(`${info.file.name} file uploaded successfully`);
        const response = info.file.response as { pdfPath: string };
        if (response && response.pdfPath) {
          setUploadedPDFPath(response.pdfPath);
        }
      } else if (info.file.status === 'error') {
        void message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        void message.error('You can only upload PDF file!');
      }
      return isPDF || Upload.LIST_IGNORE;
    },
    accept: '.pdf',
  };



  const sectionId = useSelector((state: RootState) => state.course.sectionId);

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

  const onChangeVideoLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentLink(e.target.value);
  };

  const onPasteVideoLink = (e: React.ClipboardEvent<HTMLInputElement>) => {
    setContentLink(e.clipboardData.getData('text'));
  };

  const onFinish = (formData: Omit<ILesson, '_id'>) => {
    let content;
    let lessonType;
    let videoLength = 0; 

    switch (uploadMethod) {
      case 'linkYoutube':
        content = formData.content;
        lessonType = 'link';
        if (playerRef.current && playerRef.current.getDuration) {
          videoLength = playerRef.current.getDuration();
        }
        break;
      case 'uploadVideo':
        content = uploadedVideoPath;
        lessonType = 'video';
        videoLength = videoDuration;
        break;
      case 'uploadPdf':
        content = uploadedPDFPath;
        lessonType = 'pdf';
        videoLength = 0;
        break;
      default:
        content = formData.content;
        lessonType = 'link'; 
    }

    const lessonData: Omit<ILesson, '_id'> = {
      name: formData.name,
      content: content,
      access: formData.access,
      sectionId: sectionId,
      type: lessonType,
      description: formData.description,
      videoLength: videoLength 
    };

    addLesson(lessonData)
      .unwrap()
      .then((result) => {

        notification.success({
          message: 'Add lesson successfully',
          duration: 2
        });

        setOpen(false);
        form.resetFields();
        setFileList([]);
        setUploadedVideoPath('');
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const onuploadMethodChange = (e: RadioChangeEvent) => {
    setUploadMethod(e.target.value as string);
  };



  return (
    <>
      <Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
        Add New Lesson
      </Button>
      <Drawer
        title='Lesson Edit'
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
            <Form form={form} layout='vertical' hideRequiredMark onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter user name' }]}>
                    <Input placeholder='Please enter the section name here' />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Upload Method">
                    <Radio.Group onChange={onuploadMethodChange} value={uploadMethod}>
                      <Radio value="linkYoutube">Link</Radio>
                      <Radio value="uploadVideo">Upload Video</Radio>
                      <Radio value="uploadPdf">Upload PDF</Radio>
                    </Radio.Group>
                  </Form.Item>
                  {uploadMethod === 'linkYoutube' && (
                    <Form.Item
                      name='content'
                      label='Link Youtube'
                      rules={[{ required: true, message: 'Please enter link youtube' }]}
                    >
                      <Input
                        onPaste={onPasteVideoLink}
                        onChange={onChangeVideoLink}
                        placeholder='Please enter link youtube'
                      />
                    </Form.Item>
                  )}

                  {uploadMethod === 'uploadVideo' && (
                    <Form.Item
                      label='Upload Video'
                      rules={[{ required: true, message: 'Please upload a video' }]}
                    >
                      <Upload {...uploadVideoProps}>
                        <Button icon={<UploadOutlined style={{ color: 'black' }} />}>Click to Upload</Button>
                      </Upload>
                    </Form.Item>
                  )}

                  {
                    uploadMethod === 'uploadPdf' && (
                      <Form.Item
                        label='Upload PDF'
                        rules={[{ required: true, message: 'Please upload a PDF file' }]}
                      >
                        <Upload {...uploadPDFProps}>
                          <Button icon={<UploadOutlined style={{ color: 'black' }} />}>Click to Upload PDF</Button>
                        </Upload>
                      </Form.Item>
                    )
                  }

                  <ReactPlayer
                    ref={playerRef}
                    url={uploadMethod === 'linkYoutube' ? contentLink : uploadedVideoPath}
                    width={0}
                    height={0}
                    onDuration={setVideoDuration}
                    config={{
                      youtube: {
                        playerVars: {
                          controls: 0,
                          modestbranding: 1,
                          showinfo: 0,
                          fs: 0
                        }
                      }
                    }}
                  />
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

export default AddLesson;
