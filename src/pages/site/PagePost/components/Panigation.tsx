import { Pagination } from 'antd';

interface PaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number, pageSize: number) => void;
}

const Panigation = ({ page, pageSize, onPageChange, totalPages }: PaginationProps) => {
  return (
    <div>
      <Pagination
        current={page}
        pageSize={pageSize}
        total={totalPages * pageSize}
        onChange={(page, pageSize) => onPageChange(page, pageSize)}
      />
    </div>
  );
};

export default Panigation;
