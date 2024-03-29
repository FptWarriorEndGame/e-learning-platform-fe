/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, Radio, RadioChangeEvent, Rate, Select, Skeleton, Space } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../../../store/store';
import {
  useGetAuthorsQuery,
  useGetAuthorsSelectQuery,
  useGetCategoriesQuery,
  useGetCategoriesSelectQuery,
  useGetCoursesQuery
} from '../client.service';
import CourseList from '../components/CourseList';
import './Courses.scss';

import { SearchParamsStateType, useSearchParamsState } from 'react-use-search-params-state';
import { useEffect, useState } from 'react';
import { IDataSelect } from '../../../types/dataSelect.type';
type StateType = {
  [key: string]: string[];
};
const { Search } = Input;
const Courses = () => {
  const filtersDefaults: SearchParamsStateType = {
    minPrice: { type: 'number', default: null },
    maxPrice: { type: 'number', default: null },
    _author: { type: 'string', default: [], multiple: true },
    _level: { type: 'string', default: [], multiple: true },
    _price: { type: 'string', default: [], multiple: true },
    _topic: { type: 'string', default: [], multiple: true },
    _page: { type: 'number', default: 1 },
    _avgRatings: { type: 'number', default: 0 }
  };

  const defaultParams = {
    _limit: 12,
    _page: 1,
    _q: "",
    _author: [],
    _level: [],
    _price: [],
    _sort: "",
    _topic: [],
    _avgRatings: 0,
    userId: ""
  };

  const sortDefaults: SearchParamsStateType = {
    sort: { type: 'string', default: 'mostReviews' }
  };

  const [filterParams, setFilterParams] = useSearchParamsState(filtersDefaults);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortParams, setSortParams] = useSearchParamsState(sortDefaults);

  const userId = useSelector((state: RootState) => state.auth.userId);

  const searchValue = searchParams.get('_q') || '';
  const sortValue = searchParams.get('_sort') || 'mostReviews';
  const authorValue = searchParams.getAll('_author') || '';
  const levelValue = searchParams.getAll('_level') || '';
  const priceValue = searchParams.getAll('_price') || '';
  const topicValue = searchParams.getAll('_topic') || '';
  const avgRatingsValue = searchParams.get('_avgRatings') || 0;

  const params = {
    _limit: searchParams.get('_limit') ? Number(searchParams.get('_limit')) : 12,
    _page: searchParams.get('_p') ? Number(searchParams.get('_p')) : 1,
    _q: searchValue,
    _author: authorValue,
    _level: levelValue,
    _price: priceValue,
    _sort: sortValue,
    _topic: topicValue,
    _avgRatings: avgRatingsValue,
    userId
  };
  const [searchFilterParams, setSearchFilterParams] = useState(params)

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const { data, isFetching, refetch } = useGetCoursesQuery(searchFilterParams);

  const isFiltered = authorValue || levelValue || priceValue;

  const numberOfResult = data?.pagination?._totalRows || 0;
  // Get all categories at db
  const { data: categoriesData } = useGetCategoriesQuery();

  // Get all authors at db
  const { data: authorsData } = useGetAuthorsQuery();
  const { data: listAuthorSelect } = useGetAuthorsSelectQuery();
  const { data: listCategorySelect } = useGetCategoriesSelectQuery();

  const [selectedInput, setSelectedInput] = useState<StateType>({
    listAuthorSelect: [],
    listCategorySelect: []
  })

  useEffect(() => {
    setSearchFilterParams(searchFilterParams)
    refetch().then((res) => {
      console.log("res", res);
    }).catch((err) => {
      console.log("error", err)
    })
  },[refetch, searchFilterParams])


  const categoriesList = categoriesData?.categories || [];

  const authorsList = authorsData?.authors || [];

  const levelList = [{
    code: 'ALL',
    name: 'All Level',
  }, {
    code: "BEGINNER",
    name: 'Beginner'
  }, {
    code: "INTERMEDIATE",
    name: 'Intermediate'
  }, {
    code: "ADVANCED",
    name: 'Advanced'
  }];

  const navigate = useNavigate();

  const sortChangeHandler = (value: string) => {
    setSortParams({ _sort: value });
    setSearchFilterParams({ ...searchFilterParams, _sort: value })
  };

  const filterAuthorsHandler = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    const newValues = checked
      ? [...filterParams._author, value]
      : filterParams._author.filter((item: string) => item !== value);
    setFilterParams({ _author: newValues });
  };

  const filterSelectedAuthorsHandler = (value: string[]) => {
    setSelectedInput({
      ...selectedInput,
      listAuthorSelect: value
    });
    setFilterParams({ _author: value });
    setSearchFilterParams({ ...searchFilterParams, _author: value })
  };

  const filterSelectedCategoriesHandler = (value: string[]) => {
    setSelectedInput({
      ...selectedInput,
      listCategorySelect: value
    });
    setFilterParams({ _topic: value });
    setSearchFilterParams({ ...searchFilterParams, _topic: value })
  };

  const filterLevelHandler = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    const newValues = checked
      ? [...filterParams._level, value]
      : filterParams._level.filter((item: string) => item !== value);
    setFilterParams({ _level: newValues });
    setSearchFilterParams({ ...searchFilterParams, _level: newValues })
  };

  const filterPriceHandler = (e: CheckboxChangeEvent) => {
    const { checked, value } = e.target;
    const newValues = checked
      ? [...filterParams._price, value]
      : filterParams._price.filter((item: string) => item !== value);
    setFilterParams({ _price: newValues });
    setSearchFilterParams({ ...params, _price: newValues })
    
  };
  
  const filterRatingsHandler = (e: RadioChangeEvent) => {
    const { checked, value } = e.target;
    setFilterParams({
      _avgRatings: value
    })
    setSearchFilterParams({ ...params, _avgRatings: value })
  }

  const clearFilterHandler = () => {
   // Reset your filtering state
   setFilterParams(filtersDefaults); 
  //  searchFilterParams(defaultParams)
   // Clear the URL query parameters
   setSearchParams({});

   setSelectedInput({
    listAuthorSelect: [], // Reset to original data
    listCategorySelect: []  // Reset to original data
  });
  setSearchFilterParams(defaultParams)
  // Call again api
    refetch().then((res) => {
      console.log("res", res)
    }).catch((err) => {
      console.log("error", err)
    })
  };


  const enrollFilterHandler = () => {
    console.log('object');
  };

  const paginateHandler = (page: number) => {
    setFilterParams({ _p: page });
    setSearchFilterParams({ ...searchFilterParams, _page: page })
  };

  // Filter author select
  const filterAuthorsOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  
    const filterCategoriesOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div className='courses'>
      <div className='courses__wrap'>
        <div className='container'>
          <h2 className='courses__heading'>Find your best courses</h2>
          
          <div className='courses__content'>
            <div className='courses__filter-bar'>
              <div className='courses__filter-bar-item'></div>
              <div className='courses__filter-bar-item'>
                <div className='status-filter'>
                  <ul className='status-filter__list'>
                    <li className='status-filter__item'>
                      <a href='' className='status-filter__item-link'>
                        All
                      </a>
                    </li>
                    {isAuth && (
                      <>
                        <li className='status-filter__item'>
                          <a onChange={enrollFilterHandler} href='' className='status-filter__item-link'>
                            Not Enrolled
                          </a>
                        </li>
                        <li className='status-filter__item'>
                          <a onChange={enrollFilterHandler} href='' className='status-filter__item-link'>
                            Enrolled
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <div className='courses__filter-bar-item'>
                <h3 className='courses__filter-bar-item-title'>Authors</h3>
                <div className='authors-filter'>
                  {/* <ul className='authors-filter__list'>
                    {authorsList.map((author) => {
                      return (
                        <li key={author[1]._id} className='authors-filter__item'>
                          <Checkbox
                            value={author[1]._id}
                            checked={filterParams._author.includes(author[1]._id)}
                            onChange={filterAuthorsHandler}
                          >
                            {author[1].name}
                          </Checkbox>
                        </li>
                      );
                    })}
                  </ul> */}
                  <Select
                    style={{ width: '80%' }}
                    mode="multiple"
                    showSearch
                    placeholder='Select authors to filter!'
                    optionFilterProp='children'
                    filterOption={filterAuthorsOption}
                    options={listAuthorSelect}
                    onChange={filterSelectedAuthorsHandler}
                    value={selectedInput.listAuthorSelect}
                  />
                </div>
              </div>
              <div className='courses__filter-bar-item'>
                <h3 className='courses__filter-bar-item-title'>Level</h3>
                <div className='course-level'>
                  <ul className='course-level__list'>
                    {levelList.map((levelItem, index) => {
                      return (
                        <li key={index} className='course-level__item'>
                          <Checkbox
                            value={levelItem.code}
                            checked={filterParams._level.includes(levelItem.code)}
                            onChange={filterLevelHandler}
                          >
                            {levelItem.name}
                          </Checkbox>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className='courses__filter-bar-item'>
                <h3 className='courses__filter-bar-item-title'>Price</h3>
                <div className='course-by-price'>
                  <ul className='course-by-price__list'>
                    <li className='course-by-price__item'>
                      <Checkbox
                        value='Free'
                        checked={filterParams._price.includes('Free')}
                        onChange={filterPriceHandler}
                      >
                        Free
                      </Checkbox>
                    </li>
                    <li className='course-by-price__item'>
                      <Checkbox
                        value='Paid'
                        checked={filterParams._price.includes('Paid')}
                        onChange={filterPriceHandler}
                      >
                        Paid
                      </Checkbox>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='courses__filter-bar-item'>
                <h3 className='courses__filter-bar-item-title'>Topic course</h3>
                <div className='course-topic'>
                  {/* <ul className='course-topic__list'>
                    {categoriesList.map((cateItem: any) => {
                      return (
                        <li key={cateItem._id} className='course-topic__item'>
                          <Checkbox
                            checked={filterParams._topic.includes(cateItem._id)}
                            value={cateItem._id}
                            onChange={filterTopicHandler}
                          >
                            {cateItem.name}
                          </Checkbox>
                        </li>
                      );
                    })}
                  </ul> */}
                    {/* Select topic course (course cate) */}
                  <Select
                    style={{ width: '80%' }}
                    mode="multiple"
                    showSearch
                    placeholder='Select topics to filter!'
                    optionFilterProp='children'
                    filterOption={filterCategoriesOption}
                    options={listCategorySelect}
                    onChange={filterSelectedCategoriesHandler}
                    value={selectedInput.listCategorySelect}
                  />

                </div>
              </div>
              {/* Ratings */}
              <div className='courses__filter-bar-item'>
                <h3 className='courses__filter-bar-item-title'>Course Ratings</h3>
                <div className='course-ratings'>
                  <ul className='course-ratings__list'>
                    <Radio.Group onChange={filterRatingsHandler} value={filterParams._avgRatings}>
                      <Space direction='vertical'>
                        <Radio value={4.5}>
                          <Rate allowHalf defaultValue={4.5} />
                          <span className='ml-2 font-normal'> 4.5 & up</span>
                        </Radio>
                        <Radio value={4.0}>
                          <Rate allowHalf defaultValue={4.0} />
                          <span className='ml-2 font-normal'> 4.0 & up</span>
                        </Radio>
                        <Radio value={3.5}>
                          <Rate allowHalf defaultValue={3.5} />
                          <span className='ml-2 font-normal'> 3.5 & up</span>
                        </Radio>
                        <Radio value={3}>
                          <Rate allowHalf defaultValue={3} />
                          <span className='ml-2 font-normal'> 3 & up</span>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </ul>
                </div>
              </div>

              {/* Video duration */}

              {/* Filter by features (quizz, coding exercise, ...) */}
            </div>

            <div className='courses__list'>
            <div className='course-header-list'>
            <div className='courses__search-results'>
              <div className='courses__search-results-left'></div>
              <div className='courses__search-results-right'>{numberOfResult} results</div>
            </div>
            <div className='search-results'>
              {searchValue && (
                <h3 className='search-results__text'>
                  {numberOfResult} results for “{searchValue}”
                </h3>
              )}
              <div className='search-results__sort'>
                <Button>Sort</Button>
                <Select
                  defaultValue={sortValue === 'mostReviews' ? 'mostReviews' : 'newest'}
                  value={sortValue}
                  style={{ width: 130, marginLeft: '1rem' }}
                  onChange={sortChangeHandler}
                  options={[
                    // { value: 'relevant', label: 'Relevant' },
                    { value: 'mostReviews', label: 'Most Reviews' },
                    { value: 'mostEnrolled', label: 'Most Enrolled' },
                    { value: 'newest', label: 'Newest' }
                  ]}
                />
                {isFiltered && (
                  <span onClick={clearFilterHandler} className='search-results__clear-filters'>
                    Clear Filters <CloseOutlined />
                  </span>
                )}
              </div>
            </div>
          </div>
              {isFetching && <Skeleton />}
              <CourseList
                courseState='notOrdered'
                courses={data?.courses}
                pagination={data?.pagination}
                className='courses__list-row'
                onPaginate={paginateHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
