import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
const CancelledSales = () => {
  return (
    <div>
      <div className='breakcrumb'>
        <Breadcrumb
          items={[
            {
              title: 'Reports Center'
            },
            {
              title: 'Sales'
            },
            {
              title: <Link to='#'>Cancelled Sales</Link>
            }
          ]}
        />
      </div>
      CancelledSales
    </div>
  );
};

export default CancelledSales;
