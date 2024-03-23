import { Space } from 'antd';
import React, { Fragment } from 'react';

const SettingHeader = () => {
  return (
    <>
      <Fragment>
        <Space>
          <h3 className='admin-header__page-title'>SETTINGS</h3>
        </Space>
        <Space className='admin-header__notify'></Space>
      </Fragment>
    </>
  );
};

export default SettingHeader;
