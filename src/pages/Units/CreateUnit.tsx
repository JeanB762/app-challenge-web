import { Button, message, Form, Input, Select } from 'antd';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { getCompanies } from '../../services/companies';
import { createUnit, updateUnit } from '../../services/units';
import { IUnit, ICompany } from '.';

const { Option } = Select;

export const CreateUnit: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  async function loadData() {
    const companiesResponse: AxiosResponse = await getCompanies();
    setCompanies(companiesResponse.data);
  }

  useEffect(() => {
    if (location.state?.item) {
      form.setFieldsValue(location.state.item);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: IUnit) => {
    const { name, companyId } = values;

    try {
      location?.state?.item
        ? await updateUnit(location.state.item._id, { name, companyId })
        : await createUnit({ name, companyId });
      messageApi.open({
        type: 'success',
        content: location?.state?.item
          ? 'Unit updated successfully'
          : 'Unit created successfully',
      });
      setTimeout(() => navigate('/units'), 1000);
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
        name='create-unit'
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

        <Form.Item
          label='Company'
          name='companyId'
          rules={[{ required: true, message: 'Please input a company!' }]}
        >
          <Select style={{ width: 800 }} placeholder='select a company'>
            {companies &&
              companies.map((company) => (
                <Option key={company._id} value={company._id}>
                  {company.name}
                </Option>
              ))}
          </Select>
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
