import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Modal, Popover, Space, Table, notification } from 'antd';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import Link from 'antd/es/typography/Link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IBlog } from '../../../../../types/blog.type';
import { BlogError } from '../../../../../utils/errorHelpers';
import { useSoftDeleteBlogMutation } from '../../blog.service';
import { startEditBlog } from '../../blog.slice';
import './BlogList.scss';
import { ICategoryBlogs } from '../../../../../types/categoryBlogs.type'; 
import BlogDetailModal from '../BlogsDetailModal/BlogDetailModal';

interface DataBlogType {
  key: React.Key;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  blogImg?: string;
  actions?: any;
  category: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

interface BlogListProps {
  data: IBlog[];
  onBlogEdit: (blogId: string) => void;
  categories: ICategoryBlogs[];
}

const BlogsList: React.FC<BlogListProps> = ({ data, onBlogEdit, categories }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

  const showModal = (blog: IBlog) => {
    setSelectedBlog(blog);
    setIsModalVisible(true);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c._id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const blogEditHandler = (blogId: string) => {
    onBlogEdit(blogId);
    dispatch(startEditBlog(blogId));
  };

  const columns: ColumnsType<DataBlogType> = [
    {
      title: 'Author Image',
      dataIndex: 'blogImg',
      render: (text: string, record: DataBlogType) => (
        <img className='rounded-full' src={record.blogImg} alt='Author' style={{ width: '50px', height: '50px' }} />
      ),
      key: 'blogImg'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (_, record) => getCategoryName(record.category)
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '20%',
      key: 'title'
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author'
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content'
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Manage',
      dataIndex: 'actions',
      key: 'actions'
    }
  ];

  const blogsSource = data
    .filter((blog) => !blog.isDeleted)
    .map((blogItem) => {
      const { _id, title, author, createdAt, content, blogImg, categoryId } = blogItem;
      const blogTemplateItem: DataBlogType = {
        key: _id,
        title: title,
        author: author,
        createdAt: createdAt,
        content: content,
        blogImg: blogImg,
        category: categoryId,
        actions: (
          <Space>
            <Button onClick={() => blogEditHandler(_id)} className='btn-wrap'>
              <EditOutlined />
            </Button>
            <Popover placement='bottomRight' content={() => SettingContent(_id, showModal, blogItem)} title='Actions'>
              <Button className='btn-wrap'>
                <EllipsisOutlined />
              </Button>
            </Popover>
          </Space>
        )
      };
      return blogTemplateItem;
    });

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  const onChange: TableProps<DataBlogType>['onChange'] = (pagination, filters, sorter, extra) => {
    setTableParams({
      pagination,
      ...filters
    });
  };

  return (
    <div className='users-list'>
      <Table columns={columns} dataSource={blogsSource} onChange={onChange} pagination={tableParams.pagination} />
      {selectedBlog && (
        <BlogDetailModal
          blog={selectedBlog}
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          categories={categories}
        />
      )}
    </div>
  );
};

const SettingContent = (blogId: string, showModal: (blog: IBlog) => void, blog: IBlog) => {
  const [softDeleteBlog] = useSoftDeleteBlogMutation();

  const softDeleteBlogHandler = (blogId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this blog ?',
      content: 'This action cannot be undone and will permanently delete the blog.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'No, cancel',
      onOk: () => {
        return softDeleteBlog(blogId)
          .unwrap()
          .then((result) => {
            notification.success({
              message: 'Blog deleted successfully'
            });
          })
          .catch((error: BlogError) => {
            notification.error({
              message: 'Failed to delete blog'
            });
          });
      }
    });
  };

  return (
    <div>
      <Link onClick={() => showModal(blog)}>Show Modal</Link>
      <br />
      <Link onClick={() => softDeleteBlogHandler(blogId)}>Delete</Link>{' '}
    </div>
  );
};

export default BlogsList;
