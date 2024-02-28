/* eslint-disable @typescript-eslint/no-misused-promises */
import { notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { formatTime, formatTimeAndMinutes } from '../../../../../utils/functions';
import { useCreateNoteMutation, useUpdateLessonDoneByUserMutation } from '../../../client.service';
import { setPercentHavePlayed, updateLessonDoneAtBrowser } from '../../../client.slice';
import './PlayerScreen.scss';
import AddNoteDrawer from './components/AddNotesDrawer';

const PlayerScreen = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.client.playingVideo);
  const currUserId = useSelector((state: RootState) => state.auth.userId);
  const currLessonId = useSelector((state: RootState) => state.client.lessonId);
  const percentHavePlayed = useSelector((state: RootState) => state.client.percentHavePlayed);

  const [noteContent, setNoteContent] = useState('');
  const [videoMinute, setVideoMinute] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const [formattedTime, setFormattedTime] = useState('00:00');

  const showDrawer = () => {
    setIsPlaying(false); // Cập nhật trạng thái isPlaying thành false để dừng video
    setDrawerVisible(true); // Hiển thị drawer
  };

  const onClose = () => {
    setDrawerVisible(false);
    setIsPlaying(true); // Reset trạng thái phát video khi đóng drawer
  };

  const [createNote, { isLoading }] = useCreateNoteMutation();
  const [updateLessonDone] = useUpdateLessonDoneByUserMutation();
  const [apiCalled, setApiCalled] = useState(false);

  const onDuration = (number: number) => {
    console.log(number);
  };

  const playerEl = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (playerEl.current) {
      const duration = playerEl.current.getDuration();
      const playedTime = percentHavePlayed * duration;
      setFormattedTime(formatTimeAndMinutes(playedTime));
    }
  }, [percentHavePlayed, playerEl]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerEl.current) {
        const percentHavePlayed = playerEl.current.getCurrentTime() / playerEl.current.getDuration();
        dispatch(setPercentHavePlayed(percentHavePlayed));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const handleSubmitNote = async () => {
    if (!noteContent.trim()) {
      return;
    }
    const currentTimeInSeconds = playerEl.current ? playerEl.current.getCurrentTime() : 0;

    try {
      await createNote({
        userId: currUserId,
        lessonId: currLessonId,
        content: noteContent,
        videoMinute: currentTimeInSeconds
      }).unwrap();
      setNoteContent('');
      setVideoMinute(0);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const onProgress = () => {
    if (!apiCalled && playerEl.current) {
      const percentHavePlayed = playerEl.current.getCurrentTime() / playerEl.current.getDuration();
      dispatch(setPercentHavePlayed(percentHavePlayed));

      if (percentHavePlayed >= 0.95) {
        // Update lesson done at current state
        dispatch(updateLessonDoneAtBrowser(currLessonId));
        // Update lesson Done at database
        updateLessonDone({
          userId: currUserId,
          lessonId: currLessonId
        })
          .then(() => {
            notification.success({
              message: 'You have finished this video'
            });
          })
          .catch((error) => {
            console.log(error);
          });

        setApiCalled(true);
      } else {
        console.log('have not watched done the video');
      }
    }
  };

  // Reset state when lesson id change
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
        onDuration={onDuration}
        onProgress={onProgress}
      />
      <div className='notes-section'>
        <button className='ml-4 mt-4 mb-4 flex items-center bg-red-500 text-white px-6 py-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50'>
          <svg
            className='w-4 h-4 mr-2'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M12 4v16m8-8H4'></path>
          </svg>
          <button onClick={showDrawer}>Thêm ghi chú tại {formattedTime}</button>
        </button>
      </div>
      <AddNoteDrawer
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
