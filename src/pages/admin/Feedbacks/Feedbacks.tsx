import React from 'react';
import FeedbacksTable from './FeedbacksTable/FeedbacksTable';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const Feedbacks: React.FC = () => {
  return (
    <div>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Feedbacks'
            },
            {
              title: <Link to='#'>Feedbacks</Link>
            }
          ]}
        />
      </div>
      <FeedbacksTable />
    </div>
  );
};

export default Feedbacks;
