import { Space } from 'antd';
import { Fragment } from 'react';
const FeedbacksHeader = () => {
  return (
    <Fragment>
      <Space>
        <h3 className='admin-header__page-title'>Feedbacks</h3>
      </Space>
      <Space className='admin-header__notify'></Space>
    </Fragment>
  );
};

export default FeedbacksHeader;
