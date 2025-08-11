import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Auth/AuthContext';
import { Layout, Typography, Space, Button, message, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const navItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
};

const underlineVariants = {
    rest: { scaleX: 0, originX: 0.5 },
    hover: { scaleX: 1, originX: 0.5, transition: { duration: 0.3, ease: 'easeOut' } }
};

const MotionDesktopLink = ({ to, children, onClick }) => (
    <motion.div
        className="relative"
        whileHover="hover"
        initial="rest"
        animate="rest"
    >
        <Link to={to} className="nav-link desktop-nav-link" onClick={onClick}>
            {children}
        </Link>
        <motion.div
            className="absolute bottom-0 left-0 w-full h-[2px] gradient-underline"
            variants={underlineVariants}
        />
    </motion.div>
);


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

    const showDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);

    const navLinks = (isMobile = false) => (
        <motion.div
            variants={isMobile ? navContainerVariants : undefined}
            initial={isMobile ? "hidden" : undefined}
            animate={isMobile ? "visible" : undefined}
            className={isMobile ? 'w-full' : ''}
        >
            <Space direction={isMobile ? 'vertical' : 'horizontal'} size="large" align="center" className={isMobile ? 'w-full' : ''}>
                {isMobile ? (
                    <>
                        <motion.div variants={navItemVariants}><Link to="/docs" className="nav-link mobile-nav-link" onClick={closeDrawer}>Docs</Link></motion.div>
                        <motion.div variants={navItemVariants}><Link to="/about" className="nav-link mobile-nav-link" onClick={closeDrawer}>About</Link></motion.div>
                    </>
                ) : (
                    <>
                        <MotionDesktopLink to="/docs" onClick={closeDrawer}>Docs</MotionDesktopLink>
                        <MotionDesktopLink to="/about" onClick={closeDrawer}>About</MotionDesktopLink>
                    </>
                )}

                {session ? (
                    <motion.div variants={isMobile ? navItemVariants : undefined} className="flex items-center">
                        <Space direction={isMobile ? 'vertical' : 'horizontal'} size="large" className={isMobile ? 'w-full' : ''} align="center">
                            {isMobile ? (
                                <Link to="/dashboard" className="nav-link mobile-nav-link" onClick={closeDrawer}>Dashboard</Link>
                            ) : (
                                <MotionDesktopLink to="/dashboard" onClick={closeDrawer}>Dashboard</MotionDesktopLink>
                            )}
                            <Button type="primary" danger onClick={() => { handleLogout(); closeDrawer(); }} className={isMobile ? 'w-full' : ''}>Logout</Button>
                        </Space>
                    </motion.div>
                ) : (
                    <motion.div variants={isMobile ? navItemVariants : undefined} className={isMobile ? 'w-full' : ''}>
                        <Space direction={isMobile ? 'vertical' : 'horizontal'} size="large" className={isMobile ? 'w-full' : ''} align="center">
                            <Button type="text" size="large" className="nav-button" onClick={() => { navigate('/login'); closeDrawer(); }}>Login</Button>
                            <Button type="text" size="large" className="nav-button signup-button" onClick={() => { navigate('/signup'); closeDrawer(); }}>Sign Up</Button>
                        </Space>
                    </motion.div>
                )}
            </Space>
        </motion.div>
    );

    return (
        <>
            <motion.div
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
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

                    <div className="hidden md:block">
                        {navLinks(false)}
                    </div>

                    <div className="md:hidden">
                        <Button type="text" icon={<MenuOutlined style={{ fontSize: '20px', color: '#333 ' }} />} onClick={showDrawer} />
                    </div>
                </Header>
            </motion.div>

            <Drawer
                title={null}
                placement="top"
                closable={false}
                onClose={closeDrawer}
                open={drawerVisible}
                height="100%"
                styles={{ body: { backgroundColor: '#fff', padding: '5rem 2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' } }}
            >
                <AnimatePresence>
                    {drawerVisible && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            {navLinks(true)}
                        </div>
                    )}
                </AnimatePresence>
                <Button type="text" onClick={closeDrawer} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', fontSize: '2.5rem', color: '#333', cursor: 'pointer' }}>✕</Button>
            </Drawer>

            <style>
                {`
                    /* --- Keyframe for the gradient animation --- */
                    @keyframes gradient-flow {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    /* --- General Nav Link Styles --- */
                    .nav-link, .nav-button {
                        text-decoration: none;
                        color: #555 !important;
                        font-weight: 500;
                        transition: color 0.3s ease;
                        background: transparent !important;
                        border: none !important;
                        font-family: 'Inter', sans-serif;
                    }

                    /* --- Desktop Nav Link Hover --- */
                    .desktop-nav-link {
                        position: relative;
                        padding: 5px 0;
                        font-size: 1rem;
                    }

                    /* The gradient underline for the animated links */
                    .gradient-underline {
                        background: linear-gradient(to right, #4ade80, #3b82f6, #4ade80);
                        background-size: 200% 200%;
                        animation: gradient-flow 3s ease infinite;
                    }
                    
                    /* Applying the gradient text color on hover */
                    .desktop-nav-link:hover {
                        background: linear-gradient(to right, #4ade80, #3b82f6, #4ade80);
                        background-size: 200% 200%;
                        -webkit-background-clip: text;
                        color: #3b82f6 !important;
                        background-clip: text;  
                        animation: gradient-flow 3s ease infinite;
                    }

                    /* Specific styling for login/signup buttons */
                    .nav-button:hover {
                        color: #3b82f6 !important;
                    }
                    .signup-button {
                        margin-left: -8px; /* Fixes the alignment issue */
                    }

                    /* --- Mobile Drawer Styles --- */
                    .ant-drawer-body .ant-space-item { width: 100%; text-align: center; padding-bottom: 1.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid #e8e8e8; }
                    .ant-drawer-body .ant-space-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
                    .ant-drawer-body .mobile-nav-link { font-size: 2.5rem !important; font-weight: 600; }
                    .ant-drawer-body .ant-btn { font-size: 2.5rem; height: auto; padding: 0.5rem 1rem; font-weight: 600; border-radius: 8px; }
                    .ant-drawer-body .ant-btn-primary.ant-btn-dangerous { background-color: #ff4d4f; border-color: #ff4d4f; }
                `}
            </style>
        </>
    );
};

export default AppHeader;
