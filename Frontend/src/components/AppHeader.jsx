import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'
import { Layout, Typography, Space, Button, message } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
    const { session, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            message.success('Logged out successfully.');
            navigate('/');
        } catch (error) {
            message.error('Failed to log out.');
        }
    };

    return (
        <Header
            style={{
                background: 'transparent',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 32px',
                height: 72,
                zIndex: 10,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Title level={4} style={{ margin: 0, color: '#333', letterSpacing: 0.5, fontWeight: 700, fontSize: '1.8rem', fontFamily: "'Poppins', sans-serif" }}>
                        ZapLink
                    </Title>
                </Link>
            </div>

            <Space size="large">
                <Link to="/docs" style={{ margin: 0, color: '#333', fontWeight: 200, fontSize: '1rem', fontFamily: "'Poppins', sans-serif" }}>Docs</Link>
                <Link to="/about" style={{ margin: 0, color: '#333', fontWeight: 200, fontSize: '1rem', fontFamily: "'Poppins', sans-serif" }}>About</Link>

                {session ? (
                    <>
                        {/* We'll add a dashboard link later */}
                        {/* <Button type="default" onClick={() => navigate('/dashboard')}>Dashboard</Button> */}
                        <Button type="primary" danger onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button type="default" onClick={() => navigate('/login')}>Login</Button>
                        <Button type="primary" onClick={() => navigate('/signup')}>Sign Up</Button>
                    </>
                )}
            </Space>
        </Header>
    );
};

export default AppHeader;