import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EllipsisOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { Avatar, Button, Popconfirm, Popover, Skeleton, Space, Table, Tag, Tooltip, message, notification } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useApproveUserMutation, useGetUsersQuery, useUpdateActiveStatusUserMutation } from '../../user.service';
import { startEditUser } from '../../user.slice';
import './UsersList.scss';
import UserDetail from './components/UserDetail';
import ViewHistoryUser from '../HistoryUser/HistoryUser';
import { Helper } from '../../../../../utils/helper';

interface DataUserType {
  key: React.Key;
  name: JSX.Element;
  avatar?: string;
  email?: string;
  courses: JSX.Element;
  tags?: JSX.Element;
  lastLogin: JSX.Element;
  createdAt: JSX.Element;
  statusName?: string;
  statusColor?: string;
  actions?: JSX.Element;
  status: JSX.Element;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<DataUserType> = [
  {
    title: 'User',
    dataIndex: 'name',
    width: '30%'
  },
  {
    title: 'Last login',
    dataIndex: 'lastLogin'
  },
  {
    title: 'Registerd',
    dataIndex: 'createdAt',
    filters: [
      {
        text: 'London',
        value: 'London'
      },
      {
        text: 'New York',
        value: 'New York'
      }
    ],
    filterSearch: true
  },
  {
    title: 'Courses',
    dataIndex: 'courses'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Manage',
    dataIndex: 'manage'
  }
];

const SettingContent = (props: { userId: string; isDeleted: boolean; onViewHistory: () => void }) => {
  const [updateActiveStatusUser, updateActiveStatusUserResult] = useUpdateActiveStatusUserMutation();

  const updateActiveStatusUserHandler = () => {
    updateActiveStatusUser({ userId: props.userId })
      .unwrap()
      .then(() => {
        const successMessage = props.isDeleted ? 'User activated successfully' : 'User deactivated successfully';
        void message.success(successMessage);
      })
      .catch(() => {
        const errorMessage = props.isDeleted ? 'Failed to activate user' : 'Failed to deactivate user';
        void message.error(errorMessage);
      });
  };

  const actionText = props.isDeleted ? 'Activate' : 'Deactivate';

  return (
    <Space>
      <Button type='primary' icon={<HistoryOutlined />} onClick={props.onViewHistory} />
      <Button
        style={{
          background: props.isDeleted ? '#5da3e5' : 'red'
        }}
        type='text'
        icon={props.isDeleted ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        onClick={updateActiveStatusUserHandler}
      />
    </Space>
  );
};

interface UserListProps {
  onEditUser: () => void;
  searchValue: string;
}

const UsersList: React.FC<UserListProps> = (props) => {
  const [open, setOpen] = useState(false);

  const [isViewHistoryOpen, setIsViewHistoryOpen] = useState(false);
  const [historyUserId, setHistoryUserId] = useState<string | null>(null);

  const handleViewHistory = (userId: string) => {
    setHistoryUserId(userId);
    setIsViewHistoryOpen(true);
  };

  const closeViewHistoryModal = () => {
    setIsViewHistoryOpen(false);
    setHistoryUserId(null);
  };

  const [usersParams, setUsersParams] = useState({
    _q: props.searchValue
  });
  const helper = new Helper();
  const enumData = helper.getEnumData;
  useEffect(() => {
    setUsersParams({
      _q: props.searchValue
    });
  }, [props.searchValue]);

  const { data, isFetching } = useGetUsersQuery(usersParams);
  const [approveUser, _] = useApproveUserMutation();
  const dispatch = useDispatch();
  const showUserDetail = () => {
    setOpen(true);
  };

  const editUserHandler = (userId: string) => {
    dispatch(startEditUser(userId));
    props.onEditUser();
  };

  const onApproveUser = (userId: string) => {
    // dispatch(startEditUser(userId));
    // props.onEditUser();

    approveUser({ userId })
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Approve user successfully'
        });
      })
      .catch(() => {
        notification.error({
          message: 'Failed to approve user'
        });
      });
  };

  const onChange: TableProps<DataUserType>['onChange'] = (pagination, filters, sorter, extra) => {
    setTableParams({ pagination: pagination });
  };

  const usersData: DataUserType[] =
    data?.users.map((user) => {
      const userTemplateItem = {
        key: user._id,
        name: (
          <>
            <a href='#' onClick={showUserDetail}>
              <div className='user-info'>
                <img alt={user?.name} src={user?.avatar} className='user-info__avatar' />
                <div className='user-info__content'>
                  <div className='user-info__name txt-tt'>{user?.name}</div>
                  <div className='user-info__email txt-desc'>{user?.email}</div>
                </div>
              </div>
            </a>
          </>
        ),
        lastLogin: <div className='txt-desc'>{moment(user?.lastLogin).format('YYYY-MM-DD HH:mm:ss') || ''}</div>,
        createdAt: <div className='txt-desc'>{moment(user?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>,
        courses: (
          <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            {(user.courses || []).map((course) => (
              <Avatar key={course?._id} src={course?.thumbnail} />
            ))}
            <Tooltip title='Ant User' placement='top'>
              {(user.courses || []).map((course) => (
                <Avatar key={course?._id} src={course?.thumbnail} />
              ))}
            </Tooltip>
          </Avatar.Group>
        ),
        status: (
          <>
            <Tag color={user?.statusColor}>{user.statusName}</Tag>{' '}
          </>
        ),
        manage: (
          <Space>
            <Button onClick={() => editUserHandler(user._id)} className='btn-wrap'>
              <EditOutlined />
            </Button>
            {user.status == 'NEW' && ( // Check if user.status is not 'new'
              <Popconfirm
                title='Approve User'
                description='Are you sure to approve this user to become an author?'
                onConfirm={() => onApproveUser(user._id)}
                okText='Yes'
                cancelText='No'
              >
                <Button className='btn-wrap'>
                  <CheckOutlined />
                </Button>
              </Popconfirm>
            )}
            <Popover
              placement='bottomRight'
              content={
                <SettingContent
                  userId={user._id}
                  isDeleted={user?.isDeleted || false}
                  onViewHistory={() => handleViewHistory(user._id)}
                />
              }
              title='Actions'
            >
              <Button className='btn-wrap'>
                <EllipsisOutlined />
              </Button>
            </Popover>
          </Space>
        )
      };

      return userTemplateItem;
    }) || [];

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  return (
    <>
      {isFetching && <Skeleton />}
      {!isFetching && (
        <div className='users-list'>
          <Table columns={columns} dataSource={usersData} onChange={onChange} pagination={tableParams.pagination} />
          <UserDetail isOpen={open} onClose={() => setOpen(false)} />
        </div>
      )}
      {isViewHistoryOpen && historyUserId && (
        <ViewHistoryUser isOpen={isViewHistoryOpen} onClose={closeViewHistoryModal} userId={historyUserId} />
      )}
    </>
  );
};

export default UsersList;
