import { Button, message, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { getUsers } from '../../services/users';
import { getCompanies } from '../../services/companies';
import { getUnits } from '../../services/units';
import { createAssets, updateAssets } from '../../services/assets';
import { ICompany, IUnit } from '../Units';
import { IUser } from '../Users';
import { IAsset } from '.';
import { healthOptions } from '../../utils/healthOptions';

const { Option } = Select;

export const CreateAsset: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState<IUser[]>();
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
    const usersResponse = await getUsers();
    setUsers(usersResponse.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values: IAsset) => {
    const {
      name,
      companyId,
      description,
      healthlevel,
      model,
      owner,
      status,
      unitId,
      responsibles,
    } = values;
    const formData = new FormData();

    const file = fileList[0]?.originFileObj;

    if (file !== undefined) {
      formData.append('image', fileList[0].originFileObj);
    } else {
      formData.append('image', location.state.item.image);
    }
    formData.append('name', name);
    formData.append('description', description);
    formData.append('model', model);
    formData.append('owner', owner);
    formData.append('status', status);
    formData.append('healthlevel', healthlevel);
    formData.append('companyId', companyId);
    formData.append('unitId', unitId);
    responsibles.map((responsible) =>
      formData.append('responsibles', responsible)
    );

    try {
      location?.state?.item
        ? await updateAssets(location.state.item._id, formData)
        : await createAssets(formData);
      messageApi.open({
        type: 'success',
        content: location?.state?.item
          ? 'Asset updated successfully'
          : 'Asset created successfully',
      });
      setTimeout(() => navigate('/assets'), 1000);
    } catch (error: any) {
      messageApi.open({
        type: 'error',
        content: `${error.response.data.message}`,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    return;
  };

  return (
    <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
      {contextHolder}

      <Form
        form={form}
        name='create-asset'
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
          label='Description'
          name='description'
          rules={[{ required: true, message: 'Please input a description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Model'
          name='model'
          rules={[{ required: true, message: 'Please input a model!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Owner'
          name='owner'
          rules={[{ required: true, message: 'Please input a owner!' }]}
        >
          <Select style={{ width: 800 }} placeholder='select a owner'>
            {companies &&
              companies.map((company) => (
                <Option key={company._id} value={company._id}>
                  {company.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label='Status'
          name='status'
          rules={[{ required: true, message: 'Please input a status!' }]}
        >
          <Select style={{ width: 800 }} placeholder='select a status'>
            <Option value='running'>Running</Option>
            <Option value='alerting'>Alerting</Option>
            <Option value='stopped'>Stopped</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Health Level'
          name='healthlevel'
          rules={[{ required: true, message: 'Please input a Health Level!' }]}
        >
          <Select style={{ width: 800 }} placeholder='select a health level'>
            {healthOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
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
          label='Responsible'
          name='responsibles'
          rules={[{ required: true, message: 'Please select users!' }]}
        >
          <Select
            style={{ width: 800 }}
            placeholder='select a user'
            mode='multiple'
          >
            {users &&
              users.map((user) => (
                <Option key={user._id} value={user._id}>
                  {user.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label='Image' valuePropName='image'>
          <Upload
            listType='picture'
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleUpload}
          >
            <Button icon={<UploadOutlined />}>
              Choice an image for this asset
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item style={{ width: 800 }}>
          <Button style={{ width: 800 }} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
