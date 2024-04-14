import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { ICourse } from '../../../types/course.type';
import { UserRole } from '../../../types/user.type';
import { useGetCoursesQuery } from '../Courses/course.service';
import './Users.scss';
import AddUser from './components/AddUser';
import UsersList from './components/UsersList';
import { startEditUser } from './user.slice';

const { Search } = Input;
const { Option } = Select;

const Users = () => {
  const currentAdminRole = useSelector((state: RootState) => state.auth.adminRole) as UserRole;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const { data: dataList, isFetching: isFetchingCourse } = useGetCoursesQuery({ _q: '' });

  useEffect(() => {
    if (dataList) {
      setCourses(dataList.courses);
    }
  }, [dataList]);

  const [searchValue, setSearchValue] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [searchRole, setSearchRole] = useState('');
  const [status, setStatus] = useState('all');
  const [date, setDate] = useState('all');

  const onSearchHandler = (value: string) => {
    setSearchValue(value);
  };

  const onSearchCourseHandler = (value: string) => {
    setSearchCourse(value);
  };

  const createUserHandler = () => {
    setOpen(true);
    dispatch(startEditUser(''));
  };

  const onSearchRole = (role: string) => {
    setSearchRole(role);
  };

  const onStatusHandler = (value: string) => {
    setStatus(value);
  };

  const onDatesHandler = (value: string) => {
    setDate(value);
  };

  return (
    <div className='users'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Users'
            },
            {
              title: <Link to='#'>All Users</Link>
            }
          ]}
        />
      </div>
      <div className='users__wrap'>
        <div className='users__filter'>
          <Space className='sub-header__wrap'>
            {currentAdminRole !== UserRole.AUTHOR && (
              <Button onClick={createUserHandler} type='primary' icon={<PlusOutlined />} className='btn-wrap'>
                New User
              </Button>
            )}

            <Search
              placeholder='Search Name of Email'
              onSearch={onSearchHandler}
              style={{ width: 200 }}
              className='search-wrap'
            />
            <Select
              showSearch
              placeholder='Search by course'
              optionFilterProp='children'
              onChange={onSearchCourseHandler}
            >
              {courses.map((course) => (
                <Option key={course._id} value={course._id}>
                  {course.name}
                </Option>
              ))}
            </Select>

            <Select
              size='middle'
              placeholder='Date'
              onChange={onDatesHandler}
              style={{ width: '20rem' }}
              options={[
                {
                  value: 'all',
                  label: 'All dates'
                },
                {
                  value: 'today',
                  label: 'Today'
                },
                {
                  value: 'yesterday',
                  label: 'Yesterday'
                },
                {
                  value: '7days',
                  label: 'Last 7 days'
                },
                {
                  value: '30days',
                  label: 'Last 30 days'
                }
              ]}
            />

            {currentAdminRole !== UserRole.AUTHOR && (
              <Select
                size='middle'
                placeholder='Role'
                onChange={onSearchRole}
                style={{ width: '10rem' }}
                options={[
                  {
                    value: '',
                    label: 'All roles'
                  },
                  {
                    value: 'STUDENT',
                    label: 'Student'
                  },
                  {
                    value: 'USER',
                    label: 'User'
                  },
                  {
                    value: 'ADMIN',
                    label: 'Admin'
                  },
                  {
                    value: 'AUTHOR',
                    label: 'Author'
                  },
                  {
                    value: 'Employee',
                    label: 'Employee'
                  }
                ]}
              />
            )}

            <Select
              size='middle'
              placeholder='Status'
              onChange={onStatusHandler}
              style={{ width: '15rem' }}
              options={[
                {
                  value: 'all',
                  label: 'All'
                },
                {
                  value: 'active',
                  label: 'Active'
                },
                {
                  value: 'inactive',
                  label: 'Inactive'
                }
              ]}
            />
          </Space>
        </div>
        <div className='users__show-result'></div>
        <div className='users__content'>
          <UsersList
            searchValue={searchValue}
            searchCourseValue={searchCourse}
            onEditUser={() => setOpen(true)}
            status={status}
            date={date}
            searchRole={searchRole}
          />
        </div>
      </div>
      <AddUser isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Users;
