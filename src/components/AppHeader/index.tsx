import { Typography } from 'antd';
import { AppHeaderContainer } from '../../styles/AppHeader';
import logo from '../../assets/tractian-logo.png';

export const AppHeader: React.FC = () => {
  return (
    <AppHeaderContainer>
      <img width={40} src={logo}></img>
      <Typography.Title style={{ marginBottom: 0 }}>
        Tractian App Challenge
      </Typography.Title>
      <div />
    </AppHeaderContainer>
  );
};
