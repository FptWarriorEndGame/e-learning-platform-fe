import React, { useState, useEffect, useRef } from 'react';
import { Modal, Spin, List, Typography, Alert } from 'antd';
import { useGetFreeLessonsByCourseIdQuery } from '../../../client.service';
import ReactPlayer from 'react-player';

const { Title } = Typography;

interface PreviewModalProps {
  courseId: string | undefined;
  lessonId: string | undefined;
  courseName: string | undefined;
  visible: boolean;
  onCancel: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ courseId, lessonId, courseName, visible, onCancel }) => {
  const { data, isFetching } = useGetFreeLessonsByCourseIdQuery(courseId ?? '');
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (visible && playerRef.current) {
      playerRef.current.seekTo(0);
    }
    if (lessonId && data && data.lessons) {
      const lessonIndex = data.lessons.findIndex((lesson) => lesson._id === lessonId);
      if (lessonIndex !== -1) {
        setCurrentLessonIndex(lessonIndex);
      }
    }
  }, [visible, lessonId, data]);

  useEffect(() => {
    if (!visible) {
      setCurrentLessonIndex(0);
    }
  }, [visible]);

  if (isFetching || !data) {
    return (
      <Modal
        title={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>Course Preview</span>}
        open={visible}
        onCancel={onCancel}
        destroyOnClose={true}
        footer={null}
        width={800}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Spin size='large' />
        </div>
      </Modal>
    );
  }

  const handleLessonChange = (index: number) => {
    setCurrentLessonIndex(index);
  };

  const handleVideoReady = () => {
    setIsVideoReady(true);
  };

  const formatVideoLength = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Modal
      title={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>Course Preview</span>}
      open={visible}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={null}
      width={800}
    >
      <Title level={4}>{courseName}</Title>
      <div>
        {(!data || !data.lessons || data.lessons.length === 0) && (
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ReactPlayer
              url='https://www.youtube.com/watch?v=yHePy1TMUMI&t'
              controls
              width='100%'
              playing={true}
              onReady={() => setIsVideoReady(true)}
            />
          </div>
        )}
        {data && data.lessons && data.lessons.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <ReactPlayer
              ref={playerRef}
              url={data.lessons[currentLessonIndex].content}
              controls
              width='100%'
              playing={isVideoReady}
              onReady={handleVideoReady}
            />
          </div>
        )}
        <p style={{ marginTop: '30px', fontSize: '18px', fontWeight: 'bold' }}>Free Sample Videos:</p>
        <div style={{ marginTop: '20px' }}>
          <List
            itemLayout='horizontal'
            dataSource={data?.lessons}
            renderItem={(lesson, index) => (
              <List.Item
                onClick={() => handleLessonChange(index)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: currentLessonIndex === index ? '#f0f0f0' : 'transparent',
                  borderLeft: currentLessonIndex === index ? '4px solid #1890ff' : '4px solid transparent',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div>{lesson.name}</div>
                  <div>{lesson.description}</div>
                </div>
                {index !== 0 && (
                  <div style={{ marginLeft: '10px' }}>
                    {lesson.videoLength ? formatVideoLength(lesson.videoLength) : 'Unknown'}
                  </div>
                )}
                {currentLessonIndex === index && isVideoReady && <i className='fas fa-play-circle'></i>}
              </List.Item>
            )}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
