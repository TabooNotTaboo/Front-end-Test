import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Login from './Component/Login';
import ManageInterns from './Component/ManageInterns';
import Exercise from './Component/Exercise';
import Period from './Component/Period';
import Home from './Component/Home';
import { HomeOutlined, UserOutlined, SettingOutlined, UsergroupAddOutlined, FileTextOutlined, ScheduleOutlined, LogoutOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

const App = () => {
  const [authenticated, setAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('authenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    return storedIsAdmin ? JSON.parse(storedIsAdmin) : false;
  });
  const [internData, setInternData] = useState([]);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('authenticated');
    const storedIsAdmin = localStorage.getItem('isAdmin');

    setAuthenticated(storedAuth ? JSON.parse(storedAuth) : false);
    setIsAdmin(storedIsAdmin ? JSON.parse(storedIsAdmin) : false);

    fetch('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern')
      .then((response) => response.json())
      .then((data) => setInternData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    setHistory(history);
  }, [history]);

  const PrivateRoute = ({ element, isAdminRequired }) => {
    if (isAdminRequired && !isAdmin) {
      return <Navigate to="/login" />;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return element;
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('isAdmin');

    setAuthenticated(false);
    setIsAdmin(false);

    setHistory('/login');
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        {authenticated ? (
          <>
            <Sider width={200} theme="dark">
              <Menu theme="dark" mode="vertical" defaultSelectedKeys={['home']}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="user" icon={<UserOutlined />}>
                  <Link to="/user">User</Link>
                </Menu.Item>
                <Menu.Item key="setting" icon={<SettingOutlined />}>
                  <Link to="/setting">Setting</Link>
                </Menu.Item>
                <Menu.Item key="intern" icon={<UsergroupAddOutlined />}>
                  <Link to="/intern">Quản lý Intern</Link>
                </Menu.Item>
                <Menu.Item key="assignment" icon={<FileTextOutlined />}>
                  <Link to="/assignment">Quản lý Bài tập</Link>
                </Menu.Item>
                <Menu.Item key="schedule" icon={<ScheduleOutlined />}>
                  <Link to="/schedule">Thời gian thực tập</Link>
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ margin: '16px' }}>
                <Routes>
                  <Route path="/login" element={<Login internData={internData} setAuthenticated={setAuthenticated} setIsAdmin={setIsAdmin} />} />
                  <Route path="/intern" element={<PrivateRoute element={<ManageInterns />} isAdminRequired={true} />} />
                  <Route path="/assignment" element={<PrivateRoute element={<Exercise />} isAdminRequired={true} />} />
                  <Route path="/schedule" element={<PrivateRoute element={<Period />} isAdminRequired={true} />} />
                  <Route path="/" element={<PrivateRoute element={<Home />} isAdminRequired={false} />} />
                </Routes>
              </Content>
            </Layout>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login internData={internData} setAuthenticated={setAuthenticated} setIsAdmin={setIsAdmin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Layout>
    </Router>
  );
};

export default App;
