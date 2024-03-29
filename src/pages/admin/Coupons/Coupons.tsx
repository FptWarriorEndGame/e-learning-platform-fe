import React from 'react';
import CouponsTable from './CouponsTable/CouponsTable';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Coupons: React.FC = () => {
  return (
    <div>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Marketing'
            },
            {
              title: <Link to='#'>Coupons</Link>
            }
          ]}
        />
      </div>
      <CouponsTable />
    </div>
  );
};

export default Coupons;
