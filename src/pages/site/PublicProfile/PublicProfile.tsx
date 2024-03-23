import React, { Fragment } from 'react'
import UserProfile from './components/UserProfile';
import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';

const PublicProfile = () => {
  return (
    <div>
    <div className='mx-auto px-4 pb-20 pt-40'> 
        <UserProfile name={'Dinh Dung'} bio={'Dinh DUng'} avatarUrl={'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/302056622_3290169647892567_7340063937598642982_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=9TUPhEnYDjgAX-PdoV2&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCrVhe3DGlU8qVq2t_jcP71hEy3arZHIrE5MXcR5VG8sA&oe=658037DE'} />
    </div>
    
    <div className='container mx-auto px-4 pb-20 pt-40'>
      <Outlet/>
    </div>
    
  </div>

  )
}

export default PublicProfile;