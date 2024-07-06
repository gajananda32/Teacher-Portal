import React from 'react';
import { Card, Typography, Form, Input, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [form] = Form.useForm();

    const handleRegister = async (values) => {
        try {
            console.log(values);
            const response = await axios.post('http://localhost:5000/api/user/register', values);
            console.log(response.data); // Log the response data
            notification.success({
                message: 'User Added',
                description: 'User Registrtion successfully',
                placement: 'topRight',
            });

            // Reset form fields
            form.resetFields();

            // Show success message on the right side
        } catch (error) {
            console.error('Error adding user:', error);
            // Show error message
            notification.error({
                message: 'Error',
                description: 'Failed to add user',
                placement: 'topRight',
            });
        }
    };

    return (
        <div className='orm-design'>
        <Card>
            <div style={{ maxWidth: 400, margin: 'auto' }}>
                <Typography.Title level={3} strong className="title">
                    Create an account
                </Typography.Title>
                <Form form={form} layout='vertical' onFinish={handleRegister} autoComplete="off">
                    <Form.Item label='Full name' name='username' rules={[{ required: true, message: 'Please enter your username' }]}>
                        <Input size="large" placeholder="Enter username" />
                    </Form.Item>
                    <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Invalid email format' }]}>
                        <Input size="large" placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
                        <Input.Password size="large" placeholder="Enter password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" className="btn">
                            Create Account
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to="/login">
                            <Button size="large" className="btn">
                                Login
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </Card>
        </div>
    );
};

export default Register;
