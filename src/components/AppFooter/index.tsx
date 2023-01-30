import { Image, Layout, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { AppFooterContainer } from '../../styles/AppFooter';
import Link from 'antd/es/typography/Link';
import logo from '../../assets/logo.svg';

export const AppFooter: React.FC = () => {
  return (
    <AppFooterContainer>
      <div
        style={{
          backgroundColor: '#1e3a8a',
          padding: '8px',
          borderRadius: '4px',
        }}
      >
        <img height={16} src={logo}></img>
      </div>
      <Typography>
        Tractian App Challenge ©2023 Created by Jean Borges
      </Typography>
      <Link href='https://github.com/jeanb762' target='_blank'>
        <GithubOutlined style={{ fontSize: 24 }} />
      </Link>
    </AppFooterContainer>
  );
};
