import { Avatar, Button, Layout, List, Modal, Skeleton } from 'antd';
import { Typography } from 'antd';
import {
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { deleteUser, getUsers } from '../../services/users';
import { getCompanies } from '../../services/companies';
import { getUnits } from '../../services/units';
import avatar from '../../assets/avatar.png';
import { ICompany, IUnit } from '../Units';

const { Content } = Layout;

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  avatar: string;
  companyId: string;
  unitId: string;
}

export const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [units, setUnits] = useState<IUnit[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  async function loadData() {
    const companiesResponse: AxiosResponse = await getCompanies();
    setCompanies(companiesResponse.data);
    const unitsResponse: AxiosResponse = await getUnits();
    setUnits(unitsResponse.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {}, [companies, units]);

  async function listUsers() {
    setLoading(true);
    const response: AxiosResponse = await getUsers();
    setUsers(response.data);
    setLoading(false);
  }

  async function handleDeleteUser() {
    setConfirmLoading(true);
    await deleteUser(selectedUser);
    setConfirmLoading(false);
    setOpen(false);
    listUsers();
  }

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <Content>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <Typography.Title level={4}> Users</Typography.Title>
        <Button
          icon={<UserAddOutlined />}
          type='primary'
          onClick={() => navigate('/users/create-user')}
        >
          Create User
        </Button>
      </div>
      <List
        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}
        loading={loading}
        itemLayout='horizontal'
        dataSource={users}
        renderItem={(item) => (
          <List.Item
            actions={[
              <div style={{ display: 'flex', gap: 8 }}>
                <Button
                  onClick={() =>
                    navigate('/users/create-user', { state: { item } })
                  }
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Button
                  type='default'
                  danger
                  onClick={() => {
                    setSelectedUser(item._id);
                    showModal();
                  }}
                  icon={<DeleteOutlined />}
                >
                  Delete
                </Button>
              </div>,
            ]}
          >
            <Modal
              title='Delete User'
              open={open}
              onOk={() => handleDeleteUser()}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Typography.Text>
                Do you want to remove this user permanently?
              </Typography.Text>
            </Modal>
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      item.avatar
                        ? `http://localhost:3333/avatar/${item.avatar}`
                        : avatar
                    }
                  />
                }
                title={item.name}
                description={
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography.Text type='secondary'>
                      {item.email}
                    </Typography.Text>
                    <Typography.Text type='secondary'>
                      {item.role}
                    </Typography.Text>
                    {companies.map((company) => {
                      if (company._id === item.companyId)
                        return (
                          <Typography.Text type='secondary' key={company._id}>
                            {company.name}
                          </Typography.Text>
                        );
                    })}

                    {units.map((unit) => {
                      if (unit._id === item.unitId)
                        return (
                          <Typography.Text type='secondary' key={unit._id}>
                            {unit.name}
                          </Typography.Text>
                        );
                    })}
                  </div>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Content>
  );
};
