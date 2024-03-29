/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useSelector } from 'react-redux';
import { useGetAllUserByLessonQuery } from '../../../client.service';
import { RootState } from '../../../../../store/store';
import { Avatar, Card, Tooltip } from 'antd';

type Props = {
  className: string;
};

const Learners = (props: Props) => {
  const lessonId = useSelector((state: RootState) => state.client.lessonId);
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUserByLessonQuery({ lessonId });

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
                <Avatar src={user.avatar} className='cursor-pointer' />
              </Tooltip>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Learners;
