import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { Layout, Typography, Space, Button, message, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
    const { session, signOut } = useAuth();
    const navigate = useNavigate();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut();
            message.success('Logged out successfully.');
            navigate('/');
        } catch (error) {
            message.error('Failed to log out.');
        }
    };

    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    const navLinks = (isMobile = false) => (
        <Space direction={isMobile ? 'vertical' : 'horizontal'} size="large" align={isMobile ? 'start' : 'center'} className={isMobile ? 'w-full' : ''}>
            <Link to="/docs" style={{
                color: '#555',
                fontWeight: 500,
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'color 0.3s ease',
            }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                }} onClick={closeDrawer}>Docs</Link>
            <Link to="/about"
                style={{
                    minHeight: '100vh',
                    background: 'transparent',
                    fontFamily: "'Inter', sans-serif",
                    color: '#555',
                    fontWeight: 500,
                    textDecoration: 'none',
                    fontSize: '1rem',
                    transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                }} onClick={closeDrawer}>About</Link>

            {session ? (
                <Button
                    type="primary"
                    danger
                    onClick={() => { handleLogout(); closeDrawer(); }}
                    className={isMobile ? 'w-full' : ''}
                    style={{
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.15)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Logout
                </Button>
            ) : (
                <Space direction={isMobile ? 'vertical' : 'horizontal'} className={isMobile ? 'w-full' : ''}>
                    <Button
                        type="text"
                        size="large"
                        style={{
                            background: 'transparent',
                            fontFamily: "'Inter', sans-serif",
                            color: '#555',
                            fontWeight: 500,
                            fontSize: '1rem',
                            border: 'none',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                        }}
                        onClick={() => { navigate('/login'); closeDrawer(); }}
                    >
                        Login
                    </Button>
                    <Button
                        type="text"
                        size="large"
                        style={{
                            background: 'transparent',
                            fontFamily: "'Inter', sans-serif",
                            color: '#555',
                            fontWeight: 500,
                            fontSize: '1rem',
                            border: 'none',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                        }}
                        onClick={() => { navigate('/signup'); closeDrawer(); }}
                    >
                        Sign Up
                    </Button>
                </Space>
            )}

        </Space>
    );

    return (
        <Header
            style={{
                background: 'transparent',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 24px',
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

            {/* Desktop Menu */}
            <div className="hidden md:block">
                {navLinks(false)}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <Button type="text" icon={<MenuOutlined style={{ fontSize: '20px', color: '#333 ' }} />} onClick={showDrawer} />
            </div>

            {/* Mobile Drawer */}
            {/* Mobile Drawer */}
            <Drawer
                title={null}
                placement="top"
                closable={false}
                onClose={closeDrawer}
                open={drawerVisible}
                height="100%"
                bodyStyle={{
                    backgroundColor: '#fff',
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'center',  // Vertical center
                    alignItems: 'center',      // Horizontal center
                    height: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2rem',
                    }}
                >
                    {navLinks(true)}
                </div>

                {/* Custom Close Button */}
                <Button
                    type="text"
                    onClick={closeDrawer}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        fontSize: '1.8rem',
                        color: '#333',
                    }}
                >
                    ✕
                </Button>
            </Drawer>

        </Header>
    );
};

export default AppHeader;
