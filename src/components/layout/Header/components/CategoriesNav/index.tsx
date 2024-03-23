import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../../../pages/site/client.service';
import './CategoriesNav.scss';
const CategoriesNav = () => {
  const { data, isFetching } = useGetCategoriesQuery();

  return (
    <div className='header__categories'>
      <div className='container'>
      <div className='header__categories-wrap'>
        {isFetching && <Skeleton.Input block={true} />}

        {!isFetching &&
          (data?.categories || []).map((category) => {
            return (
              <div key={category._id} className='header__categories-item'>
                <Link to={`courses?_topic=${category._id}`}>{category.name}</Link>
              </div>
            );
          })}
      </div>
      </div>
    </div>
  );
};

export default CategoriesNav;
