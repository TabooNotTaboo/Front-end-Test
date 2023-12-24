import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Table, message } from 'antd';
import axios from 'axios';

const ExerciseForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'sdt',
      key: 'sdt',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
  ];

  const exerciseColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Exercise',
      dataIndex: 'exercise',
      key: 'exercise',
    },
    {
      title: 'Start Date',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'End Date',
      dataIndex: 'end',
      key: 'end',
    },
    {
      title: 'Intern ID',
      dataIndex: 'InternID',
      key: 'InternID',
      render: (InternID) => Array.isArray(InternID) ? InternID.join(', ') : InternID,
    },
  ];
  

  useEffect(() => {
    fetchInternData();
    fetchExerciseData();
  }, []);

  const fetchInternData = () => {
    axios.get('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching intern data:', error);
      });
  };

  const fetchExerciseData = () => {
    axios.get('https://653b7ef32e42fd0d54d534ff.mockapi.io/exercise')
      .then(response => {
        setExercises(response.data);
      })
      .catch(error => {
        console.error('Error fetching exercise data:', error);
      });
  };

  const onFinish = async (values) => {
    const selectedInterns = users.filter(user => selectedRowKeys.includes(user.id));

    if (selectedInterns.length === 0) {
      console.warn('Please select at least one intern.');
      return;
    }

    const newExercise = {
      exercise: values.exerciseName,
      start: values.startDate.format('YYYY-MM-DD'),
      end: values.endDate.format('YYYY-MM-DD'),
      InternID: selectedInterns.map(intern => intern.id),
    };

    try {
      const response = await axios.post('https://653b7ef32e42fd0d54d534ff.mockapi.io/exercise', newExercise);
      console.log('Exercise added successfully:', response.data);

      message.success('Bài tập đã được thêm thành công!');

      fetchExerciseData();
      form.resetFields();
      setSelectedRowKeys([]);
    } catch (error) {
      console.error('Error adding exercise:', error);
      message.error('Có lỗi xảy ra khi thêm bài tập. Vui lòng thử lại sau.');
    }
  };

  const handleRowSelect = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleClear = () => {
    form.resetFields();
    setSelectedRowKeys([]);
  };

  const handleSearch = async (value) => {
    try {
      const response = await axios.get(`https://653b7ef32e42fd0d54d534ff.mockapi.io/exercise?exercise=${value}`);
      setExercises(response.data);
    } catch (error) {
      console.error('Error searching exercises:', error);
      message.error('Có lỗi xảy ra khi tìm kiếm bài tập. Vui lòng thử lại sau.');
    }
  };

  return (
    <div>
      <Form name="exercise_form" form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Tên bài tập"
          name="exerciseName"
          rules={[{ required: true, message: 'Vui lòng nhập tên bài tập!' }]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Ngày bắt đầu"
              name="startDate"
              rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Ngày kết thúc"
              name="endDate"
              rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm bài tập
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleClear}>
            Clear
          </Button>
          <Input.Search
            style={{ width: 200, marginLeft: 8 }}
            placeholder="Tìm kiếm bài tập"
            onSearch={handleSearch}
          />
        </Form.Item>
      </Form>

      <Table
        dataSource={exercises}
        columns={exerciseColumns}
        rowKey="id"
      />
    </div>
  );
};

export default ExerciseForm;