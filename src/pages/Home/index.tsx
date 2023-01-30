import { Layout, Typography, Card, Col, Row } from 'antd';
import HighchartsReact from 'highcharts-react-official';
const { Content } = Layout;
import Highcharts from 'highcharts/highstock';
import { downtimeOptions, temperatureOptions } from '../../utils/chartOptions';

export const Home: React.FC = () => {
  return (
    <Content
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        gap: '16px',
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: 'calc(100vh - 150px)',
      }}
    >
      <Typography.Title level={4}>Home</Typography.Title>
      <div className='site-card-wrapper'>
        <Row gutter={24} style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Card bordered>
              <HighchartsReact
                highcharts={Highcharts}
                options={temperatureOptions}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Card bordered>
              <Card bordered={false}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={downtimeOptions}
                />
              </Card>
            </Card>
          </Col>
        </Row>
      </div>
    </Content>
  );
};
