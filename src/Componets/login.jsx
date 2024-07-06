import React from "react";
import { Card, Form, Typography, Input, Button, notification } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/user/login', values);

            if (data.status === 200) {
                notification.success({
                    message: 'Login Successful',
                    description: 'User login successfully',
                    placement: 'topRight',
                });

                // Reset the form fields
                form.resetFields();
                console.log(data);
                localStorage.setItem('token', data.token);

                // Redirect to dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);

            notification.error({
                message: 'Login Failed',
                description: error.response?.data?.message || 'An error occurred during login.',
                placement: 'topRight',
            });
        }
    };

    return (
        <div className="form-design">
        <Card className="form-container">
            <Form
                form={form}
                layout='vertical'
                onFinish={handleLogin}
                autoComplete="off"
            >
                <Typography.Title level={3} strong className="title">
                    Login
                </Typography.Title>
                
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                        { required: true, message: 'Please enter your email Id' },
                        { type: 'email', message: 'Entered Email Id is not valid' }
                    ]}
                >
                    <Input size="large" placeholder="Enter Email Id" />
                </Form.Item>
                
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        { required: true, message: 'Please enter your password' }
                    ]}
                >
                    <Input.Password size="large" placeholder="Enter password" />
                </Form.Item>
                
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" className="btn">
                        Log In
                    </Button>
                </Form.Item>
                
                <Form.Item>
                    <Link to="/register">
                        <Button htmlType="button" size="large" className="btn">
                            Create User
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </Card>
        </div>
    );
};

export default Login;
