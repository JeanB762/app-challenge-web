import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  height: calc(100vh - 125px);
  gap: 8px;
  max-height: calc(100vh - 125px);
`;
