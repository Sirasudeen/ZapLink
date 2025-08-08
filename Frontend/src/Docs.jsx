import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { Layout, Typography, Card, Row, Col, message, Space } from 'antd';
const { Title, Text } = Typography;

const { Header, Content, Footer } = Layout;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Docs = () => {
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


      <Content className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="mb-12 text-center px-2 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Documentation
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know to use the ZapLink API.
          </p>
        </div>

        <motion.div
          className="mb-8 rounded-2xl border border-gray-100 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="mb-3 text-xl sm:text-2xl font-bold text-indigo-600">Introduction</h3>
          <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
            ZapLink is a simple and efficient URL shortening service that lets you convert long,
            bulky URLs into short, easy-to-share links. This documentation covers the API endpoints
            and usage details for developers and users.
          </p>
        </motion.div>

        <motion.div
          className="mb-8 rounded-2xl border border-gray-100 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="mb-3 text-xl sm:text-2xl font-bold text-indigo-600">How It Works</h3>
          <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300">
            Enter your long URL into the form on the homepage. Our backend service encodes a unique
            short code for your URL using a Base62 encoder, stores the mapping in PostgreSQL with
            caching via Redis, and returns a short URL.
          </p>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-gray-100 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h3 className="mb-3 text-xl sm:text-2xl font-bold text-indigo-600">API Endpoints</h3>

          <div className="space-y-4">
            <div>
              <p className="font-mono text-sm sm:text-base">
                <span className="mr-3 inline-block rounded-md bg-green-100 px-2 py-1 font-semibold text-green-800">
                  POST
                </span>
                <code className="break-words">/api/shorten</code>
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-200">Description:</p>
              <p className="text-gray-600 dark:text-gray-400">Shortens a given long URL.</p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-200">Body:</p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">
                <code>
                  {`{
  "longUrl": "https://example.com/a-very-long-url-to-shorten"
}`}
                </code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-200">Response:</p>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white">
                <code>
                  {`{
  "shortUrl": "https://zap.siras.dev/abc123"
}`}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </Content>

    </Layout>
  );
};

export default Docs;