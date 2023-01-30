import { Avatar, Button, Image, Layout, List, Modal, Skeleton } from 'antd';
import { Typography } from 'antd';
import {
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { getCompanies } from '../../services/companies';
import { getUnits } from '../../services/units';
import { ICompany, IUnit } from '../Units';
import { deleteAssets, getAssets } from '../../services/assets';
import avatar from '../../assets/avatar.png';

const { Content } = Layout;

export interface IAsset {
  _id: string;
  name: string;
  description: string;
  model: string;
  owner: string;
  status: string;
  healthlevel: string;
  image: string;
  companyId: string;
  unitId: string;
  responsibles: string[];
}

export const Assets: React.FC = () => {
  const [assets, setAssets] = useState<IAsset[]>();
  const [selectedAsset, setSelectedAsset] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [units, setUnits] = useState<IUnit[]>([]);
  const navigate = useNavigate();

  async function loadData() {
    setLoading(true);
    const response: AxiosResponse = await getAssets();
    setAssets(response.data);
    const companiesResponse: AxiosResponse = await getCompanies();
    setCompanies(companiesResponse.data);
    const unitsResponse: AxiosResponse = await getUnits();
    setUnits(unitsResponse.data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDeleteAsset() {
    setConfirmLoading(true);
    await deleteAssets(selectedAsset);
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
        <Typography.Title level={4}> Assets</Typography.Title>
        <Button
          icon={<UserAddOutlined />}
          type='primary'
          onClick={() => navigate('/assets/create-asset')}
        >
          Create Asset
        </Button>
      </div>
      <List
        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 250px)' }}
        loading={loading}
        itemLayout='horizontal'
        dataSource={assets}
        renderItem={(item) => (
          <List.Item
            actions={[
              <div style={{ display: 'flex', gap: 8 }}>
                <Button
                  onClick={() =>
                    navigate('/assets/create-asset', { state: { item } })
                  }
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
                <Button
                  type='default'
                  danger
                  onClick={() => {
                    setSelectedAsset(item._id);
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
              title='Delete Asset'
              open={open}
              onOk={() => handleDeleteAsset()}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <Typography.Text>
                Do you want to remove this asset permanently?
              </Typography.Text>
            </Modal>
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={
                  <div style={{ maxHeight: 250, maxWidth: 250 }}>
                    <Image
                      height={250}
                      src={
                        item.image
                          ? `http://localhost:3333/assetsPictures/${item.image}`
                          : avatar
                      }
                    />
                  </div>
                }
                title={item.name}
                description={
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography.Text type='secondary'>
                      Description: {item.description}
                    </Typography.Text>

                    {companies.map((company) => {
                      if (company._id === item.companyId)
                        return (
                          <Typography.Text type='secondary' key={company._id}>
                            Company: {company.name}
                          </Typography.Text>
                        );
                    })}

                    <Typography.Text type='secondary'>
                      Health level: {item.healthlevel}
                    </Typography.Text>
                    <Typography.Text type='secondary'>
                      Model: {item.model}
                    </Typography.Text>
                    <Typography.Text type='secondary'>
                      Status: {item.status}
                    </Typography.Text>
                    {companies.map((company) => {
                      if (company._id === item.owner)
                        return (
                          <Typography.Text type='secondary' key={company._id}>
                            Owner: {company.name}
                          </Typography.Text>
                        );
                    })}

                    {units.map((unit) => {
                      if (unit._id === item.unitId)
                        return (
                          <Typography.Text type='secondary' key={unit._id}>
                            Unit: {unit.name}
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
