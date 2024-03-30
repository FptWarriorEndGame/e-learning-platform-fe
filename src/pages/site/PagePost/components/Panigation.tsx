import { Pagination } from 'antd';

interface PaginationProps {
  total?: number;
  pageSize: number;
  current: number;
  onChange: (page: number, pageSize?: number) => void;
}

const Panigation = ({ current, pageSize, total, onChange }: PaginationProps) => {
  return (
    <div>
      <Pagination current={current} pageSize={pageSize} total={total} onChange={onChange} />
    </div>
  );
};

export default Panigation;
