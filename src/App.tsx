import { Space } from 'antd';
import { AppContainer, ContentContainer } from './styles/App';
import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { PageContent } from './components/PageContent';
import { SideMenu } from './components/SideMenu';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Context/AuthContext';
import { LoginRoutes } from './Routes';
import { useNavigate } from 'react-router-dom';

function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <AppContainer>
      {!!loggedIn && <AppHeader />}
      <Space>
        {!!loggedIn ? (
          <ContentContainer>
            <SideMenu />
            <PageContent />
          </ContentContainer>
        ) : (
          <>
            <LoginRoutes />
          </>
        )}
      </Space>
      <AppFooter />
    </AppContainer>
  );
}

export default App;
