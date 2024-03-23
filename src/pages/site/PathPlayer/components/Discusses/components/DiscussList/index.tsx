import { Button, Drawer } from 'antd';
import { RootState } from '../../../../../../../store/store';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import DiscussForm from '../DiscussForm';
import { useState } from 'react';
import CommentList from '../CommentList';

type Props = {
  isVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const DiscussList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lessonId = useSelector((state: RootState) => state.client.lessonId);
  const userId = useSelector<RootState, string>((state: RootState) => state.auth.userId);
  const courseId = searchParams.get('courseId');

  console.log('lessonId:', lessonId);
  console.log('userId:', userId);
  console.log('courseId:', courseId);

  return (
    <>
      <DiscussForm userId={userId} lessonId={lessonId} courseId={courseId} />
      <CommentList userId={userId} lessonId={lessonId} courseId={courseId} />
    </>
  );
};

export default DiscussList;
