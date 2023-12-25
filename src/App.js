// App.js
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Login from './Component/Login';
import ManageInterns from './Component/ManageInterns';
import Exercise from './Component/Exercise';
import Period from './Component/Period';
import Home from './Component/Home';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';

const { Sider, Content } = Layout;

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Track admin status
  const [internData, setInternData] = useState([]);

  useEffect(() => {
    fetch('https://653b7ef32e42fd0d54d534ff.mockapi.io/intern')
      .then((response) => response.json())
      .then((data) => setInternData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const PrivateRoute = ({ element, isAdminRequired }) => {
    if (isAdminRequired && !isAdmin) {
      // Redirect to login if admin is required but the user is not an admin
      return <Navigate to="/login" />;
    }

    if (!authenticated) {
      // Redirect to login if not authenticated
      return <Navigate to="/login" />;
    }

    // Render the route component
    return element;
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
              </Menu>
            </Sider>
            <Layout>
              <Content style={{ margin: '16px' }}>
                <Routes>
                  <Route path="/login" element={<Login internData={internData} setAuthenticated={setAuthenticated} setIsAdmin={setIsAdmin} />} />
                  <Route
                    path="/intern"
                    element={<PrivateRoute element={<ManageInterns />} isAdminRequired={true} />}
                  />
                  <Route
                    path="/assignment"
                    element={<PrivateRoute element={<Exercise />} isAdminRequired={true} />}
                  />
                  <Route
                    path="/schedule"
                    element={<PrivateRoute element={<Period />} isAdminRequired={true} />}
                  />
                  <Route path="/" element={<PrivateRoute element={<Home />} isAdminRequired={false} />} />
                </Routes>
              </Content>
            </Layout>
          </>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<Login internData={internData} setAuthenticated={setAuthenticated} setIsAdmin={setIsAdmin} />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Layout>
    </Router>
  );
};

export default App;
