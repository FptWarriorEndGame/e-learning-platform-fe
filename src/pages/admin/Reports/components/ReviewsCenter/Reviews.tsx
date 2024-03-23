import React from 'react';
import ReviewsTable from './ReviewsTable/ReviewsTable';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const Reviews: React.FC = () => {
  return (
    <div>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Reports Center'
            },
            {
              title: 'Exams'
            },
            {
              title: <Link to='#'>Review center</Link>
            }
          ]}
        />
      </div>
      <ReviewsTable />
    </div>
  );
};

export default Reviews;
