import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { Card, Row, Col, Statistic, Typography, Spin, Button, message, Select } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeftOutlined, CopyOutlined, GlobalOutlined, RiseOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const AnalyticsPage = () => {
    const { shortCode } = useParams();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user || !shortCode) return;
        setLoading(true);

        setTimeout(() => {
            const mockData = {
                original_url: 'https://www.theverge.com/2024/08/08/us-china-geneva-ai-talks-a-very-long-url-to-demonstrate-truncation',
                short_url: `zap.link/${shortCode}`,
                totalClicks: 1234,
                topReferrer: 'google.com',
                topCountry: 'India',
                clicksByDay: [
                    { date: 'Aug 2', clicks: 98 },
                    { date: 'Aug 3', clicks: 150 },
                    { date: 'Aug 4', clicks: 210 },
                    { date: 'Aug 5', clicks: 180 },
                    { date: 'Aug 6', clicks: 250 },
                    { date: 'Aug 7', clicks: 220 },
                    { date: 'Aug 8', clicks: 226 },
                ],
            };
            setAnalytics(mockData);
            setLoading(false);
        }, 1000);
    }, [user, shortCode]);

    const handleCopy = () => {
        navigator.clipboard.writeText(analytics.short_url);
        message.success('Short URL copied!');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (!analytics) return <div>No data available.</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ padding: '40px 60px', background: 'transparent', minHeight: '100vh' }}
        >
            <motion.div whileTap={{ scale: 0.97 }}>
                <Link to="/dashboard">
                    <Button
                        icon={<ArrowLeftOutlined />}
                        style={{
                            borderRadius: '8px',
                            marginBottom: '24px',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.05)'
                        }}
                    >
                        Back to Dashboard
                    </Button>
                </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
                <Card
                    style={{
                        borderRadius: '14px',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        marginBottom: '24px'
                    }}
                    bodyStyle={{ padding: '24px' }}
                >
                    <Title level={3} style={{ marginBottom: '8px' }}>
                        {analytics.short_url}
                    </Title>
                    <Paragraph ellipsis={{ rows: 1, expandable: true }} style={{ marginBottom: '16px' }}>
                        Redirects to:{' '}
                        <a href={analytics.original_url} target="_blank" rel="noopener noreferrer">
                            {analytics.original_url}
                        </a>
                    </Paragraph>
                    <motion.div >
                        <Button
                            icon={<CopyOutlined />}
                            onClick={handleCopy}
                            style={{
                                borderRadius: '8px',
                                background: 'linear-gradient(270deg, #22c55e, #3b82f6, #22c55e)',
                                backgroundSize: '200% 200%',
                                animation: 'gradientMove 3s ease infinite',
                                color: 'white',
                                border: 'none'
                            }}
                        >
                            Copy Link
                        </Button>
                    </motion.div>
                </Card>
            </motion.div>

            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                {[
                    { title: "Total Clicks", value: analytics.totalClicks, prefix: <RiseOutlined /> },
                    { title: "Top Referrer", value: analytics.topReferrer, prefix: <GlobalOutlined /> },
                    { title: "Top Country", value: analytics.topCountry }
                ].map((stat, i) => (
                    <Col xs={24} sm={8} key={stat.title}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                        >
                            <Card
                                style={{
                                    borderRadius: '14px',
                                    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                                    border: '1px solid rgba(0,0,0,0.06)'
                                }}
                            >
                                <Statistic title={stat.title} value={stat.value} prefix={stat.prefix} />
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
                <Card
                    style={{
                        borderRadius: '14px',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(0,0,0,0.06)'
                    }}
                    bodyStyle={{ padding: '24px' }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px',
                            flexWrap: 'wrap',
                            gap: '12px'
                        }}
                    >
                        <Title level={4} style={{ margin: 0 }}>Clicks Over Time</Title>
                        <Select defaultValue="7d" style={{ minWidth: '150px' }}>
                            <Option value="7d">Last 7 Days</Option>
                            <Option value="30d">Last 30 Days</Option>
                            <Option value="all">All Time</Option>
                        </Select>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analytics.clicksByDay}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="clicks" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </motion.div>

            <style>
                {`
                @media (max-width: 768px) {
                    .ant-statistic-title, .ant-statistic-content {
                        text-align: center;
                    }
                }
                `}
            </style>
        </motion.div>
    );
};

export default AnalyticsPage;
