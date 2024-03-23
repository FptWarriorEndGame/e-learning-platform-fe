import type { TabsProps } from 'antd';
import { Button, Tabs, Form, Skeleton, Table, Select, Row, Col } from 'antd';
import './CourseIngishts.scss';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { DownloadOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useGetReportsCourseInsightsQuery } from '../../../report.service';
import { formatVideoLengthToHours } from '../../../../../utils/functions';
import moment from 'moment';
import { read, utils, writeFileXLSX } from 'xlsx';
import * as XLSX from 'xlsx';
import { useGetAuthorsSelectQuery } from '../../../../site/client.service';
const { RangePicker } = DatePicker;

interface DataType {
  key: string;
  name: string;
  author: string;
  learners: number;
  avgStudyTime: number;
  views: number;
  socialInteractions?: number;
  totalVideosLength: number;
  lessons: number;
  numberOfWishlist: number;
  numberOfRatings: number;
  avgRatings: number;
}

interface Params {
  dateStart: string;
  dateEnd: string;
}



const CourseInsights = () => {
  const [form] = Form.useForm();
  const [isSearch, setIsSearch] = useState(true);
  const [currentParams, setCurrentParams] = useState({ dateStart: '', dateEnd: '', authorId: '' });
  const {data: dataAuthorSelect} = useGetAuthorsSelectQuery();

  const {
    data: courseInsightsData,
    isFetching,
    refetch
  } = useGetReportsCourseInsightsQuery(
    {
      dateStart: currentParams.dateStart,
      dateEnd: currentParams.dateEnd,
      authorId: currentParams.authorId
    },
    {
      skip: !isSearch
    }
  );

  const userProgressReports = courseInsightsData?.reports || [];

  const reportData: DataType[] = userProgressReports.map((report) => {
    const reportTemplateItem = {
      key: report._id,
      name: report.name,
      author: report.author,
      learners: report.learners,
      avgStudyTime: report.avgStudyTime,
      views: report.views,
      // socialInteractions: report.socialInteractions,
      totalVideosLength: report.totalVideosLength,
      lessons: report.lessons,
      numberOfWishlist: report.numberOfWishlist,
      numberOfRatings: report.numberOfRatings,
      avgRatings: report.avgRatings
    };
    return reportTemplateItem;
  });

  const hangeChangeRangeDate = (dates: [Dayjs, Dayjs], dateStrings: [string, string]) => {
    setIsSearch(false);
    setCurrentParams({
      dateStart: dates[0].format('DD/MM/YYYY'),
      dateEnd: dates[1].format('DD/MM/YYYY')
    });
  };

  const getQuarterDates = (quarter: number) => {
    if (quarter < 1 || quarter > 4) {
      throw new Error('Invalid quarter number. Please provide a number between 1 and 4.');
    }

    const now = moment();
    const currentYear = now.year();

    // Calculate the start month of the quarter
    const quarterStartMonth = (quarter - 1) * 3;

    // Create the start and end dates
    const quarterStart = moment([currentYear, quarterStartMonth, 1]);
    const quarterEnd = quarterStart.clone().endOf('quarter');

    return {
      dateStart: quarterStart.toDate(),
      dateEnd: quarterEnd.toDate()
    };
  };

  const handleFilterByQuarterOfYear = (value: string) => {
    switch (value) {
      case '1':
        {
          const { dateStart, dateEnd } = getQuarterDates(1);

          setCurrentParams({
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
      case '2':
        {
          const { dateStart, dateEnd } = getQuarterDates(2);
          setCurrentParams({
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
      case '3':
        {
          const { dateStart, dateEnd } = getQuarterDates(3);
          setCurrentParams({
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
      case '4':
        {
          const { dateStart, dateEnd } = getQuarterDates(4);
          setCurrentParams({
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
    }
  };

  const handleFilterByAuthor = (value: string) => {
    setCurrentParams({
      dateStart: '',
      dateEnd: '',
      authorId: value
    });
  }

  const searchData = () => {
    setIsSearch(true);
  };

  const resetData = () => {
    form.resetFields();
    setCurrentParams({ dateStart: '', dateEnd: '', authorId: ''});
    refetch()
      .then((res) => {
        console.log('res', res);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const exportToExcel = () => {
    // Prepare the data
    const worksheet = XLSX.utils.json_to_sheet(reportData);

    // Create a new Workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Course Insights');

    // Generate file buffer
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Trigger download
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const fileURL = window.URL.createObjectURL(data);

    const link = document.createElement('a');
    link.href = fileURL;
    link.download = 'CourseInsights.xlsx';
    link.click();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'All Courses',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Link to={`?tab=123`}>{text}</Link>,
      width: 400
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 200
    },
    {
      title: 'Learners',
      dataIndex: 'learners',
      key: 'learners',
      sorter: (a, b) => a.learners - b.learners
    },
    {
      title: 'Ratings',
      dataIndex: 'numberOfRatings',
      key: 'numberOfRatings',
      sorter: (a, b) => a.numberOfRatings - b.numberOfRatings
    },
    {
      title: 'Avg ratings',
      dataIndex: 'avgRatings',
      key: 'avgRatings',
      sorter: (a, b) => a.avgRatings - b.avgRatings
    },
    {
      title: 'Avg. Study time',
      dataIndex: 'avgStudyTime',
      key: 'avgStudyTime',
      sorter: (a, b) => a.avgStudyTime - b.avgStudyTime,
      render: (avgStudyTime) => `${formatVideoLengthToHours(+avgStudyTime)}`
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
      sorter: (a, b) => a.learners - b.learners
    },
    {
      title: 'Wishlist',
      dataIndex: 'numberOfWishlist',
      key: 'numberOfWishlist',
      sorter: (a, b) => a.numberOfWishlist - b.numberOfWishlist
    },
    {
      title: 'Total durations',
      dataIndex: 'totalVideosLength',
      key: 'totalVideosLength',
      sorter: (a, b) => a.totalVideosLength - b.totalVideosLength,
      render: (totalVideosLength) => `${formatVideoLengthToHours(+totalVideosLength)}`
    },
    {
      title: 'Lessons',
      dataIndex: 'lessons',
      key: 'lessons',
      sorter: (a, b) => a.lessons - b.lessons
    }
  ];


  return (
    <div className='course-insights'>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Reports Center'
            },
            {
              title: 'User Analytics'
            },
            {
              title: <Link to='#'>Course Insights</Link>
            }
          ]}
        />
      </div>
      <div className='course-insights__wrap'>
        {/* Filter section */}
        <div className='filter-section'>
          <Form layout='inline' form={form} className='bg-white p-4'>
            <Row>
              <Col span={12} className='mb-4'>
                <Form.Item name='rangeDate' label='Select Range of Date'>
                  <RangePicker onChange={hangeChangeRangeDate} />
                </Form.Item>
              </Col>
              <Col span={12} className='mb-4'>
                {/* Filter by quarter */}
                <Form.Item name='filterByQuarterOfYear' label='Filter By Quarter of Year'>
                  <Select
                    style={{ width: 240 }}
                    allowClear
                    onChange={handleFilterByQuarterOfYear}
                    options={[
                      { value: '1', label: 'The first quarter' },
                      { value: '2', label: 'Second quarter' },
                      { value: '3', label: 'Third quarter' },
                      { value: '4', label: 'Fourth quarter' }
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={12} className='mb-4'>
                {/* Filter by author */}
                <Form.Item name='filterByAuthor' label='Filter By Author'>
                  <Select
                    style={{ width: 240 }}
                    allowClear
                    onChange={handleFilterByAuthor}
                    options={dataAuthorSelect ?? []}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label='Filter'>
                  <Button className="mr-2" type='primary' icon={<SearchOutlined />} onClick={searchData}>
                    Search
                  </Button>
                  <Button className='mr-2' type='primary' icon={<RedoOutlined />} onClick={resetData}>
                    Reset
                  </Button>
                  <Button className='mr-2' type='primary' icon={<DownloadOutlined />} onClick={exportToExcel}>
                    Export to Excel
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        {/* <Tabs defaultActiveKey='1' items={items} onChange={onChange} /> */}

        <div className='users-progress__table-section'>
          {isFetching && <Skeleton />}
          {!isFetching && <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={reportData} />}
        </div>
      </div>
    </div>
  );
};

export default CourseInsights;
