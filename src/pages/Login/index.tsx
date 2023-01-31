import { Button, Card, Form, Input, Typography, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    const { email, password } = values;
    try {
      await login(email, password);
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: (
          <>
            <p>Email or password incorrect</p>
            <p>Please, try again</p>
          </>
        ),
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    return;
  };

  return (
    <div
      style={{
        display: 'flex',
        height: 'calc(100vh - 50px)',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0093E9',
        backgroundImage: 'linear-gradient(160deg, #97ABFF 0%, #123597 100%)',
      }}
    >
      {contextHolder}
      <Card
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 900,
          height: 500,
        }}
      >
        <h1>Welcome</h1>
        <h2>Login to your account to continue</h2>
        <Form
          name='basic'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout='vertical'
          style={{ width: '500px' }}
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input your E-mail!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
