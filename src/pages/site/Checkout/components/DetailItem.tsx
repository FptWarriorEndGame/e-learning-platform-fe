import { Fragment } from 'react';
import { BACKEND_URL } from '../../../../constant/backend-domain';

type DetailItemProps = {
  courseItem: {
    _id: string;
    name: string;
    thumbnail: string;
    finalPrice: number;
  };
};
const DetailItem = (props: DetailItemProps) => {

  const courseItem = props.courseItem;

  const { name, finalPrice, thumbnail } = courseItem;

  let thumbnailUrl = '';
  if (thumbnail.startsWith('http')) {
    thumbnailUrl = thumbnail;
  } else {
    thumbnailUrl = `${BACKEND_URL}/${thumbnail}`;
  }

  return (
    <Fragment>
      <div className='checkout__orders-detail-item'>
        <div className='detail-item'>
          <img src={thumbnailUrl} alt={name} className='detail-item__img' />
          <div className='detail-item__name'>{name}</div>
          <div className='detail-item__price'>${finalPrice}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailItem;
