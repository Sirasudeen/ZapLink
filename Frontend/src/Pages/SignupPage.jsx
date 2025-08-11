import React, { useState } from 'react';
import { supabase } from '../Auth/SupabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, message, Typography } from 'antd';
import { motion } from 'framer-motion';

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
        <div className="flex justify-center items-center min-h-screen bg-transparent px-4 sm:px-6 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
                <Card
                    className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12"
                    style={{
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                    }}
                >
                    <div className="text-center mb-8">
                        <Title
                            level={2}
                            className="!m-0 font-extrabold font-poppins text-lg sm:text-xl md:text-2xl text-gray-800"
                        >
                            Create an Account
                        </Title>
                        <Text
                            type="secondary"
                            className="block mt-2 text-sm sm:text-base font-medium"
                        >
                            Get started with us today
                        </Text>
                    </div>

                    <Form
                        name="signup"
                        onFinish={onFinish}
                        layout="vertical"
                        requiredMark="optional"
                        className="space-y-4"
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                        >
                            <Input
                                placeholder="Email"
                                size="large"
                                className="rounded-xl border border-gray-300 text-sm sm:text-base font-medium focus:border-blue-400 focus:shadow-md transition-all duration-200"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters!' }]}
                        >
                            <Input.Password
                                placeholder="Password"
                                size="large"
                                className="rounded-xl border border-gray-300 text-sm sm:text-base font-medium focus:border-blue-400 focus:shadow-md transition-all duration-200"
                            />
                        </Form.Item>

                        <Form.Item>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="w-full rounded-xl font-bold text-sm sm:text-base py-2 sm:py-3 shadow-md hover:shadow-lg transition-all duration-300"
                                    style={{
                                        background: 'linear-gradient(90deg, #34D399, #3B82F6)',
                                        color: '#fff',
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </motion.div>
                        </Form.Item>
                    </Form>

                    <Text className="block text-center mt-5 text-xs sm:text-sm md:text-base font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-gray-800 font-semibold hover:underline transition-colors duration-200">
                            Log In
                        </Link>
                    </Text>
                </Card>
            </motion.div>
        </div>
    );
};

export default Signup;
