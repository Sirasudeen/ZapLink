import React from 'react';
import { Layout, Typography, Space } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const Docs = () => {
    return (
        <Layout
            style={{
                minHeight: '100vh',
                background: 'transparent',
                fontFamily: "'Poppins', sans-serif"
            }}
        >
            <Header
                style={{
                    background: 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 32px',
                    height: 72
                }}
            >
                <Title
                    level={4}
                    style={{
                        margin: 0,
                        color: 'black',
                        fontWeight: 800,
                        fontSize: '1.6rem',
                        fontFamily: "'Poppins', sans-serif"
                    }}
                >
                    ZapLink Docs
                </Title>
                <Space size="large">
                    <a href="/" style={{ color: '#555', fontWeight: 500 }}>Home</a>
                </Space>
            </Header>

            <Content style={{ padding: '50px 20px', maxWidth: 900, margin: '0 auto' }}>
                <Title level={2} style={{ color: '#232946', marginBottom: 24 }}>
                    Documentation
                </Title>

                <div style={{
                    background: '#ffffff',
                    borderRadius: 16,
                    padding: '32px 28px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #eee',
                    marginBottom: 32
                }}>
                    <Title level={3} style={{ color: '#3b28cc', marginBottom: 16 }}>Introduction</Title>
                    <Paragraph style={{ fontSize: '1rem', lineHeight: 1.8 }}>
                        ZapLink is a simple and efficient URL shortening service that lets you convert long, bulky URLs into short, easy-to-share links.
                        This documentation covers the API endpoints and usage details for developers and users.
                    </Paragraph>
                </div>

                <div style={{
                    background: '#ffffff',
                    borderRadius: 16,
                    padding: '32px 28px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #eee',
                    marginBottom: 32
                }}>
                    <Title level={3} style={{ color: '#3b28cc', marginBottom: 16 }}>How It Works</Title>
                    <Paragraph style={{ fontSize: '1rem', lineHeight: 1.8 }}>
                        Enter your long URL into the form on the homepage. Our backend service encodes a unique short code for your URL using a Base62 encoder,
                        stores the mapping in PostgreSQL with caching via Redis, and returns a short URL.
                    </Paragraph>
                </div>

                <div style={{
                    background: '#ffffff',
                    borderRadius: 16,
                    padding: '32px 28px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #eee'
                }}>
                    <Title level={3} style={{ color: '#3b28cc', marginBottom: 16 }}>API Endpoints</Title>
                    <Paragraph>
                        <Text strong>POST</Text> <code>/api/shorten</code>
                        <br />
                        <Text type="secondary">Description:</Text> Shortens a given long URL.
                        <br />
                        <Text type="secondary">Body:</Text>
                        <pre style={{ background: '#f9f9f9', padding: '12px 16px', borderRadius: 8 }}>
                            {`{
  "longUrl": "https://example.com"
}`}
                        </pre>
                        <Text type="secondary">Response:</Text>
                        <pre style={{ background: '#f9f9f9', padding: '12px 16px', borderRadius: 8 }}>
                            {`{
  "shortUrl": "http://localhost:3000/abc123"
}`}
                        </pre>
                    </Paragraph>
                </div>

            </Content>


        </Layout>
    );
};

export default Docs;
