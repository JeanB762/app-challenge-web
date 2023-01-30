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
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);
  return (
    <AppContainer>
      {!!token && <AppHeader />}
      <Space>
        {!!token ? (
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
