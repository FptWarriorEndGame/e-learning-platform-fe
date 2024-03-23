import React, { useState } from 'react';
import './UserProfile.scss';

interface UserProfileProps {
  name: string;
  bio: string;
  avatarUrl: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, bio, avatarUrl }) => {
  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState('Learning');

  // Function to handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="user-profile">
      <div className='user-profile-top'>
        <div className='container'>
          <h1 className="user-profile__name">{name}</h1>
        </div>
      </div>
      <div className='user-profile-bottom'>
        <div className='container'>
          <img src={avatarUrl} alt="avatar" className="user-profile__avatar" />
          <div className="user-profile__info">
            <p className="user-profile__bio">{bio}</p>
          </div>
        </div>
      </div>

      {/* Tabs for Learning and Wishlist */}
      <div className='tabs'>
        <div
          className={`tab ${activeTab === 'Learning' ? 'active' : ''}`}
          onClick={() => handleTabClick('Learning')}
        >
          Learning
        </div>
        <div
          className={`tab ${activeTab === 'Wishlist' ? 'active' : ''}`}
          onClick={() => handleTabClick('Wishlist')}
        >
          Wishlist
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
