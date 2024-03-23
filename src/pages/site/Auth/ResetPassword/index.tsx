import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';

const ResetPasswordPage = () => {
  const location = useLocation();
  const [token, setToken] = useState('');

  // Extract the token from the URL when the component mounts
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenParam = query.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      notification.error({
        message: 'Invalid Request',
        description: 'No token provided in URL.'
      });
    }
  }, [location]);

  // Copy token to clipboard
  const copyTokenToClipboard = () => {
    navigator.clipboard.writeText(token).then(
      () => {
        notification.success({
          message: 'Token Copied',
          description: 'Token has been copied to clipboard.'
        });
      },
      (err) => {
        notification.error({
          message: 'Failed to Copy Token',
          description: 'Failed to copy token to clipboard.'
        });
      }
    );
  };

  return (
    <div style={{ width: 500, margin: 'auto', backgroundColor: '' }}>
      {token && (
        <div style={{ marginTop: '20px' }}>
          <h1 className='text-2xl mb-2'>Please copy the token to change the password</h1>
          <Input value={token} disabled />
          <Button style={{ marginTop: '10px' }} onClick={copyTokenToClipboard}>
            Copy Token
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
