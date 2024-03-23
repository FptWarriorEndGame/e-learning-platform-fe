import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, DatePicker, Input, InputNumber, Skeleton, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddCourseNotes from './components/AddCourseNotes';
import CourseNotesList from './components/CourseNotesList';
import { useGetNotesQuery } from './courseNotes.service';
import { startEditNotesCourse } from './courseNotes.slice';
import { Link } from 'react-router-dom';
const { Search } = Input;
const { RangePicker } = DatePicker;

type ParamsType = {
  _limit: number;
  _page: number;
  _q: string;
  name?: string;
  minVideoMinute?: number;
  maxVideoMinute?: number;
};

const CourseNotes = () => {
  const [params, setParams] = useState<ParamsType>({
    _limit: 10,
    _page: 1,
    _q: ''
  });

  const { data: courseNotesResponse, isFetching: isFetchingCourseNotes } = useGetNotesQuery(params);
  console.log('courseNotesResponse', courseNotesResponse);

  const filteredCourseNotes =
    courseNotesResponse?.notes.filter((note) => {
      const matchName = params.name ? note.title.toLowerCase().includes(params.name.toLowerCase()) : true;
      const matchMinMinute = params.minVideoMinute ? note.videoMinute >= params.minVideoMinute : true;
      const matchMaxMinute = params.maxVideoMinute ? note.videoMinute <= params.maxVideoMinute : true;
      return (
        matchName && matchMinMinute && matchMaxMinute && note.content.toLowerCase().includes(params._q.toLowerCase())
      );
    }) || [];

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prevParams) => ({ ...prevParams, name: e.target.value }));
  };

  const onMinMinuteChange = (value: number | null) => {
    setParams((prevParams) => ({ ...prevParams, minVideoMinute: value ?? 0 }));
  };

  const onMaxMinuteChange = (value: number | null) => {
    setParams((prevParams) => ({ ...prevParams, maxVideoMinute: value ?? 0 }));
  };

  const closeDrawerHandler = () => {
    setOpen(false);
  };

  const noteEditHandler = (noteId: string) => {
    dispatch(startEditNotesCourse(noteId));
    setOpen(true);
  };

  const newNoteHandler = () => {
    dispatch(startEditNotesCourse(''));
    setOpen(true);
  };

  return (
    <div className='course-notes'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Course'
            },
            {
              title: <Link to='#'>Course Notes</Link>
            }
            
          ]}
        />
      </div>
      <Space className='sub-header__wrap'>
        <Button onClick={newNoteHandler} type='primary' icon={<PlusOutlined />} className='btn-wrap'>
          New Note
        </Button>
        <Space>
          <Search placeholder='Search notes' onChange={onNameChange} style={{ width: 200 }} className='search-wrap'/>
          <InputNumber min={0} placeholder='Min minute' onChange={onMinMinuteChange} style={{ width: 100 }} />
          <InputNumber min={0} placeholder='Max minute' onChange={onMaxMinuteChange} style={{ width: 100 }} />
        </Space>
      </Space>
      {isFetchingCourseNotes ? (
        <Skeleton />
      ) : (
        <CourseNotesList onNoteEdit={noteEditHandler} data={filteredCourseNotes} />
      )}
      <AddCourseNotes isOpen={open} onClose={closeDrawerHandler} />
    </div>
  );
};

export default CourseNotes;
