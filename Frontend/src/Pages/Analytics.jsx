import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { supabase } from '../Auth/SupabaseClient';
import { Card, Row, Col, Statistic, Typography, Spin, Button, message, Select } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeftOutlined, CopyOutlined, GlobalOutlined, RiseOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const AnalyticsPage = () => {
    const { shortCode } = useParams();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!user || !shortCode) return;
            setLoading(true);

            console.log(`Fetching analytics for ${shortCode}`);

            // Simulating API call with mock data
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
            }, 1500);
        };

        fetchAnalytics();
    }, [user, shortCode]);

    const handleCopy = () => {
        navigator.clipboard.writeText(analytics.short_url);
        message.success('Short URL copied!');
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Spin size="large" /></div>;
    }

    if (!analytics) {
        return <div>No data available.</div>;
    }

    return (
        <div className="p-4 md:p-8">
            <Link to="/dashboard" className="mb-4 inline-block">
                <Button icon={<ArrowLeftOutlined />}>Back to Dashboard</Button>
            </Link>

            <Card className="mb-6">
                <Title level={3}>{analytics.short_url}</Title>
                <Paragraph ellipsis={{ rows: 1, expandable: true }}>
                    Redirects to: <a href={analytics.original_url} target="_blank" rel="noopener noreferrer">{analytics.original_url}</a>
                </Paragraph>
                <Button icon={<CopyOutlined />} onClick={handleCopy}>Copy Link</Button>
            </Card>

            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={8}>
                    <Card><Statistic title="Total Clicks" value={analytics.totalClicks} prefix={<RiseOutlined />} /></Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card><Statistic title="Top Referrer" value={analytics.topReferrer} prefix={<GlobalOutlined />} /></Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card><Statistic title="Top Country" value={analytics.topCountry} /></Card>
                </Col>
            </Row>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <Title level={4}>Clicks Over Time</Title>
                    <Select defaultValue="7d">
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
                        <Bar dataKey="clicks" fill="#0083b0" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default AnalyticsPage;
