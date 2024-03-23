import { Breadcrumb, Button, Col, Form, Input, Row, Select, Statistic, Table, TablePaginationConfig, TableProps } from 'antd';
import { ColumnsType, FilterValue } from 'antd/es/table/interface';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { CalendarOutlined, ClockCircleOutlined, DollarOutlined, FolderOpenOutlined, ReadOutlined, RedoOutlined, RetweetOutlined, SearchOutlined, UserOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useGetSummaryReportsQuery, useGetCoursesReportByAuthorQuery } from '../report.service';
import { selectPreviousDays, showChart } from '../report.slice';
import Chart from '../Dashboard/components/Chart';
import { DatePicker, Space } from 'antd';
import dayjs, {Dayjs} from 'dayjs';
const { RangePicker } = DatePicker;
const statisticItemStyle = {};
enum Access {
  PAID = 'PAID',
  FREE = 'FREE',
  DRAFT = 'DRAFT',
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

interface IAuthorReport {
  courseName: string;
  leanders: number;
  createdAt: string;
  totalRevenue: number;
  isDeleted?: boolean;
}
const { Search } = Input;
interface DataCourseType {
  key: React.Key;
  courseName: string;
  learners: number;
  createdAt: string; // Convert to date: Example: 18 jun 2023
  totalRevenue: number;
  numberOfRatings?: number;
  avgRatings?: number;
  actions?: any;
  render: (_: IAuthorReport, record: IAuthorReport) => JSX.Element
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const AuthorReport = () => {
  const [form] = Form.useForm();
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const [currentParams, setCurrentParams] = useState({dateStart: '', dateEnd: ''});
  const { data: authorReportData, isFetching, refetch } = useGetCoursesReportByAuthorQuery(currentParams, {
  });

  const dispatch = useDispatch();

  const { data: summaryReportsData } = useGetSummaryReportsQuery();

  const chartName = useSelector((state: RootState) => state.report.chartName);

  const handleChange = (value: string) => {

    dispatch(selectPreviousDays(Number(value)));
  };

  const showNewUserSignupsChart = () => {

    dispatch(showChart('new-signups'));
  };

  const showRevenuesChart = () => {
    dispatch(showChart('revenues'));
  };

  const showCourseSalesChart = () => {
    dispatch(showChart('course-sales'));
  };


  const columns: ColumnsType<DataCourseType> = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
      ellipsis: true
    },
    {
      title: 'Learners',
      dataIndex: 'learners',
      key: 'learners',
      ellipsis: true
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: true
    },
    {
      title: 'Total Earning ($)',
      dataIndex: 'totalEarnings',
      key: 'totalEarnings',
      ellipsis: true
    },
    {
      title: 'Ratings',
      dataIndex: 'numberOfRatings',
      key: 'numberOfRatings',
      // render: (_: IAuthorReport, record: IAuthorReport) => <span>{record.isDeleted ? 'Inactive' : 'Active'}</span>
    },
    {
      title: 'Avg ratings',
      dataIndex: 'avgRatings',
      key: 'avgRatings',
      // render: (_: IAuthorReport, record: IAuthorReport) => (
      //   <Space size='middle'>
      //   </Space>
      // )
    }
  ];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  const onChange: TableProps<DataCourseType>['onChange'] = (pagination, filters, sorter, extra) => {

    setTableParams({
      pagination
    });
  };

  const hangeChangeRangeDate = (dates: [Dayjs, Dayjs], dateStrings: [string, string]) => {
    console.log('From: ', dates[0].format('DD/MM/YYYY'), 'To: ', dates[1].format('DD/MM/YYYY'));
    setCurrentParams({
      dateStart: dateStrings[0],
      dateEnd: dateStrings[1]
    })
  }

  const searchData = () => {
    console.log('search data', currentParams);
    console.log("form", form.getFieldsValue())
    refetch().then(() => {
      console.log('data', data);
    
    }).catch((err) => {
      console.log('err', err);
    })
  }

  const resetData = () => {
    form.resetFields();
  }

  return (
    <Fragment>
      {/* Breadcrumb play */}
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Author Report'
            },
            {
              title: <Link to='#'>Author Report</Link>
            }
          ]}
        />
      </div>
      {/* Filter section */}
          <div className="filter-section">
          <Form layout="inline" form={form}>
            <Form.Item name="rangeDate" label="Select Range of Date">
        <RangePicker onChange={hangeChangeRangeDate} />
        </Form.Item  >
          <Form.Item label="Filter">
          <Button type="primary" icon={<SearchOutlined />} onClick={searchData}>
            Search
          </Button>
          <Button className="ml-2" type="primary" icon={<RedoOutlined />} onClick={resetData}>
            Reset
          </Button>
          </Form.Item>
      </Form>
          </div>

      {/* Author report content */}
      <div className='author-report-content mt-8'>
        <Table columns={columns} dataSource={authorReportData?.reports ?? []} onChange={onChange} pagination={tableParams.pagination} />
        </div>
    </Fragment>
  );
};

export default AuthorReport;
