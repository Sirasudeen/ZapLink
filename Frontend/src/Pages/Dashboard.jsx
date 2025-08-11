import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { supabase } from '../Auth/SupabaseClient';
import {
    List,
    Card,
    Button,
    Typography,
    Spin,
    Empty,
    Statistic,
    message,
    Divider
} from 'antd';
import {
    PlusOutlined,
    CopyOutlined,
    BarChartOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;

const DashboardPage = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { session } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLinks = async () => {
            if (!session) {
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const token = session.access_token;

                const res = await fetch(`${import.meta.env.VITE_URL_GEN_SERVICE}/api/links`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch links. Please try again.');
                }

                const data = await res.json();
                setLinks(data);

            } catch (error) {
                console.error("Fetch links error:", error);
                message.error(error.message || 'An error occurred while fetching your links.');
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, [session]);

    const handleCopy = (shortCode) => {
        const shortUrl = `${window.location.protocol}//${window.location.host}/${shortCode}`;
        navigator.clipboard.writeText(shortUrl);
        message.success('Short URL copied to clipboard!');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 72px)' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <motion.div
            style={{ padding: '40px 60px', background: 'transparent', minHeight: '100vh' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

            <motion.div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '40px',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}
                className="header-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <Title
                        level={2}
                        style={{ marginBottom: 4 }}
                        className="header-title"
                    >
                        My Links
                    </Title>
                    <Text type="secondary" className="header-subtitle">
                        Manage your shortened links and track analytics
                    </Text>
                </div>
                <Button
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/')}
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                        background: 'linear-gradient(270deg, #22c55e, #3b82f6, #22c55e)',
                        backgroundSize: '200% 200%',
                        animation: 'gradientMove 3s ease infinite',
                        border: 'none',
                        color: 'white',
                        fontWeight: '500',
                        minWidth: '180px'
                    }}
                    className="header-btn"
                >
                    Create New Link
                </Button>
            </motion.div>

            <style>
                {`
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @media (max-width: 768px) {
                    .header-container {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }
                    .header-title,
                    .header-subtitle {
                        text-align: center;
                    }
                    .header-btn {
                        margin-top: 12px;
                        align-self: center;
                    }
                }
                `}
            </style>

            {links.length > 0 ? (
                <List
                    grid={{ gutter: 32, xs: 1, sm: 1, md: 2, lg: 3 }}
                    dataSource={links}
                    renderItem={(link, index) => (
                        <List.Item>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                <Card
                                    hoverable
                                    style={{
                                        borderRadius: '14px',
                                        boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                                        border: '1px solid rgba(0,0,0,0.06)',
                                        transition: 'all 0.25s ease',
                                        minHeight: '220px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between'
                                    }}
                                    bodyStyle={{
                                        padding: '22px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '18px',
                                        height: '100%'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Paragraph
                                            style={{
                                                fontWeight: 500,
                                                fontSize: 15,
                                                margin: 0,
                                                wordBreak: 'break-all',
                                                whiteSpace: 'normal'
                                            }}
                                        >
                                            {link.original_url}
                                        </Paragraph>
                                        <Button
                                            type="text"
                                            icon={<CopyOutlined />}
                                            onClick={() => handleCopy(link.short_code)}
                                        />
                                    </div>

                                    <div
                                        className="px-3 py-1 rounded-md text-white font-medium self-start"
                                        style={{
                                            background: 'linear-gradient(270deg, #22c55e, #3b82f6, #22c55e)',
                                            backgroundSize: '200% 200%',
                                            animation: 'gradientMove 3s ease infinite'
                                        }}
                                    >
                                        <a
                                            href={`/${link.short_code}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: 'white', textDecoration: 'none' }}
                                        >
                                            {`zap.link/${link.short_code}`}
                                        </a>
                                    </div>

                                    <Divider style={{ margin: '12px 0' }} />

                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Statistic
                                            title="Total Clicks"
                                            value={link.click_count}
                                            valueStyle={{ fontWeight: 'bold', fontSize: '20px' }}
                                        />
                                        <Button
                                            icon={<BarChartOutlined />}
                                            onClick={() => navigate(`/analytics/${link.short_code}`)}
                                        >
                                            Analytics
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        </List.Item>
                    )}
                />
            ) : (
                <Empty
                    description={
                        <span>
                            You haven’t created any links yet. <br />
                            Start shortening and tracking now!
                        </span>
                    }
                />
            )}
        </motion.div>
    );
};

export default DashboardPage;
