import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Input, Row, Col, Modal, message, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setInterns, updateIntern } from '../actions/internActions';
import axios from 'axios';
import moment from 'moment';

const InternManagement = () => {
  const dispatch = useDispatch();
  const allInterns = useSelector((state) => state.intern.interns);
  const [interns, setFilteredInterns] = useState(allInterns);
  const [originalInterns, setOriginalInterns] = useState(allInterns);
  const [editForm] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedInternId, setEditedInternId] = useState(null);
  const [newExpert, setNewExpert] = useState({
    startDate: '',
    endDate: '',
    status: '',
  });
  const [editMode, setEditMode] = useState(false);

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

  const handleEditIntern = (record) => {
    setEditModalVisible(true);
    setEditedInternId(record.id);
    setEditMode(true);

    setNewExpert({
      ...record,
      startDate: record.startDate,
      endDate: record.endDate,
      status: record.status,
    });
  };

  const handleEditModalOk = async () => {
    try {
      const values = editForm.getFieldsValue();

      const response = await axios.put(`https://653b7ef32e42fd0d54d534ff.mockapi.io/intern/${editedInternId}`, values);

      if (response.status === 200) {
        const newData = await axios.get('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern');
        dispatch(updateIntern(newData.data));
        setOriginalInterns(newData.data);
        setFilteredInterns(newData.data);
        setEditModalVisible(false);
        setEditedInternId(null);
        setEditMode(false);
        editForm.resetFields();
        message.success('Intern đã được cập nhật thành công!');
      } else {
        message.error('Failed to update intern.');
      }
    } catch (error) {
      console.error('Error updating intern:', error);
    }
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    setEditedInternId(null);
    setEditMode(false);

    editForm.setFieldsValue({
      startDate: newExpert.startDate,
      endDate: newExpert.endDate,
      status: newExpert.status,
    });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { 
      title: 'Ngày bắt đầu', 
      dataIndex: 'startDate', 
      key: 'startDate',
      render: (text, record) => moment(record.startDate).format('YYYY-MM-DD')
    },
    { 
      title: 'Ngày kết thúc', 
      dataIndex: 'endDate', 
      key: 'endDate',
      render: (text, record) => moment(record.endDate).format('YYYY-MM-DD')
    },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleEditIntern(record)}>
          Chỉnh sửa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={interns} columns={columns} />
      <Modal
        title="Chỉnh sửa Intern"
        visible={editModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        <Form
          form={editForm}
          onFinish={handleEditModalOk}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ngày bắt đầu" name="startDate" initialValue={moment(newExpert.startDate)} disabled={editMode}>
                <DatePicker
                  onChange={(date, dateString) => setNewExpert({ ...newExpert, startDate: dateString })}
                  style={{ width: '100%' }}
                  disabled={editMode}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày kết thúc" name="endDate" initialValue={moment(newExpert.endDate)} disabled={editMode}>
                <DatePicker
                  onChange={(date, dateString) => setNewExpert({ ...newExpert, endDate: dateString })}
                  style={{ width: '100%' }}
                  disabled={editMode}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Trạng thái" name="status" initialValue={newExpert.status}>
                <Input
                  onChange={(e) => setNewExpert({ ...newExpert, status: e.target.value })}
                  disabled={!editMode}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default InternManagement;
