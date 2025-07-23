import React, { useState } from 'react';
import UrlForm from './components/UrlForm';
import ShortUrlCard from './components/ShortUrlCard';
import { Layout, Typography, Card, Row, Col, message, Space } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const Home = () => {
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleShorten = async (longUrl, resetInput) => {
        setLoading(true);
        setError('');
        setShortUrl('');
        try {
            const res = await fetch(`${import.meta.env.VITE_URL_GEN_SERVICE}/shorten`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ longUrl }),
            });
            const data = await res.json();
            if (res.ok && data.shortUrl) {
                setShortUrl(data.shortUrl.shortURL || data.shortUrl);
                resetInput('');
                message.success('URL shortened successfully!');
            } else {
                setError(data.error || 'Something went wrong');
                message.error(data.error || 'Something went wrong');
            }
        } catch {
            setError('Network error');
            message.error('Network error');
        }
        setLoading(false);
    };

    return (
        <Layout
            style={{
                minHeight: '100vh',
                background: 'transparent',
                fontFamily: "'Inter', sans-serif"
            }}
        >

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
                        <Title
                            level={4}
                            style={{
                                margin: 0,
                                color: '#333',
                                letterSpacing: 0.5,
                                fontWeight: 700,
                                fontSize: '1.8rem',
                                fontFamily: "'Poppins', sans-serif",
                            }}
                        >
                            ZapLink
                        </Title>
                    </Link>
                </div>

                <Space size="large">
                    <Link
                        to="/docs"
                        style={{
                            color: '#555',
                            fontWeight: 500,
                            textDecoration: 'none',
                            fontSize: '1rem',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = '#3b28cc')}
                        onMouseLeave={(e) => (e.target.style.color = '#555')}
                    >
                        Docs
                    </Link>

                    <Link
                        to="/about"
                        style={{
                            color: '#555',
                            fontWeight: 500,
                            textDecoration: 'none',
                            fontSize: '1rem',
                            transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.target.style.color = '#3b28cc')}
                        onMouseLeave={(e) => (e.target.style.color = '#555')}
                    >
                        About
                    </Link>
                </Space>
            </Header>


            <Content
                style={{
                    minHeight: '75vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '50px 24px',
                }}
            >
                <Typography style={{ textAlign: 'center', fontFamily: "Galgo Bold", marginBottom: '0.3rem', fontSize: 'clamp(2rem,1rem + min(10vh,7vw),5.5rem)', color: 'white', fontWeight: 'bold', width: '90%' }}>
                    Simplify your links, share them anywhere, and monitor their reach with ease.

                </Typography>
                <Row justify="center" align="middle" style={{ width: '100%' }}>
                    <Col
                        xs={24}
                        sm={22}
                        md={16}
                        lg={12}
                        xl={10}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Card
                            style={{
                                width: '100%',
                                maxWidth: 600,
                                borderRadius: 24,
                                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
                                background: '#ffffff',
                                border: '1px solid #e0e0e0',
                                margin: '3rem 0',
                            }}
                            bodyStyle={{ padding: '50px 40px' }}
                        >
                            <Title
                                level={3}
                                style={{
                                    textAlign: 'center',
                                    marginBottom: 32,
                                    color: '#333',
                                    fontWeight: 700,
                                    fontFamily: "'Poppins', sans-serif"
                                }}
                            >
                                Create a Short Link 🚀
                            </Title>

                            <UrlForm onSubmit={handleShorten} loading={loading} />

                            {shortUrl && <ShortUrlCard shortUrl={shortUrl} />}

                            {error && (
                                <Text
                                    type="danger"
                                    style={{
                                        display: 'block',
                                        marginTop: 28,
                                        textAlign: 'center',
                                        fontSize: '1rem',
                                        color: '#ff4d4f',
                                    }}
                                >
                                    {error}
                                </Text>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Content>


        </Layout>
    );
};

export default Home;
