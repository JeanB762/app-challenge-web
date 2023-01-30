import { Button, message, Form, Input, Select } from 'antd';

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { createCompany, updateCompany } from '../../services/companies';
import { ICompany } from '../Units';

const { Option } = Select;

export const CreateCompany: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.item) {
      form.setFieldsValue(location.state.item);
    }
  }, []);

  const onFinish = async (values: ICompany) => {
    const { name } = values;

    try {
      location?.state?.item
        ? await updateCompany(location.state.item._id, { name })
        : await createCompany({ name });
      messageApi.open({
        type: 'success',
        content: location?.state?.item
          ? 'Comapny updated successfully'
          : 'Comapny created successfully',
      });
      setTimeout(() => navigate('/companies'), 1000);
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: `${error.response.data.message}`,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name='create-company'
        labelCol={{ span: 8 }}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout='vertical'
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input a name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ width: 800 }}>
          <Button style={{ width: 800 }} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
