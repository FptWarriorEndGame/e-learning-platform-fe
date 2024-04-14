/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useSelector } from 'react-redux';
import { useGetAllUserByCourseQuery } from '../../../client.service';
import { RootState } from '../../../../../store/store';
import { Avatar, Card, Tooltip } from 'antd';
import { useSearchParams } from 'react-router-dom';

type Props = {
  className: string;
};

const Learners = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') || '';

  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUserByCourseQuery({ courseId });

  const userAvatars = usersData?.users;

  return (
    <div className={`${props.className} learners p-4`}>
      <Card>
        <div className='learners__list'>
          {isLoadingUsers ? (
            <div className=''>
              <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          ) : (
            userAvatars?.map((user) => (
              <Tooltip title={user.name} key={user._id}>
                <Avatar src={`https://loremflickr.com/320/240?random=${user._id}`} className='cursor-pointer' />
              </Tooltip>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Learners;
