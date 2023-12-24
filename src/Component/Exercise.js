import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, DatePicker, Row, Col, Table, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const ExerciseForm = ({ exercises, users, setExercises, setUsers }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedInternKeys, setSelectedInternKeys] = useState([]);
  const [form] = Form.useForm();
  const [editingExercise, setEditingExercise] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'sdt', key: 'sdt' },
    { title: 'Position', dataIndex: 'position', key: 'position' },
  ];

  const exerciseColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Exercise', dataIndex: 'exercise', key: 'exercise' },
    { title: 'Start Date', dataIndex: 'start', key: 'start' },
    { title: 'End Date', dataIndex: 'end', key: 'end' },
    {
      title: 'Intern ID',
      dataIndex: 'InternID',
      key: 'InternID',
      render: (InternID) => (Array.isArray(InternID) ? InternID.join(', ') : InternID),
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={() => handleEdit(record)}>Edit</a>
          <span style={{ margin: '0 8px' }}>|</span>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchInternData();
    fetchExerciseData();
  }, []);

  const fetchInternData = () => {
    axios
      .get('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching intern data:', error);
      });
  };

  const fetchExerciseData = () => {
    axios
      .get('https://653b7ef32e42fd0d54d534ff.mockapi.io/exercise')
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error('Error fetching exercise data:', error);
      });
  };

  const onFinish = async (values) => {
    const selectedInterns = users.filter((user) => selectedRowKeys.includes(user.id));

    if (selectedInterns.length === 0) {
      console.warn('Please select at least one intern.');
      return;
    }

    const newExercise = {
      exercise: values.exerciseName,
      start: values.startDate.format('YYYY-MM-DD'),
      end: values.endDate.format('YYYY-MM-DD'),
      InternID: selectedInterns.map((intern) => intern.id),
      status: values.status,
    };

    try {
      if (isEditing && editingExercise) {
        await axios.put(
          `https://653b7ef32e42fd0d54d534ff.mockapi.io/exercise/${editingExercise.id}`,
          newExercise
        );
        message.success('Exercise updated successfully!');
      } else {
        const response = await axios.post(
          'https://653b7ef32e42fd0d54d534ff.mockapi.io/exercise',
          newExercise
        );
        console.log('Exercise added successfully:', response.data);
        message.success('Exercise added successfully!');
      }

      fetchExerciseData();
      form.resetFields();
      setSelectedRowKeys([]);
      setSelectedInternKeys([]);
      setEditingExercise(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error handling exercise:', error);
      message.error('An error occurred while performing exercise operation. Please try again later.');
    }
  };

  const handleEdit = (record) => {
    setEditingExercise(record);
    form.setFieldsValue({
      exerciseName: record.exercise,
      startDate: moment(record.start),
      endDate: moment(record.end),
      status: record.status,
    });

    const internKeys = record.InternID.map((id) => String(id));
    setSelectedInternKeys(internKeys);

    setIsEditing(true);
  };

  const handleDelete = async (exerciseId) => {
    try {
      await axios.delete(`https://653b7ef32e42fd0d54d534ff.mockapi.io/exercise/${exerciseId}`);
      message.success('Exercise deleted successfully!');
      fetchExerciseData();
    } catch (error) {
      console.error('Error deleting exercise:', error);
      message.error('An error occurred while deleting exercise. Please try again later.');
    }
  };

  const handleRowSelect = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleClear = () => {
    form.resetFields();
    setSelectedRowKeys([]);
    setSelectedInternKeys([]);
    setEditingExercise(null);
    setIsEditing(false);
  };

  const handleSearch = async (value) => {
    try {
      const response = await axios.get(
        `https://653b7ef32e42fd0d54d534ff.mockapi.io/exercise?exercise=${value}`
      );
      setExercises(response.data);
    } catch (error) {
      console.error('Error searching exercises:', error);
      message.error('An error occurred while searching for exercises. Please try again later.');
    }
  };

  return (
    <div>
      <Form name="exercise_form" form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Exercise Name"
          name="exerciseName"
          rules={[{ required: true, message: 'Please enter exercise name!' }]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: 'Please select start date!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End Date"
              name="endDate"
              rules={[{ required: true, message: 'Please select end date!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select status!' }]}
        >
          <Input />
        </Form.Item>

        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: handleRowSelect,
            type: 'checkbox',
          }}
        />

        {isEditing && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        )}

        {!isEditing && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Exercise
            </Button>
          </Form.Item>
        )}

        <Button style={{ marginLeft: 8 }} onClick={handleClear}>
          Clear
        </Button>

        <Input.Search
          style={{ width: 200, marginLeft: 8 }}
          placeholder="Search exercises"
          onSearch={handleSearch}
        />
      </Form>

      <Table dataSource={exercises} columns={exerciseColumns} rowKey="id" />
    </div>
  );
};

const mapStateToProps = (state) => ({
  exercises: state.exercise.exercises,
  users: state.exercise.users,
});

const mapDispatchToProps = (dispatch) => ({
  setExercises: (exercises) => dispatch({ type: 'SET_EXERCISES', payload: exercises }),
  setUsers: (users) => dispatch({ type: 'SET_USERS', payload: users }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseForm);
