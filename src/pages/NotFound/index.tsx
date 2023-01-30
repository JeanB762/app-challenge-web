import { Card, Typography } from 'antd';
import React from 'react';

export const NotFound: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 125px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={1}>404</Typography.Title>
        <Typography.Title level={3}>Page Not Found</Typography.Title>
      </div>
    </div>
  );
};
