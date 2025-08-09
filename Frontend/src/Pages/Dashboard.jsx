import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { supabase } from '../Auth/SupabaseClient';
import { List, Card, Button, Typography, Tag, Spin, Empty, Statistic } from 'antd';
import { PlusOutlined, LinkOutlined, CopyOutlined, BarChartOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const DashboardPage = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLinks = async () => {
            if (!user) return;
            setLoading(true);

            console.log("Fetching links for user:", user.id);

            // Simulating an API call with mock data for now
            setTimeout(() => {
                const mockData = [
                    { id: 1, original_url: 'https://www.theverge.com/2024/08/08/us-china-geneva-ai-talks', short_code: 'abc123', click_count: 1234, created_at: '2025-08-08T12:00:00Z' },
                    { id: 2, original_url: 'https://www.siras.dev/portfolio-item-2', short_code: 'xyz789', click_count: 56, created_at: '2025-08-07T10:30:00Z' },
                    { id: 3, original_url: 'https://github.com/sirasudeen', short_code: 'qwe456', click_count: 872, created_at: '2025-08-06T18:45:00Z' },
                ];
                setLinks(mockData);
                setLoading(false);
            }, 1500);
        };

        fetchLinks();
    }, [user]);

    const handleCopy = (shortCode) => {
        const shortUrl = `${window.location.origin}/${shortCode}`;
        navigator.clipboard.writeText(shortUrl);
        message.success('Short URL copied!');
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;
    }

    return (
        <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <Title level={2}>My Links</Title>
                <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => navigate('/')}>
                    Create New Link
                </Button>
            </div>

            {links.length > 0 ? (
                <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3 }}
                    dataSource={links}
                    renderItem={link => (
                        <List.Item>
                            <Card hoverable>
                                <Paragraph ellipsis={{ rows: 1, expandable: true }} className="font-semibold text-base">
                                    {link.original_url}
                                </Paragraph>
                                <div className="flex items-center justify-between my-4">
                                    <Tag color="blue" icon={<LinkOutlined />} className="text-lg">
                                        <a href={`/${link.short_code}`} target="_blank" rel="noopener noreferrer">
                                            {`zap.link/${link.short_code}`}
                                        </a>
                                    </Tag>
                                    <Button icon={<CopyOutlined />} onClick={() => handleCopy(link.short_code)}>Copy</Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Statistic title="Total Clicks" value={link.click_count} />
                                    <Button type="default" onClick={() => navigate(`/analytics/${link.short_code}`)}>
                                        View Analytics
                                    </Button>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            ) : (
                <Empty description="You haven't created any links yet. Let's make one!" />
            )}
        </div>
    );
};

export default DashboardPage;
