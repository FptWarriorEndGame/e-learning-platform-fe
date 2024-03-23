import { Space } from 'antd';
import { Fragment } from 'react';
const ReviewsHeader = () => {
  return (
    <Fragment>
      <Space>
        <h3 className='admin-header__page-title'>Reviews</h3>
      </Space>
      <Space className='admin-header__notify'></Space>
    </Fragment>
  );
};

export default ReviewsHeader;
