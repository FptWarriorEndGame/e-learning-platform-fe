/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  AppstoreOutlined,
  EditOutlined,
  EllipsisOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Input, Popover, Select, Skeleton, Space, message } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../constant/backend-domain';
import { RootState } from '../../../store/store';
import { UserRole } from '../../../types/user.type';
import { useGetAuthorsQuery } from '../../site/client.service';
import { useGetCategoriesQuery } from '../Categories/category.service';
import './Courses.scss';
import CoursesGrid from './components/CoursesGrid';
import CoursesList from './components/CoursesList';
import { useUpdateActiveStatusCourseMutation, useGetAllCoursesQuery, useGetCoursesQuery } from './course.service';
import { Helper } from '../../../utils/helper';
enum Access {
  PAID = 'PAID',
  FREE = 'FREE',
  DRAFT = 'DRAFT',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}
interface DataCourseType {
  key: React.Key;
  name: any;
  author: string;
  categories: string;
  access: Access;
  finalPrice: number;
  price: number;
  learners: number;
  createdAt: string; // Convert to date: Example: 18 jun 2023
  updatedAt: string;
  actions?: any;
}
const { Search } = Input;

const SettingContent = (props: { courseId: string; isDeleted: boolean }) => {
  const [updateActiveStatusCourse, updateActiveStatusCourseResult] = useUpdateActiveStatusCourseMutation();

  const updateActiveStatusCourseHandler = () => {
    updateActiveStatusCourse({ courseId: props.courseId })
      .unwrap()
      .then(() => {
        const successMessage = props.isDeleted ? 'Course activated successfully' : 'Course deactivated successfully';
        void message.success(successMessage);
      })
      .catch(() => {
        const errorMessage = props.isDeleted ? 'Failed to activate course' : 'Failed to deactivate course';
        void message.error(errorMessage);
      });
  };

  const actionText = props.isDeleted ? 'Activate' : 'Deactivate';

  return (
    <Space>
      <Button
        style={{
          background: props.isDeleted ? '#5da3e5' : 'red'
        }}
        type='text'
        icon={props.isDeleted ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        onClick={updateActiveStatusCourseHandler}
      />
    </Space>
  );
};

const Courses = () => {
  const [viewTable, setViewTable] = useState<string>('grid');
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const adminRole = useSelector((state: RootState) => state.auth.adminRole);

  const onSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSelectSearch = (value: string) => {
    console.log('search:', value);
  };

  const changeTableToList = () => {
    setViewTable('list');
  };

  const changeTableToGrid = () => {
    setViewTable('grid');
  };

  const [params, setParams] = useState({
    _q: '',
    _author: adminRole === UserRole.ADMIN ? 'all' : adminId,
    _category: '',
    _page: 1,
    _limit: 8
  });

  const [allCoursesParams, setAllCoursesParams] = useState({
    _q: '',
    _author: adminRole === UserRole.ADMIN ? 'all' : adminId
  });

  const [courseData, setCourseData] = useState<DataCourseType[]>();

  const [allCoursesListData, setAllCoursesData] = useState<DataCourseType[]>();

  const { data: dataList, isFetching } = useGetCoursesQuery(params);
  const { data: allCoursesData, isFetching: isAllCoursesFetching } = useGetAllCoursesQuery(allCoursesParams);

  const { data: categoriesData, isFetching: isCategoriesFetching } = useGetCategoriesQuery({ _q: '' });

  const { data: authorData, isFetching: isAuthorsFetching } = useGetAuthorsQuery();

  const authorFilterList = authorData?.authors.map((author ) => {
    return {
      text: author[0],
      value: author[0],
      _id: author[1]._id,
      name: author[0]
    };
  });

  authorFilterList?.unshift({
    text: 'all',
    value: 'all',
    _id: 'all',
    name: 'all'
  });

  const cateFilterList =
    categoriesData?.categories.map((cate) => {
      return {
        text: cate.name,
        value: cate.name,
        _id: cate._id
      };
    }) || [];

  cateFilterList.unshift({
    text: 'all',
    value: 'all',
    _id: 'all'
  });

  useEffect(() => {
    if (dataList) {
      const sourceCourseData = dataList.courses.map((courseItem) => {
        const {
          _id,
          name,
          description,
          price,
          finalPrice,
          access,
          level,
          thumbnail,
          categoryId,
          userId,
          createdAt,
          updatedAt,
          isDeleted
        } = courseItem;

        let thumbnailUrl = thumbnail;

        if (thumbnail.startsWith('http')) {
          thumbnailUrl = thumbnail;
        } else {
          thumbnailUrl = `${BACKEND_URL}/${thumbnail}`;
        }

        const courseTemplateItem: DataCourseType = {
          key: `${_id}`,
          name: (
            <div className='table__col-name'>
              <img title={name} className='table__col-name-img' src={thumbnailUrl} />
              <span className='table__col-name-text'>{name}</span>
            </div>
          ),
          author: userId.name,
          categories: categoryId?.name,
          access: Access.FREE,
          finalPrice: finalPrice,
          price: price,
          learners: 10,
          createdAt: '18 jun 2023',
          updatedAt: '18 jun 2023',
          actions: (
            <Fragment>
              <Space>
                <Button>
                  <Link to={`/author/courses/${_id}`}>
                    <EditOutlined />
                  </Link>
                </Button>
                <Popover placement='bottomRight' content={<div>Hello actions</div>} title='Actions'>
                  <Button>
                    <EllipsisOutlined />
                  </Button>
                </Popover>
              </Space>
            </Fragment>
          )
        };
        return courseTemplateItem;
      });

      setCourseData(sourceCourseData);
    } else {
      setCourseData([]);
    }
  }, [dataList]);

  // GET ALL COURSES DATA
  useEffect(() => {
    if (allCoursesData) {
      const sourceCourseData = allCoursesData.courses.map((courseItem) => {
        const {
          _id,
          name,
          description,
          price,
          finalPrice,
          access,
          level,
          thumbnail,
          categoryId,
          userId,
          createdAt,
          updatedAt,
          isDeleted
        } = courseItem;

        let thumbnailUrl = '';
        if (thumbnail.startsWith('http')) {
          thumbnailUrl = thumbnail;
        } else {
          thumbnailUrl = `${BACKEND_URL}/${thumbnail}`;
        }

        const courseTemplateItem: DataCourseType = {
          key: `${_id}`,
          name: (
            <div className='table__col-name'>
              <img title={name} className='table__col-name-img' src={thumbnailUrl} />
              <span className='table__col-name-text'>{name}</span>
            </div>
          ),
          author: userId?.name,
          categories: categoryId?.name,
          access: Access.FREE,
          // Gio Tinh. -> Course detail
          finalPrice: finalPrice,
          price: price,
          learners: 10,
          createdAt: '18 jun 2023',
          updatedAt: '18 jun 2023',
          actions: (
            <Fragment>
              <Space>
                <Button>
                  <Link to={`/author/courses/${_id}`}>
                    <EditOutlined />
                  </Link>
                </Button>
                <Popover
                  placement='bottomRight'
                  content={<SettingContent courseId={_id} isDeleted={isDeleted || false} />}
                  title='Actions'
                >
                  <Button className='btn-wrap'>
                    <EllipsisOutlined />
                  </Button>
                </Popover>
              </Space>
            </Fragment>
          )
        };
        return courseTemplateItem;
      });

      setAllCoursesData(sourceCourseData);
    } else {
      setAllCoursesData([]);
    }
  }, [allCoursesData]);

  const onSearchHandler = (value: string) => {
    if (viewTable === 'grid') {
      setParams({
        ...params,
        _q: value
      });
    } else if (viewTable === 'list') {
      setAllCoursesParams({
        ...allCoursesParams,
        _q: value
      });
    }
  };

  const authorsFitlerHandler = (
    value: string,
    option: { _id: string; text: string; name: string } | { _id: string; text: string; name: string }[]
  ) => {
    if (!Array.isArray(option)) {
      setParams({ ...params, _author: option._id });
    }
  };

  const paginateHandler = (page: number) => {
    setParams({
      ...params,
      _page: page
    });
  };

  const cateFilterHandler = (
    value: string,
    option: { _id: string; text: string; name: string } | { _id: string; text: string; name: string }[]
  ) => {
    if (!Array.isArray(option)) {
      setParams({
        ...params,
        _category: option._id
      });
    }
  };


  // Create permission section
  const helper = new Helper();
  const CourseCategory = helper.getRole.CourseCategory;
  // GET AUTHORIZATION BY EACH EMPLOYEE
  // List Permission here!
  const isView = helper.checkPermission(CourseCategory?.View?.code);
  const isCreate = helper.checkPermission(CourseCategory?.Create?.code);
  const isEdit = helper.checkPermission(CourseCategory?.Edit?.code);
  const isViewDetail = helper.checkPermission(CourseCategory?.Detail?.code);
  const isDelete = helper.checkPermission(CourseCategory?.Delete?.code);

  if(!isView) {
    return (
      <Fragment>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Courses'
            },
            {
              title: <Link to='#'>Course Manager</Link>
            }
          ]}
        />
        <Header className='sub-header'>
          <Space className='sub-header__wrap'>
            <Search
              placeholder='Search courses'
              onSearch={onSearchHandler}
              style={{ width: 200 }}
              className='search-wrap'
            />

            {viewTable === 'grid' && (
              <Select
                size='middle'
                placeholder='Please select your categories'
                defaultValue={'All Categories'}
                onChange={cateFilterHandler}
                style={{ width: '240px' }}
                options={cateFilterList as { _id: string; text: string; value: string; name: string }[]}
              />
            )}

            {viewTable === 'grid' && adminRole === UserRole.ADMIN && (
              <Select
                size='middle'
                placeholder='Please select Your Authors'
                onChange={authorsFitlerHandler}
                style={{ width: '200px' }}
                options={authorFilterList}
              />
            )}

            <Button onClick={changeTableToGrid} className='btn-wrap'>
              <AppstoreOutlined />
            </Button>
            <Button onClick={changeTableToList} className='btn-wrap'>
              <UnorderedListOutlined />
            </Button>
          </Space>
        </Header>
        <div className='course-content'>
          <h2> You don't have permission</h2>
        </div>
              
      </div>
    </Fragment>
    )
  }

  return (
    <Fragment>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Courses'
            },
            {
              title: <Link to='#'>Course Manager</Link>
            }
          ]}
        />
        <Header className='sub-header'>
          <Space className='sub-header__wrap'>
            <Search
              placeholder='Search courses'
              onSearch={onSearchHandler}
              style={{ width: 200 }}
              className='search-wrap'
            />

            {viewTable === 'grid' && (
              <Select
                size='middle'
                placeholder='Please select your categories'
                defaultValue={'All Categories'}
                onChange={cateFilterHandler}
                style={{ width: '240px' }}
                options={cateFilterList as { _id: string; text: string; value: string; name: string }[]}
              />
            )}

            {viewTable === 'grid' && adminRole === UserRole.ADMIN && (
              <Select
                size='middle'
                placeholder='Please select Your Authors'
                onChange={authorsFitlerHandler}
                style={{ width: '200px' }}
                options={authorFilterList}
              />
            )}

            <Button onClick={changeTableToGrid} className='btn-wrap'>
              <AppstoreOutlined />
            </Button>
            <Button onClick={changeTableToList} className='btn-wrap'>
              <UnorderedListOutlined />
            </Button>
          </Space>
        </Header>
        <div className='course-content'></div>
        <div className='course-content__wrap'>
          <div className='course-content__show-result'>
            {viewTable === 'grid' && (
              <span className='course-content__show-text'>Showing {dataList?.pagination?._totalRows} courses</span>
            )}
          </div>
          <div className='course-content__list'>
            {isFetching && <Skeleton />}

            {viewTable === 'grid' && (
              <CoursesGrid
                onPaginate={paginateHandler}
                pagination={dataList?.pagination || { _page: 1, _limit: 8, _totalRows: 100 }}
                courseData={dataList?.courses || []}
              />
            )}

            {viewTable === 'list' && <CoursesList courseData={allCoursesListData || []} />}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Courses;
