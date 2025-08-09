import React, { useState } from 'react';
import { supabase } from '../Auth/SupabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, message, Typography } from 'antd';
import { motion } from 'framer-motion';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
            });

            if (error) throw error;

            if (data.user && data.user.identities && data.user.identities.length === 0) {
                message.error('A user with this email already exists. Please try logging in.');
            } else {
                message.success('Success! Please check your email for a verification link to complete your registration.');
                navigate('/login');
            }

        } catch (error) {
            message.error(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-md"
            >
                <Card
                    className="shadow-2xl rounded-3xl"
                    style={{
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        padding: '2rem',
                        width: '100%',
                    }}
                >
                    <div className="text-center mb-6">
                        <Title
                            level={2}
                            style={{
                                margin: 0,
                                fontWeight: 700,
                                fontFamily: "'Poppins', sans-serif",
                                color: '#333',
                            }}
                        >
                            Create an Account
                        </Title>
                        <Text type="secondary" style={{ fontSize: '1rem' }}>
                            Get started with us today
                        </Text>
                    </div>

                    <Form name="signup" onFinish={onFinish} layout="vertical" requiredMark="optional">
                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                        >
                            <Input
                                placeholder="Email"
                                size="large"
                                style={{
                                    borderRadius: '10px',
                                    border: '1px solid #d9d9d9',
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters!' }]}
                        >
                            <Input.Password
                                placeholder="Password"
                                size="large"
                                style={{
                                    borderRadius: '10px',
                                    border: '1px solid #d9d9d9',
                                }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="w-full"
                                size="large"
                                style={{
                                    borderRadius: '10px',
                                    background: 'linear-gradient(90deg, #34D399, #3B82F6)', // green -> blue gradient
                                    border: 'none',
                                    fontWeight: '600',
                                    color: '#fff',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.9)}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
                            >
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>

                    <Text className="block text-center mt-4" style={{ fontSize: '0.95rem' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#333', fontWeight: '600' }}>
                            Log In
                        </Link>
                    </Text>
                </Card>
            </motion.div>
        </div>
    );
};

export default Signup;
