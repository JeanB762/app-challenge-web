import { Button, Typography } from 'antd';

import { LogoutOutlined } from '@ant-design/icons';
import { AppHeaderContainer } from '../../styles/AppHeader';
import logo from '../../assets/tractian-logo.png';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export const AppHeader: React.FC = () => {
  const { logout } = useContext(AuthContext);
  return (
    <AppHeaderContainer>
      <img width={40} src={logo}></img>
      <Typography.Title style={{ marginBottom: 0 }}>
        Tractian App Challenge
      </Typography.Title>
      <Button type='ghost' onClick={logout}>
        <LogoutOutlined style={{ fontSize: 24 }} />
        <Typography>Exit</Typography>
      </Button>
    </AppHeaderContainer>
  );
};
