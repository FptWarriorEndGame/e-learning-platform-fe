/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Drawer,
  Form,
  Input,
  Button,
  Radio,
  message,
  notification,
  RadioChangeEvent,
  Upload,
  UploadProps,
  UploadFile,
  Space
} from 'antd';
import { useUpdateLessonMutation } from '../../../../course.service';
import { ILesson, ISection } from '../../../../../../../types/lesson.type';
import React, { useState, useEffect, useRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { BACKEND_URL } from '../../../../../../../constant/backend-domain';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { UPLOAD_URL } from '../../../../../../../constant/constant';

type EditLessonProps = {
  isVisible: boolean;
  onClose: () => void;
  lesson: ILesson;
  section: ISection;
};

interface UploadVideoResponse {
  message: string;
  videoPath: string;
}

const EditLesson: React.FC<EditLessonProps> = ({ isVisible, onClose, lesson, section }) => {
  const [form] = Form.useForm();
  const { courseId } = useParams();
  const [updateLesson, { isLoading }] = useUpdateLessonMutation();
  const [uploadMethod, setUploadMethod] = useState('link');
  const [contentLink, setContentLink] = useState('');
  const [uploadedVideoPath, setUploadedVideoPath] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);

  const [fileList, setFileList] = useState<UploadFile<UploadVideoResponse>[]>([]);
  const [uploadedPDFPath, setUploadedPDFPath] = useState('');
  const [pdfFileList, setPdfFileList] = useState<UploadFile[]>([]);
  const playerRef = useRef<ReactPlayer | null>(null);
  const [value, setValue] = useState('DRAFT');
  const [currentLesson, setCurrentLesson] = useState<ILesson | null>(null);
  const [open, setOpen] = useState(false);

  const onChange = (e: RadioChangeEvent) => {
    setValue((e.target as HTMLInputElement).value);
  };

  const uploadVideoProps: UploadProps = {
    name: 'videoFile',
    action: `${UPLOAD_URL}/uploads/video`,
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
    }
  };

  const uploadPDFProps: UploadProps = {
    name: 'pdfFile',
    action: `${UPLOAD_URL}/uploads/pdf`,
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
    accept: '.pdf'
  };

  const onuploadMethodChange = (e: RadioChangeEvent) => {
    setUploadMethod(e.target.value as string);
  };

  const onPasteVideoLink = (e: React.ClipboardEvent<HTMLInputElement>) => {
    setContentLink(e.clipboardData.getData('text'));
  };

  const onChangeVideoLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentLink(e.target.value);
  };

  useEffect(() => {
    if (lesson && lesson._id) {
      form.setFieldsValue({
        name: lesson.name,
        access: lesson.access,
        content : lesson.content,
        description: lesson.description,
        userId: lesson.videoLength,
        sectionId: lesson.sectionId
      });
    } else {
      form.resetFields();
    }
  }, [lesson, form]);

  const onFinish = async (values: ILesson) => {
    try {
      const updatedLesson = await updateLesson({
        id: lesson._id,
        courseId: courseId,
        body: {
          ...values,
          content: uploadMethod === 'linkYoutube' ? contentLink : uploadedVideoPath,
          videoLength: videoDuration
        }
      }).unwrap();
      console.log(updatedLesson);

      setCurrentLesson(updatedLesson);
      notification.success({ message: 'Lesson updated successfully' });
      onClose();
    } catch (error) {
      notification.error({ message: 'Failed to update lesson' });
    }
  };

  return (
    <Drawer title='Edit Lesson' placement='right' onClose={onClose} visible={isVisible} width={520}>
      <Form form={form} layout='vertical' onFinish={onFinish}>
        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter lesson name' }]}>
          <Input placeholder='Please enter lesson name' />
        </Form.Item>

        <Form.Item label='Upload Method'>
          <Radio.Group onChange={onuploadMethodChange} value={uploadMethod}>
            <Radio value='linkYoutube'>Link</Radio>
            <Radio value='uploadVideo'>Upload Video</Radio>
            <Radio value='uploadPdf'>Upload PDF</Radio>
          </Radio.Group>
        </Form.Item>
        {uploadMethod === 'linkYoutube' && (
          <Form.Item
            name='content'
            label='Link Youtube'
            rules={[{ required: true, message: 'Please enter link youtube' }]}
          >
            <Input onPaste={onPasteVideoLink} onChange={onChangeVideoLink} placeholder='Please enter link youtube' />
          </Form.Item>
        )}

        {uploadMethod === 'uploadVideo' && (
          <Form.Item label='Upload Video' rules={[{ required: true, message: 'Please upload a video' }]}>
            <Upload {...uploadVideoProps}>
              <Button icon={<UploadOutlined style={{ color: 'black' }} />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        )}

        {uploadMethod === 'uploadPdf' && (
          <Form.Item label='Upload PDF' rules={[{ required: true, message: 'Please upload a PDF file' }]}>
            <Upload {...uploadPDFProps}>
              <Button icon={<UploadOutlined style={{ color: 'black' }} />}>Click to Upload PDF</Button>
            </Upload>
          </Form.Item>
        )}

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

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditLesson;
