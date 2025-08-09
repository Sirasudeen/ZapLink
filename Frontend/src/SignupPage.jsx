import React, { useState } from 'react';
import { supabase } from './Auth/SupabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, message, Typography } from 'antd';
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
                message.error('User with this email already exists.');
            } else {
                message.success('Success! Please check your email for a verification link.');
                navigate('/');
            }

        } catch (error) {
            message.error(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md shadow-lg rounded-xl">
                <Title level={2} className="text-center">Create an Account</Title>
                <Form name="signup" onFinish={onFinish} layout="vertical" requiredMark="optional">
                    <Form.Item
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="w-full" size="large">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <Text className="block text-center">
                    Already have an account? <Link to="/login">Log In</Link>
                </Text>
            </Card>
        </div>
    );
};

export default Signup;