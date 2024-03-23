import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EllipsisOutlined,
  HistoryOutlined,
  ProfileOutlined,
  StopOutlined
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
import ViewHistoryUser from '../HistoryUser/HistoryUser';
import { Helper } from '../../../../../utils/helper';
import ViewDetailUser from '../ViewDetailUser';
import { IUser } from '../../../../../types/user.type';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const columns: ColumnsType<IUser> = [
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
    title: 'Role',
    dataIndex: 'role'
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
    title: 'Active',
    dataIndex: 'isDeleted'
  },
  {
    title: 'Manage',
    dataIndex: 'manage'
  }
];

interface UserListProps {
  onEditUser: () => void;
  searchValue: string;
  userId: string;
  isDeleted: boolean;
}

const UsersList: React.FC<UserListProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isViewHistoryOpen, setIsViewHistoryOpen] = useState(false);
  const [historyUserId, setHistoryUserId] = useState<string | null>(null);

  const [isViewDetail, setIsisViewDetail] = useState(false);
  const [DetailUserId, setDetailUserId] = useState<string | null>(null);

  const [updateActiveStatusUser, updateActiveStatusUserResult] = useUpdateActiveStatusUserMutation();

  const updateActiveStatusUserHandler = (userId: string) => {
    updateActiveStatusUser({ userId: userId })
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

  const handleViewDetail = (userId: string) => {
    setIsisViewDetail(true);
    setDetailUserId(userId);
  };

  const closeViewDetail = () => {
    setIsisViewDetail(false);
    setDetailUserId(null);
  };

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
    setIsLoading(true);
    approveUser({ userId })
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Approve user successfully'
        });
        setIsLoading(false);
      })
      .catch(() => {
        notification.error({
          message: 'Failed to approve user'
        });
        setIsLoading(false);
      });

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

  const onChange: TableProps<IUser>['onChange'] = (pagination, filters, sorter, extra) => {
    setTableParams({ pagination: pagination });
  };

  const usersData: IUser[] =
    data?.users.map((user) => {
      return {
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
        role: <div>{user.role}</div>,
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
        isDeleted: (
          <>
            <Tag color={user?.isDeleted ? 'red' : 'green'}>{user?.isDeleted ? 'Un Active' : 'Active'}</Tag>{' '}
          </>
        ),
        manage: (
          <Space>
            <Button onClick={() => editUserHandler(user._id)} className='btn-wrap' style={{ color: '#38bdf8' }}>
              <EditOutlined />
            </Button>
            <Button onClick={() => handleViewDetail(user._id)} className='btn-wrap' style={{ color: '#38bdf8' }}>
              <ProfileOutlined />
            </Button>

            <Button onClick={() => handleViewHistory(user._id)} className='btn-wrap' style={{ color: '#38bdf8' }}>
              <HistoryOutlined />
            </Button>

            {user.isDeleted ? (
              <Popconfirm
                title='Are you sure you want to activate this blog?'
                placement='topRight'
                onConfirm={() => updateActiveStatusUserHandler(user._id)}
                okText='Yes'
                cancelText='No'
              >
                <Button icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />} />
              </Popconfirm>
            ) : (
              <Popconfirm
                title='Are you sure you want to deactivate this blog category?'
                placement='topRight'
                onConfirm={() => updateActiveStatusUserHandler(user._id)}
                okText='Yes'
                cancelText='No'
              >
                <Button icon={<StopOutlined style={{ color: '#ff4d4f' }} />} danger />
              </Popconfirm>
            )}

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
          </Space>
        )
      };
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
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={usersData}
            onChange={onChange}
            pagination={tableParams.pagination}
            scroll={{ x: 1200, y: 400 }}
          />
        </div>
      )}
      {isViewHistoryOpen && historyUserId && (
        <ViewHistoryUser isOpen={isViewHistoryOpen} onClose={closeViewHistoryModal} userId={historyUserId} />
      )}
      {isViewDetail && DetailUserId && (
        <ViewDetailUser isOpen={isViewDetail} onClose={closeViewDetail} userId={DetailUserId} />
      )}
    </>
  );
};

export default UsersList;
