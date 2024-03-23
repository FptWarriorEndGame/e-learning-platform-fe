import React, { useEffect, useRef, useState } from 'react';
import { notification } from 'antd';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { formatTimeAndMinutes } from '../../../../../utils/functions';
import { useCreateNoteMutation, useUpdateLessonDoneByUserMutation } from '../../../client.service';
import { setPercentHavePlayed, updateLessonDoneAtBrowser } from '../../../client.slice';
import AddNoteDrawer from './components/AddNotesDrawer';
import { useSearchParams } from 'react-router-dom';

const PlayerScreen = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.client.playingVideo);
  const currUserId = useSelector((state: RootState) => state.auth.userId);
  const currLessonId = useSelector((state: RootState) => state.client.lessonId);
  const percentHavePlayed = useSelector((state: RootState) => state.client.percentHavePlayed);

  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');

  const [noteContent, setNoteContent] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [formattedTime, setFormattedTime] = useState('00:00');
  const [createNote, { isLoading }] = useCreateNoteMutation();
  const [updateLessonDone] = useUpdateLessonDoneByUserMutation();
  const [apiCalled, setApiCalled] = useState(false);

  const playerEl = useRef<ReactPlayer>(null);

  const showDrawer = () => {
    setIsPlaying(false); // Dừng video khi mở drawer
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
    setIsPlaying(true); // Tiếp tục phát video khi đóng drawer
  };

  const handleSubmitNote = async () => {
    if (!noteContent.trim()) {
      notification.error({
        message: 'Lỗi',
        description: 'Nội dung ghi chú không được để trống'
      });
      return;
    }
    const currentTimeInSeconds = playerEl.current ? playerEl.current.getCurrentTime() : 0;

    try {
      await createNote({
        userId: currUserId,
        lessonId: currLessonId,
        content: noteContent,
        courseId: courseId,
        videoMinute: Math.floor(currentTimeInSeconds) // Lưu thời gian hiện tại của video dưới dạng số giây
      }).unwrap();
      notification.success({
        message: 'Thành công',
        description: 'Ghi chú đã được lưu thành công'
      });
      setNoteContent('');
      onClose(); // Đóng drawer sau khi lưu thành công
    } catch (error) {
      notification.error({
        message: 'Đã xảy ra lỗi',
        description: 'Không thể lưu ghi chú'
      });
    }
  };

  useEffect(() => {
    if (playerEl.current) {
      const playedTime = percentHavePlayed * playerEl.current.getDuration();
      setFormattedTime(formatTimeAndMinutes(playedTime));
    }
  }, [percentHavePlayed]);

  // Tính toán và cập nhật tiến trình đã xem của video
  const onProgress = () => {
    if (!apiCalled && playerEl.current) {
      const percent = playerEl.current.getCurrentTime() / playerEl.current.getDuration();
      dispatch(setPercentHavePlayed(percent));

      if (percent >= 0.95 && !apiCalled) {
        // Nếu đã xem hơn 95% video
        // Cập nhật trạng thái hoàn thành bài học trong Redux và cơ sở dữ liệu
        dispatch(updateLessonDoneAtBrowser(currLessonId));
        updateLessonDone({
          userId: currUserId,
          lessonId: currLessonId
        })
          .then(() => {
            notification.success({
              message: 'Hoàn thành video',
              description: 'Bạn đã xem xong video này'
            });
            setApiCalled(true); // Đánh dấu đã gọi API cập nhật
          })
          .catch((error) => {
            console.error('Lỗi cập nhật tiến trình bài học', error);
          });
      }
    }
  };

  // Reset API called flag when lesson changes
  useEffect(() => {
    setApiCalled(false);
  }, [currLessonId]);

  return (
    <>
      <ReactPlayer
        ref={playerEl}
        className='player-screen'
        url={content}
        width='100%'
        height='90vh'
        controls={true}
        playing={isPlaying}
        onProgress={onProgress}
      />
      <div className='notes-section'>
        <button
          className='ml-4 mt-4 mb-4 flex items-center bg-red-500 text-white px-6 py-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50'
          onClick={showDrawer}
        >
          <span>Thêm ghi chú tại {formattedTime}</span>
        </button>
      </div>
      <AddNoteDrawer
        currLessonId={currLessonId}
        visible={drawerVisible}
        onClose={onClose}
        noteContent={noteContent}
        formattedTime={formattedTime}
        setNoteContent={setNoteContent}
        onSubmitNote={handleSubmitNote}
        isLoading={isLoading}
      />
    </>
  );
};

export default PlayerScreen;
