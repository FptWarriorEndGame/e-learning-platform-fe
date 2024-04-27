import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Skeleton, Table } from 'antd';
import './UsersProgress.scss';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DownloadOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
const { RangePicker } = DatePicker;
import * as XLSX from 'xlsx';
import { ColumnsType, ColumnType } from 'antd/es/table';
import { useGetReportsUserProgressQuery } from '../../../report.service';
import { formatVideoLengthToHours } from '../../../../../utils/functions';
import { useGetAuthorsSelectQuery } from '../../../../site/client.service';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { UserRole } from '../../../../../types/user.type';
interface DataType {
  key: string;
  name: string;
  // role: string;
  registered?: string;
  lastLogin?: string;
  lastEnrollment?: string;
  studyTime: number;
  allCourses: number;
  completedCourses: number;
  inCompletedCourses: number;
  avgScore?: number;
}

const UsersProgress = () => {
  const [form] = Form.useForm();
  const [isSearch, setIsSearch] = useState(true);
  const [currentParams, setCurrentParams] = useState({ dateStart: '', dateEnd: '', authorId: '' });
  const currentAdminRole = useSelector((state: RootState) => state.auth.adminRole) as UserRole;
  const { data: dataAuthorSelect } = useGetAuthorsSelectQuery();
  const {
    data: usersProgressData,
    isFetching,
    refetch
  } = useGetReportsUserProgressQuery(
    {
      dateStart: currentParams.dateStart,
      dateEnd: currentParams.dateEnd,
      authorId: currentParams.authorId
    },
    {
      skip: !isSearch
    }
  );

  const userProgressReports = usersProgressData?.reports || [];

  const reportData: DataType[] = userProgressReports.map((report) => {
    const reportTemplateItem = {
      key: report._id,
      name: report.name,
      registered: report.registered,
      lastLogin: report.lastLogin,
      lastEnrollment: report.lastEnrollment,
      studyTime: +report.studyTime,
      totalTimeOnPlatform: report.totalTimeOnPlatform,
      allCourses: report.allCourses,
      completedCourses: report.completedCourses,
      inCompletedCourses: report.inCompletedCourses
    };
    return reportTemplateItem;
  });

  const selectCourseChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const courseSearchChange = (value: string) => {
    console.log('search:', value);
  };

  const avgScoreSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const progressSelectChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const avgScorePercentChange = (value: number | null) => {
    console.log('changed', value);
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
            ...currentParams,
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
      case '2':
        {
          const { dateStart, dateEnd } = getQuarterDates(2);
          setCurrentParams({
            ...currentParams,
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
      case '3':
        {
          const { dateStart, dateEnd } = getQuarterDates(3);
          setCurrentParams({
            ...currentParams,
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
      case '4':
        {
          const { dateStart, dateEnd } = getQuarterDates(4);
          setCurrentParams({
            ...currentParams,
            dateStart: moment(dateStart).format('DD/MM/YYYY'),
            dateEnd: moment(dateEnd).format('DD/MM/YYYY')
          });
        }
        break;
    }
  };

  const hangeChangeRangeDate = (dates: [Dayjs, Dayjs], dateStrings: [string, string]) => {
    setIsSearch(false);
    setCurrentParams({
      dateStart: dates[0].format('DD/MM/YYYY'),
      dateEnd: dates[1].format('DD/MM/YYYY'),
      authorId: ''
    });
  };

  const handleFilterByAuthor = (value: string) => {
    setCurrentParams({
      dateStart: '',
      dateEnd: '',
      authorId: value
    });
  };

  const searchData = () => {
    setIsSearch(true);
    if (currentParams.dateStart === '' && currentParams.dateEnd === '') {
      resetData();
    }
  };

  const resetData = () => {
    form.resetFields();
    setCurrentParams({ dateStart: '', dateEnd: '', authorId: '' });
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

  // Sorter function
  const sorterByDateString = (a: string, b: string) => {
    // Use Moment.js to parse the date strings
    const dateA = moment(a, 'DD/MM/YYYY');
    const dateB = moment(b, 'DD/MM/YYYY');

    // Check if parsing was valid
    if (!dateA.isValid() || !dateB.isValid()) {
      // Handle invalid dates if necessary (e.g., return 0 for equality)
      return 0;
    }

    // Convert dates to Unix timestamps for comparison
    return dateA.valueOf() - dateB.valueOf();
  };

  let columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Registered',
      dataIndex: 'registered',
      key: 'registered',
      sorter: (a, b) => sorterByDateString(a.registered as string, b.registered as string)
    },
    {
      title: 'Last lastLogin',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      sorter: (a, b) => sorterByDateString(a.lastLogin as string, b.lastLogin as string)
    },
    {
      title: 'Last Enrollment',
      dataIndex: 'lastEnrollment',
      key: 'lastEnrollment'
    },
    {
      title: 'Study time',
      dataIndex: 'studyTime',
      key: 'studyTime',
      sorter: (a, b) => a.studyTime - b.studyTime,
      render: (studyTime) => `${formatVideoLengthToHours(+studyTime)}`
    },
    {
      title: 'All Courses',
      dataIndex: 'allCourses',
      key: 'allCourses',
      sorter: (a, b) => a.allCourses - b.allCourses
    },
    {
      title: 'Completed Courses',
      dataIndex: 'completedCourses',
      key: 'completedCourses',
      sorter: (a, b) => a.completedCourses - b.completedCourses
    },
    {
      title: 'Incompleted Courses',
      dataIndex: 'inCompletedCourses',
      key: 'inCompletedCourses',
      sorter: (a, b) => a.inCompletedCourses - b.inCompletedCourses
    }
  ];

  // Filter columns based on user role
  if (currentAdminRole === UserRole.AUTHOR) {
    const filteredColumns = columns.filter(
      (col: ColumnType<DataType>) =>
        ['registered', 'lastLogin', 'lastEnrollment'].indexOf(col.dataIndex as string) === -1
    );
    columns = filteredColumns;
  }

  return (
    <div className='users-progress'>
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
              title: <Link to='#'>User Progress</Link>
            }
          ]}
        />
      </div>
      <div className='users-progress__wrap'>
        {/* Filter section */}
        <div className='filter-section'>
          <Form layout='inline' form={form} className='bg-white p-4'>
            <Row>
              <Col span='12' className='mb-4'>
                <Form.Item className='mb-2' name='rangeDate' label='Select Range of Date'>
                  <RangePicker onChange={hangeChangeRangeDate} />
                </Form.Item>
              </Col>
              <Col span='12' className='mb-4'>
                {/* Filter by quarter */}
                <Form.Item className='mb-2' name='filterByQuarterOfYear' label='Filter By Quarter of Year'>
                  <Select
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
              {currentAdminRole !== UserRole.AUTHOR && (
                <Col span='12' className='mb-4'>
                  {/* Filter by author */}
                  <Form.Item className='mb-2' name='filterByQuarter' label='Filter By Author'>
                    <Select allowClear onChange={handleFilterByAuthor} options={dataAuthorSelect ?? []} />
                  </Form.Item>
                </Col>
              )}

              <Col span='24'>
                <Form.Item className='mb-2' label='Filter'>
                  <Button className='mr-2' type='primary' icon={<SearchOutlined />} onClick={searchData}>
                    Search
                  </Button>
                  <Button className='mr-2' type='primary' icon={<RedoOutlined />} onClick={resetData}>
                    Reset
                  </Button>
                  <Button type='primary' icon={<DownloadOutlined />} onClick={exportToExcel}>
                    Export to Excel
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        {/* Showing results of table */}
        <div className='users-progress__filter-result'>Showing 1 to 2 users out of 2</div>

        <div className='users-progress__table'>
          {isFetching && <Skeleton />}
          {!isFetching && (
            <Table
              loading={isFetching}
              scroll={{ x: 'max-content' }}
              columns={columns}
              dataSource={reportData}
              summary={() => (
                <Table.Summary fixed>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>This is a summary content</Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersProgress;
