import { ArrowLeftOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Progress, Row, Skeleton, Tabs, TabsProps, notification } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { RootState } from '../../../store/store';
import {
  useCreateCertificateMutation,
  useGetAllUserByCourseQuery,
  useGetCertificateQuery,
  useGetCourseEnrolledByUserQuery,
  useGetDiscussionsByLessonIdQuery,
  useGetNotesByLessonIdQuery,
  useGetAllLessonsByCourseIdQuery
} from '../client.service';
import {
  createCertificatePath,
  initCurrentProgress,
  initLessonsDoneOfCourse,
  startPlayingVideo,
  setLessonIds,
  setCurrentLessonIndex
} from '../client.slice';
import './PathPlayer.scss';
import Discusses from './components/Discusses';
import Learners from './components/Learners';
import Notes from './components/Notes/Notes';
import PathSections from './components/PathSections';
import PlayerScreen from './components/PlayerScreen/PlayerScreen';
// type Props = {};
// props: Props

const PathPlayer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  const userId = useSelector<RootState, string>((state: RootState) => state.auth.userId);
  const { data, isFetching } = useGetCourseEnrolledByUserQuery(courseId as string);
  const dispatch = useDispatch();
  const [createCertificate, createCertificateResult] = useCreateCertificateMutation();

  const {
    data: lessonsData,
    error: lessonsError,
    isLoading: lessonsIsLoading
  } = useGetAllLessonsByCourseIdQuery(courseId || '');

  useEffect(() => {
    if (lessonsError) {
      notification.error({ message: 'Failed to fetch lessons' });
    }

    if (lessonsData && !lessonsIsLoading) {
      const lessonIds = lessonsData.lessons.map((lesson) => lesson._id);
      dispatch(setLessonIds(lessonIds));
    }
  }, [lessonsData, lessonsError, lessonsIsLoading, dispatch]);

  const currentLessonIndex = useSelector((state: RootState) => state.client.currentLessonIndex);
  const lessonIds = useSelector((state: RootState) => state.client.lessonIds);

  const handlePreviousClick = () => {
    if (currentLessonIndex > 0) {
      const previousLessonId = lessonIds[currentLessonIndex - 1];
      const previousLesson = lessonsData?.lessons.find((lesson) => lesson._id === previousLessonId);
      if (previousLesson) {
        const lessonContent = previousLesson.content;
        dispatch(startPlayingVideo({ lessonId: previousLessonId, content: lessonContent }));
        dispatch(setCurrentLessonIndex(currentLessonIndex - 1));
      } else {
        console.log('Previous lesson not found');
      }
    } else {
      console.log('Already at the first lesson');
    }
  };

  const handleNextClick = () => {
    if (currentLessonIndex < lessonIds.length - 1) {
      const nextLessonId = lessonIds[currentLessonIndex + 1];
      const nextLesson = lessonsData?.lessons.find((lesson) => lesson._id === nextLessonId);
      if (nextLesson) {
        const lessonContent = nextLesson.content;
        dispatch(startPlayingVideo({ lessonId: nextLessonId, content: lessonContent }));
        dispatch(setCurrentLessonIndex(currentLessonIndex + 1));
      } else {
        console.log('Next lesson not found');
      }
    } else {
      console.log('Already at the last lesson');
    }
  };

  const cerficiateParams = {
    userId,
    courseId: courseId || ''
  };

  const { data: certificateData, isFetching: isFetchingCertificate } = useGetCertificateQuery(cerficiateParams);

  const progressPercent = ((data?.course.progress || 0) * 100).toFixed(2);
  const [currProgress, setCurrProgress] = useState(Number(progressPercent));

  const lessonIdsDone = useSelector((state: RootState) => state.client.lessonIdsDoneByCourseId);

  const lessonId = useSelector((state: RootState) => state.client.lessonId);
  const { data: discussData, isFetching: isFetchingDiscuss } = useGetDiscussionsByLessonIdQuery(lessonId);

  const { data: NotesData, isFetching: isFetchingNotesData } = useGetNotesByLessonIdQuery(lessonId, {
    skip: !lessonId
  });

  // const isLessonDone = useSelector((state: RootState) => state.client.isLessonDone);

  const isCreateNewCertificate = useMemo(() => {
    return currProgress === 100 && !certificateData?.certificate && isFetchingCertificate === false;
  }, [currProgress, certificateData?.certificate, isFetchingCertificate]);

  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUserByCourseQuery({ courseId: courseId as string });
  // Test demo create certificate:

  useEffect(() => {
    if (isCreateNewCertificate) {
      const newCertificate = {
        userId,
        courseId: courseId || '',
        completionDate: new Date().toISOString()
      };

      createCertificate(newCertificate)
        .unwrap()
        .then((result) => {
          notification.success({
            message:
              'Congratulation! You have completed the course. Let check the certificate section to get your achievement!'
          });

          const { certificate } = result;

          dispatch(createCertificatePath(certificate.certificateName));
        })
        .catch((error) => {
          console.log('error: ', error);
        });
    }
  }, [isCreateNewCertificate]);

  // First initital first lesson of course

  useEffect(() => {
    let currentPlayingVideo = {
      lessonId: '',
      content: ''
    };

    if (data?.course && data?.course.lessons.length > 0 && !isFetching) {
      currentPlayingVideo = {
        lessonId: data?.course.lessons[0]._id,
        content: data?.course.lessons[0].content
      };
    }

    let certificateName = '';

    if (certificateData?.certificate) {
      certificateName = certificateData?.certificate.certificateName;
    }

    dispatch(startPlayingVideo(currentPlayingVideo));

    dispatch(initLessonsDoneOfCourse(data?.course.lessonsDone || []));

    dispatch(initCurrentProgress(data?.course.progress || 0));

    dispatch(createCertificatePath(certificateName));
  }, [
    data?.course,
    data?.course.lessons,
    data?.course.lessonsDone,
    data?.course.progress,
    dispatch,
    certificateData?.certificate,
    isFetching
  ]);

  // See effect change of progress
  useEffect(() => {
    const totalLessonsDone = lessonIdsDone.length;
    const lessonsOfCourse = data?.course.lessons.length;
    let progress = 0;
    if (lessonsOfCourse) {
      progress = (totalLessonsDone / lessonsOfCourse) * 100;
    }
    setCurrProgress(progress);
  }, [data?.course.lessons.length, lessonIdsDone.length]);

  const tabItems: TabsProps['items'] = [
    {
      key: 'pathsections',
      label: `Path`,
      children: (
        <PathSections
          courseId={courseId as string}
          progressPercent={currProgress.toString()}
          certificate={certificateData?.certificate}
          className='path-player__menu-content'
        />
      )
    },
    {
      key: 'discuss',
      label: `Discuss (${discussData?.discuss?.length || 0})`,
      children: <Discusses className='path-player__menu-content' />
    },
    {
      key: 'learners',
      label: `Learners (${usersData?.users?.length || 0})`,
      children: <Learners className='path-player__menu-content' />
    },
    {
      key: 'note',
      label: `Notes (${NotesData?.notes?.length || 0})`,
      children: <Notes className='path-player__menu-content' />
    }
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className='path-player'>
      <div className='path-player__wrap'>
        <Row className='path-player__row'>
          <Col className='col col-left' md={24} lg={6} xl={6}>
            <div className='path-player__menu'>
              {/* Menu Header  */}
              <div className='path-player__menu-header'>
                <div className='path-player__menu-header-nav'>
                  <Link className='path-player__menu-header-nav-back' to='/start'>
                    <ArrowLeftOutlined className='path-player__menu-header-nav-back-icon' /> Back to course page
                  </Link>
                </div>
                <h3 className='path-player__menu-header-title'>{data?.course.name}</h3>
                <div className='path-player__menu-progress'>
                  <Progress percent={(currProgress as unknown as number).toFixed(1)} status='active' />
                </div>
              </div>
              {/* Menu Content  */}
              <div className='path-player__menu-tabs'>
                <Tabs defaultActiveKey='pathsections' items={tabItems} onChange={onChange} />
              </div>
            </div>
          </Col>
          <Col className='col col-right' md={24} lg={18} xl={18}>
            <div className='path-player__player'>
              <div className='path-player__player-nav'>
                <div className='path-player__player-nav-item' onClick={handlePreviousClick}>
                  <LeftOutlined /> Previous
                </div>
                <div className='path-player__player-nav-item' onClick={handleNextClick}>
                  Next <RightOutlined />
                </div>
              </div>
              <div className='path-player__player-screen'>
                {isFetching && <Skeleton />}
                {!isFetching && <PlayerScreen />}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PathPlayer;
