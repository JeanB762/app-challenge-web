import { Typography, Button, Layout, List, Modal, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { deleteCompany, getCompanies } from '../../services/companies';
import { ICompany } from '../Units';

const { Content } = Layout;

export const Companies: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const navigate = useNavigate();

  async function loadData() {
    setLoading(true);
    const companiesResponse: AxiosResponse = await getCompanies();
    setCompanies(companiesResponse.data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDeleteCompany() {
    setConfirmLoading(true);
    await deleteCompany(selectedCompany);
    setConfirmLoading(false);
    setOpen(false);
    loadData();
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  return (
    <Content>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <Typography.Title level={4}>Companies</Typography.Title>
        <Button
          icon={<PlusOutlined />}
          type='primary'
          onClick={() => navigate('/companies/create-company')}
        >
          Create Company
        </Button>
      </div>
      <List
        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}
        loading={loading}
        itemLayout='horizontal'
        dataSource={companies}
        renderItem={(item) => (
          <List.Item
            actions={[
              <div style={{ display: 'flex', gap: 8 }}>
                <Button
                  onClick={() =>
                    navigate('/companies/create-company', { state: { item } })
                  }
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Button
                  type='default'
                  danger
                  onClick={() => {
                    setSelectedCompany(item._id);
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
              title='Delete Company'
              open={open}
              onOk={() => handleDeleteCompany()}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Typography.Text>
                Do you want to remove this company permanently?
              </Typography.Text>
            </Modal>
            <Skeleton title={false} loading={loading} active>
              <List.Item.Meta title={item.name} />
            </Skeleton>
          </List.Item>
        )}
      />
    </Content>
  );
};
