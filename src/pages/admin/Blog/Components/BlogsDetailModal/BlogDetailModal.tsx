import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { IBlog } from '../../../../../types/blog.type';
import { ICategoryBlogs } from '../../../../../types/categoryBlogs.type';
import { transformDate } from '../../../../../utils/functions';

interface BlogDetailModalProps {
  blog: IBlog | null;
  isVisible: boolean;
  onClose: () => void;
  categories: ICategoryBlogs[];
}

const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ blog, isVisible, onClose, categories }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [modalWidth, setModalWidth] = useState(520); // Default modal width

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c._id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  useEffect(() => {
    setModalWidth(showFullContent ? 800 : 520); // Adjust modal width based on content visibility
  }, [showFullContent]);

  if (!blog) return null;

  const toggleContentVisibility = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <Modal visible={isVisible} onCancel={onClose} footer={null} width={modalWidth}>
      <h2 className='text-center mb-2 text-4xl'>Detail Blogs</h2>
      <div className='blog-detail-modal flex'>
        <img className='mr-6' src={blog.blogImg} alt={blog.title} style={{ width: '40%', marginBottom: '20px' }} />
        <div>
          <h3>
            Author: <span className='opacity-70'>{blog.author}</span>
          </h3>
          <p>
            Title: <span className='opacity-70'>{blog.title}</span>
          </p>
          <p>
            Category: <span className='opacity-70'>{getCategoryName(blog.categoryId)}</span>
          </p>
          <p>
            Date: <span className='opacity-70'>{transformDate(blog.datePublished)}</span>
          </p>
          <p>
            Technology: <span className='opacity-70'>{blog.technology}</span>
          </p>
          <p>
            Create At:{' '}
            <span className='opacity-70'>
              {transformDate(blog.createdAt ? blog.createdAt : new Date().toISOString())}
            </span>
          </p>
          <div>
            Content:
            <span className='opacity-70'>
              {showFullContent ? blog.content : `${blog.content.substring(0, 100)}...`}
            </span>
            {blog.content.length > 100 && (
              <Button type='link' onClick={toggleContentVisibility}>
                {showFullContent ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BlogDetailModal;
