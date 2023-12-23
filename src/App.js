// src/App.js
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import ManageInterns from './Component/ManageInterns';
import Exercise from './Component/Exercise';
const { Sider, Content } = Layout;

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleMenuClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={['home']} selectedKeys={[currentPage]}>
          <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => handleMenuClick('home')}>
            Home
          </Menu.Item>
          <Menu.Item key="user" icon={<UserOutlined />} onClick={() => handleMenuClick('user')}>
            User
          </Menu.Item>
          <Menu.Item key="setting" icon={<SettingOutlined />} onClick={() => handleMenuClick('setting')}>
            Setting
          </Menu.Item>
          <Menu.Item key="intern" icon={<UsergroupAddOutlined />} onClick={() => handleMenuClick('intern')}>
            Quản lý Intern
          </Menu.Item>
          <Menu.Item key="assignment" icon={<FileTextOutlined />} onClick={() => handleMenuClick('assignment')}>
            Quản lý Bài tập
          </Menu.Item>
          <Menu.Item key="schedule" icon={<ScheduleOutlined />} onClick={() => handleMenuClick('schedule')}>
            Thời gian thực tập
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {currentPage === 'intern' && <ManageInterns />}
            {currentPage === 'assignment' && <Exercise />}
            {currentPage !== 'intern' && currentPage !== 'assignment' && (
              <>
                <h1>Trang {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}</h1>
                <p>Xin chào! Đây là trang {currentPage} của bạn.</p>
              </>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
