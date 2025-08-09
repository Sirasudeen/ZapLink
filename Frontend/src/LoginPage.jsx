import React, { useState } from 'react';
import { supabase } from './Auth/SupabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, message, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) throw error;

            message.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            message.error(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">

            <Card className="w-full max-w-md shadow-lg rounded-xl">
                <Title level={2} className="text-center">Welcome Back!</Title>
                <Form name="login" onFinish={onFinish} layout="vertical" requiredMark="optional">
                    <Form.Item
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="w-full" size="large">
                            Log In
                        </Button>
                    </Form.Item>
                </Form>
                <Text className="block text-center">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </Text>
            </Card>
        </div>
    );
};

export default Login;