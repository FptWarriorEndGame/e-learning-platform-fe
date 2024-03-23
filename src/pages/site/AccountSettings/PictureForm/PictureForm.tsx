import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Button, Form, notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import imagePreviewIcon from '../../../../assets/images/icons/anonymous_3.png';
import { getUserResponse, useUpdateUserMutation } from '../../client.service';
import styles from './PictureForm.module.scss';

const PictureForm: React.FC<{ userData: getUserResponse | undefined, isSuccess: boolean, userId: string }> = ({ userData, isSuccess, userId }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(imagePreviewIcon);
  const [selectedFileName, setSelectedFileName] = useState<string>('No file selected');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const [fileInputValue, setFileInputValue] = useState('');


  useEffect(() => {
    if (isSuccess && userData && userData.user.avatar) {
      setImagePreviewUrl(userData.user.avatar);
    }
  }, [userData, isSuccess]);

  const [updateUser] = useUpdateUserMutation();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.match('image.*')) {
      setSelectedFileName(file.name);
      setIsFileSelected(true);
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImagePreviewUrl(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
    setFileInputValue(event.target.value);
  };


  const handleSubmit = () => {
    setLoading(true);

    const submitAsync = async () => {
      if (fileInputRef.current?.files?.length) {
        const file = fileInputRef.current.files[0];
        const formData = new FormData();
        formData.append('avatar', file);

        try {
          const result = await updateUser({ userId, formData }).unwrap();
          notification.success({
            message: 'Success',
            description: result.message,
            placement: 'topRight',
          });
          setIsFileSelected(false);
          setFileInputValue('');
          setSelectedFileName('No file selected');
        } catch (error) {
          notification.error({
            message: 'Error',
            description: 'Error updating profile',
            placement: 'topRight',
          });
        }
      }
    };

    submitAsync()
      .catch(error => {
        console.error('Error during async operation:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <Form onFinish={handleSubmit} className={styles.pictureForm} layout='vertical'>
      <div className={styles.pictureForm__imagePreviewText}>Image preview</div>
      <div className={styles.pictureForm__imageSizeInfo}>Minimum 200x200 pixels, Maximum 6000x6000 pixels</div>
      <Form.Item>
        <div className={styles.pictureForm__previewContainer}>
          <div className={styles.pictureForm__previewWrapper}>
            <img src={imagePreviewUrl} alt='Image preview' />
          </div>
        </div>
        <div className={styles.pictureForm__uploadContainer} onClick={handleButtonClick}>
          <div className={styles.pictureForm__fileName}>{selectedFileName}</div>
          <Button type='primary' className={styles.pictureForm__uploadBtn}>
            Upload Image
          </Button>
          <input
            type='file'
            value={fileInputValue}
            ref={fileInputRef}
            accept='image/*'
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
      </Form.Item>
      <Form.Item className={styles.pictureForm__submit}>
        <Button type='primary' htmlType='submit' block disabled={!isFileSelected}>
          {loading ? <Spin indicator={antIcon} /> : 'Save '}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PictureForm;
