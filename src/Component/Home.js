import React, { useEffect, useState } from 'react';
import { Table, Form, Input, Button, Row, Col, message, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: 'Họ tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'sdt', key: 'sdt' },
    { title: 'Vị trí thực tập', dataIndex: 'position', key: 'position' },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern', {
        params: { search: searchValue },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchValue]); 

  const handleSearch = () => {
    fetchData();
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <div>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="search" noStyle>
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                prefix={<SearchOutlined />}
                placeholder="Tìm kiếm thông tin"
                style={{ width: '60%', marginRight: '8px' }} 
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default Home;
