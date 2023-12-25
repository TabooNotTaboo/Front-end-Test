// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Card } from 'antd';

const Login = ({ internData, setAuthenticated, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const isAdmin = email === 'admin@gmail.com' && phone === '0964810760';
    const isUser = checkUserCredentials(email, phone);

    if (isAdmin) {
      setAuthenticated(true);
      setIsAdmin(true);
      navigate('/');
    } else if (isUser) {
      setAuthenticated(true);
      setIsAdmin(false);
      navigate('/');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const checkUserCredentials = (inputEmail, inputPhone) => {
    // Extract user data from internData array
    const userData = internData.filter((user) => user.email === inputEmail && user.sdt === inputPhone);

    return userData.length > 0;
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: 'linear-gradient(13deg, rgba(173,34,195,1) 0%, rgba(45,58,253,1) 100%)' }}>
      <Col span={8}>
        <Card title="Login" style={{ textAlign: 'center' }}>
          <Form>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
              <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleLogin}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
