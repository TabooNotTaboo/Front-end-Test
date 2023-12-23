import React from 'react';
import { Form, Input, DatePicker, Button, Row, Col } from 'antd';

const Exercise = () => {
  const [form] = Form.useForm();

  const handleSearch = (values) => {
    console.log('Search values:', values);
  };

  return (
    <Form
      form={form}
      onFinish={handleSearch}
      layout="vertical"
      style={{ marginBottom: '16px' }}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Bài tập" name="exercise">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Thời hạn bắt đầu" name="startDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Thời gian kết thúc" name="endDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm bài tập
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Exercise;
