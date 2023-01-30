import { Typography, Button, Layout, List, Modal, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { getCompanies } from '../../services/companies';
import { deleteUnit, getUnits } from '../../services/units';

const { Content } = Layout;

export interface ICompany {
  _id: string;
  name: string;
}

export interface IUnit {
  _id: string;
  name: string;
  companyId: string;
}

export const Units: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [units, setUnits] = useState<IUnit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState('');
  const navigate = useNavigate();

  async function loadData() {
    setLoading(true);
    const companiesResponse: AxiosResponse = await getCompanies();
    setCompanies(companiesResponse.data);
    const unitsResponse: AxiosResponse = await getUnits();
    setUnits(unitsResponse.data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDeleteUnit() {
    setConfirmLoading(true);
    await deleteUnit(selectedUnit);
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
        <Typography.Title level={4}> Units</Typography.Title>
        <Button
          icon={<PlusOutlined />}
          type='primary'
          onClick={() => navigate('/units/create-unit')}
        >
          Create Unit
        </Button>
      </div>
      <List
        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}
        loading={loading}
        itemLayout='horizontal'
        dataSource={units}
        renderItem={(item) => (
          <List.Item
            actions={[
              <div style={{ display: 'flex', gap: 8 }}>
                <Button
                  onClick={() =>
                    navigate('/units/create-unit', { state: { item } })
                  }
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Button
                  type='default'
                  danger
                  onClick={() => {
                    setSelectedUnit(item._id);
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
              title='Delete Unit'
              open={open}
              onOk={() => handleDeleteUnit()}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Typography.Text>
                Do you want to remove this unit permanently?
              </Typography.Text>
            </Modal>
            <Skeleton title={false} loading={loading} active>
              <List.Item.Meta
                title={item.name}
                description={
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {companies.map((company) => {
                      if (company._id === item.companyId)
                        return (
                          <Typography.Text type='secondary' key={company._id}>
                            {company.name}
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
