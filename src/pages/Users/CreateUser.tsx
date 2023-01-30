import { Button, message, Form, Input, Select, Upload, Avatar } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { createUser, updateUser } from '../../services/users';
import { getCompanies } from '../../services/companies';
import { getUnits } from '../../services/units';
import { ICompany, IUnit } from '../Units';
import { IUser } from '.';

const { Option } = Select;

export const CreateUser: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [units, setUnits] = useState<IUnit[]>([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const [fileList, setFileList] = useState<any>([]);

  useEffect(() => {
    if (location.state?.item) {
      form.setFieldsValue(location.state.item);
    }
  }, []);

  const handleUpload = ({ fileList }: any) => {
    setFileList(fileList);
  };

  async function loadData() {
    const companiesResponse: AxiosResponse = await getCompanies();
    setCompanies(companiesResponse.data);
    const unitsResponse: AxiosResponse = await getUnits();
    setUnits(unitsResponse.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: IUser) => {
    const { email, name, companyId, password, role, unitId } = values;
    const formData = new FormData();

    const file = fileList[0]?.originFileObj;

    if (file !== undefined) {
      formData.append('avatar', fileList[0].originFileObj);
    } else {
      formData.append('avatar', location.state.item.avatar);
    }

    if (password) formData.append('password', String(password));
    formData.append('name', name);
    formData.append('email', email);
    formData.append('companyId', companyId);
    formData.append('unitId', unitId);
    formData.append('role', role);

    try {
      location?.state?.item
        ? await updateUser(location.state.item._id, formData)
        : await createUser(formData);
      messageApi.open({
        type: 'success',
        content: location?.state?.item
          ? 'User updated successfully'
          : 'User created successfully',
      });
      setTimeout(() => navigate('/users'), 1000);
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
        name='create-user'
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
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input a email!' }]}
        >
          <Input />
        </Form.Item>
        {!location?.state?.item && (
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input a password!' }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          label='Role'
          name='role'
          rules={[{ required: true, message: 'Please input a role!' }]}
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

        <Form.Item
          label='Unit'
          name='unitId'
          rules={[{ required: true, message: 'Please input a unit!' }]}
        >
          <Select style={{ width: 800 }} placeholder='select a Unit'>
            {companies &&
              units.map((unit) => (
                <Option key={unit._id} value={unit._id}>
                  {unit.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label='Avatar'
          valuePropName='avatar'
          rules={[{ required: true, message: 'Please choice an avatar!' }]}
        >
          <Upload
            listType='picture'
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleUpload}
          >
            <Button icon={<UploadOutlined />}>Choice your avatar</Button>
          </Upload>
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
