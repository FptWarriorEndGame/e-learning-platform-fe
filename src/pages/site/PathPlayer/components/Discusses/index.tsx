import { Button } from 'antd';
import { useState } from 'react';
import DiscussList from './components/DiscussList';

type Props = {
  className: string;
};

const Discusses = (props: Props) => {
  return (
    <div className={props.className + ' discusses'}>
      {' '}
      <DiscussList />
    </div>
  );
};

export default Discusses;
