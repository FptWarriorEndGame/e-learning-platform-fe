import React from 'react';
import { Tabs } from 'antd';
import ProfileForm from './ProfileForm/ProfileForm';
import PrivacyForm from './PrivacyForm/PrivacyForm';
import PictureForm from './PictureForm/PictureForm';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../client.service';
import { RootState } from '../../../store/store';
import styles from './AccountSettings.module.scss';


const AccountSetting: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { data: userData, isSuccess } = useGetUserQuery(userId);


  const tabsItems = [
    {
      label: 'E-Learning profile',
      key: '1',
      children: <ProfileForm userData={userData} userId={userId} isSuccess={isSuccess} />
    },
    {
      label: 'Profile picture',
      key: '2',
      children: <PictureForm userData={userData} userId={userId} isSuccess={isSuccess} />
    },
    {
      label: 'Privacy settings',
      key: '3',
      children: <PrivacyForm userData={userData} userId={userId} isSuccess={isSuccess} />
    }
  ];

  return (
    <div className={styles.accountSettings}>
      <div className={`container`}>
        <h2 className={`${styles.accountSettings__title} spacing-h-sm`}>Account Settings</h2>
        <Tabs defaultActiveKey='1' className={styles.accountSettings__tabs} items={tabsItems} />
      </div>
    </div>
  );
};

export default AccountSetting;
