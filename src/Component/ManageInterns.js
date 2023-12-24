import React, { useEffect, useState } from 'react';
import { Table, Form, Input, Button, Row, Col, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addIntern, setInterns, updateIntern, deleteIntern } from '../actions/internActions';
import axios from 'axios';

const InternManagement = () => {
  const dispatch = useDispatch();
  const allInterns = useSelector((state) => state.intern.interns);
  const [interns, setFilteredInterns] = useState(allInterns);
  const [originalInterns, setOriginalInterns] = useState(allInterns);
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedInternId, setEditedInternId] = useState(null);
  const [newExpert, setNewExpert] = useState({
    name: '',
    email: '',
    sdt: '',
    position: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchValues, setSearchValues] = useState({
    name: '',
    email: '',
    sdt: '',
    position: '',
  });

  useEffect(() => {
    dispatch(setInterns(interns));
  }, [dispatch, interns]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern');
        if (response.ok) {
          const data = await response.json();
          dispatch(setInterns(data));
          setOriginalInterns(data);
          setFilteredInterns(data);
        } else {
          console.error('Failed to fetch data from the API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddIntern = async (values) => {
    try {
      const existingIntern = originalInterns.find(intern => intern.email === values.email || intern.sdt === values.sdt);

      if (existingIntern) {
        setError('Email hoặc Số điện thoại đã tồn tại.');
        setSuccess('');
        return;
      }

      const response = await axios.post('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern', values);

      if (response.status === 201) {
        const newData = await axios.get('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern');
        dispatch(addIntern(newData.data));
        setOriginalInterns(newData.data);
        setFilteredInterns(newData.data);
        setError('');
        setSuccess('Intern đã được thêm thành công!');
      } else {
        setError('Failed to add intern.');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error adding intern:', error);
    }
  };

  const handleEditIntern = (record) => {
    setNewExpert({
      name: record.name,
      email: record.email,
      sdt: record.sdt,
      position: record.position,
    });
    setEditedInternId(record.id);
    setEditModalVisible(true);
  };

  const handleDeleteIntern = async (id) => {
    try {
      const response = await axios.delete(`https://653b7ef32e42fd0d54d534ff.mockapi.io/intern/${id}`);

      if (response.status === 200) {
        const newData = await axios.get('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern');
        dispatch(deleteIntern(id));
        setOriginalInterns(newData.data);
        setFilteredInterns(newData.data);
      } else {
        console.error('Failed to delete intern.');
      }
    } catch (error) {
      console.error('Error deleting intern:', error);
    }
  };

  const handleEditModalOk = async () => {
    try {
      const values = form.getFieldsValue();

      const existingIntern = originalInterns.find(intern => (
        (intern.email === values.email || intern.sdt === values.sdt) && intern.id !== editedInternId
      ));

      if (existingIntern) {
        setError('Email hoặc Số điện thoại đã tồn tại.');
        setSuccess('');
        return;
      }

      const response = await axios.put(`https://653b7ef32e42fd0d54d534ff.mockapi.io/intern/${editedInternId}`, values);

      if (response.status === 200) {
        const newData = await axios.get('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern');
        dispatch(updateIntern(newData.data));
        setOriginalInterns(newData.data);
        setFilteredInterns(newData.data);
        setEditModalVisible(false);
        setEditedInternId(null);
        form.resetFields();
        setError('');
        setSuccess('Intern đã được cập nhật thành công!');
      } else {
        setError('Failed to update intern.');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error updating intern:', error);
    }
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setEditedInternId(null);
    form.resetFields();
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpert({
      ...newExpert,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const filteredData = originalInterns.filter((intern) => {
      return Object.entries(searchValues).every(([key, value]) => {
        const internValue = intern[key] ? intern[key].toLowerCase() : '';
        return value ? internValue.includes(value.toLowerCase()) : true;
      });
    });

    setFilteredInterns(filteredData);
  };

  const handleClearSearch = () => {
    setSearchValues({
      name: '',
      email: '',
      sdt: '',
      position: '',
    });
    form.resetFields();
    setFilteredInterns(originalInterns);
  };

  const handleCloseError = () => {
    setError('');
  };

  const handleCloseSuccess = () => {
    setSuccess('');
  };

  const columns = [
    { title: 'Họ tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'sdt', key: 'sdt' },
    { title: 'Vị trí thực tập', dataIndex: 'position', key: 'position' },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button type="link" onClick={() => handleEditIntern(record)}>
            Chỉnh sửa
          </Button>
          <span> | </span>
          <Button type="link" onClick={() => handleDeleteIntern(record.id)}>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Form
        form={form}
        onFinish={handleAddIntern}
        layout="vertical"
        style={{ marginBottom: '16px' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Họ tên" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Số điện thoại" name="sdt">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Vị trí thực tập" name="position">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm Intern
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={handleSearch}
              >
                Tìm kiếm
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={handleClearSearch}
              >
                Clear
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {error && (
          <Row>
            <Col span={24}>
              <p style={{ color: 'red' }}>{error} <Button type="link" onClick={handleCloseError}>Đóng</Button></p>
            </Col>
          </Row>
        )}
        {success && (
          <Row>
            <Col span={24}>
              <p style={{ color: 'green' }}>{success} <Button type="link" onClick={handleCloseSuccess}>Đóng</Button></p>
            </Col>
          </Row>
        )}
      </Form>
      <Table dataSource={interns} columns={columns} />
      <Modal
        title="Chỉnh sửa Intern"
        visible={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form
          form={form}
          onFinish={handleEditModalOk}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Họ tên" name="name" initialValue={newExpert.name}>
                <Input onChange={handleInputChange} name="name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="email" initialValue={newExpert.email}>
                <Input onChange={handleInputChange} name="email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="sdt" initialValue={newExpert.sdt}>
                <Input onChange={handleInputChange} name="sdt" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Vị trí thực tập" name="position" initialValue={newExpert.position}>
                <Input onChange={handleInputChange} name="position" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>  
    </div>
  );
};

export default InternManagement;
