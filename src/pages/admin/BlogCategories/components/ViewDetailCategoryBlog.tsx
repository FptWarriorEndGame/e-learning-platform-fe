import { Button, Modal, Table } from 'antd';
import { useGetBlogCategoryByIdQuery } from '../categoriesBlog.service';
import { transformDate } from '../../../../utils/functions';

interface ViewDetailCategoryBlogProps {
  isVisible: boolean;
  onClose: () => void;
  blogCategoryId: string;
}

const ViewDetailCategoryBlog: React.FC<ViewDetailCategoryBlogProps> = ({ blogCategoryId, isVisible, onClose }) => {
  const { data: categoryDetail, isFetching: isCategoryFetching } = useGetBlogCategoryByIdQuery(blogCategoryId);
  const dataCategoryDetail = categoryDetail?.blogsCategories;

  console.log('dataCategoryDetail', dataCategoryDetail);

  return (
    <>
      <Modal visible={isVisible} onCancel={onClose} footer={null}>
        {categoryDetail && (
          <>
            <div className='title text-3xl mb-7'>
              <span className=''>Blog Category Details</span>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Id Blog:</p> <p>{dataCategoryDetail?._id}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Code Blog Category:</p> <p>{dataCategoryDetail?.code}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Category Blog Name:</p> <p>{dataCategoryDetail?.name}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Description:</p> <p>{dataCategoryDetail?.description}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Created By:</p>{' '}
              <p>
                {' '}
                {typeof dataCategoryDetail?.createdBy === 'string'
                  ? dataCategoryDetail?.createdBy
                  : dataCategoryDetail?.createdBy?.name ?? 'N/A'}
              </p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Create At:</p> <p>{transformDate(dataCategoryDetail?.createdAt || '')}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Update By:</p>{' '}
              <p>
                {' '}
                {typeof dataCategoryDetail?.createdBy === 'string'
                  ? dataCategoryDetail?.createdBy
                  : dataCategoryDetail?.createdBy?.name ?? 'N/A'}
              </p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Update At:</p> <p>{transformDate(dataCategoryDetail?.updatedAt || '')}</p>
            </div>
            <div className='name text-2xl flex justify-between mb-7'>
              <p>Update At:</p> <p>{dataCategoryDetail?.isDeleted ? 'Inactive' : 'Active'}</p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ViewDetailCategoryBlog;
