// import { Menu } from 'antd';
import { AppSideMenuContainer } from '../../styles/SideMenu';

import {
  ShopOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

export const SideMenu: React.FC = () => {
  const navigate = useNavigate();

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Home', '/', <HomeOutlined />),
    getItem('Users', '/users', <TeamOutlined />),
    getItem('Companies', '/companies', <ShopOutlined />),
    getItem('Units', '/units', <EnvironmentOutlined />),
    getItem('Assets', '/assets', <ThunderboltOutlined />),
  ];
  return (
    <AppSideMenuContainer>
      <Menu
        style={{ height: 'calc(100vh - 125px)', width: 200 }}
        items={items}
        onClick={({ key }) => {
          navigate(key);
        }}
      />
    </AppSideMenuContainer>
  );
};
