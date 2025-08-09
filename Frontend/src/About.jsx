import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { Layout, Typography, Card, Row, Col, message, Space } from 'antd';
const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

const About = () => {
    return (
        <Layout
            style={{
                minHeight: '100vh',
                background: 'transparent',
                fontFamily: "'Inter', sans-serif"
            }}
        >

            <main className="mx-auto max-w-4xl px-6 py-16">
                <section className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-800 dark:text-white">
                        About ZapLink ⚡
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        The snappy, modern way to shorten and share links without the fluff.
                    </p>
                </section>

                <section className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-zinc-700">
                    <h2 className="text-2xl font-bold text-indigo-600 mb-4">What is ZapLink?</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        ZapLink is a sleek and powerful URL shortener built for developers and everyday users.
                        We believe long, ugly URLs are a thing of the past. Whether you're sharing links across
                        social media, sending a clean reference in an email, or using it in production APIs —
                        ZapLink keeps it fast, efficient, and stylish.
                    </p>

                    <h3 className="mt-8 text-xl font-semibold text-indigo-500">Why ZapLink?</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300 space-y-2">
                        <li>🌐 Clean, minimalist UI</li>
                        <li>⚙️ Developer-first API</li>
                        <li>🚀 Super fast with Redis caching</li>
                        <li>🔐 Secure & privacy-respecting</li>
                        <li>📈 Analytics (coming soon)</li>
                    </ul>
                </section>
            </main>
        </Layout>
    );
};

export default About;
