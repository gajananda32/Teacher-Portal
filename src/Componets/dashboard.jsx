import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, notification, Layout, } from 'antd';
import axios from 'axios';
const { Content } = Layout;

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        // Fetch students data from the API
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/student/getStudent');
            setStudents(response.data.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };


    const handleEdit = (record) => {
        setEditingStudent(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (studentId) => {
        try {
            await axios.post(`http://localhost:5000/api/student/deleteStudent`, studentId);
            notification.success({
                message: 'Success',
                description: 'Student deleted successfully',
                placement: 'topRight',
            });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to delete student',
                placement: 'topRight',
            });
        }
    };

    const handleAddOrUpdate = async (values) => {

        try {
            if (editingStudent) {
                values._id = editingStudent._id;
                await axios.post(`http://localhost:5000/api/student/updateStudent`, values);
                notification.success({
                    message: 'Success',
                    description: 'Student updated successfully',
                    placement: 'topRight',
                });
            } else {
                await axios.post('http://localhost:5000/api/student/register', values);
                notification.success({
                    message: 'Success',
                    description: 'Student added successfully',
                    placement: 'topRight',
                });
            }
            setIsModalVisible(false);
            form.resetFields();
            setEditingStudent(null);
            fetchStudents();
        } catch (error) {
            console.error('Error adding/updating student:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to add/update student',
                placement: 'topRight',
            });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        notification.success({
            message: 'Logout Successful',
            description: 'You have been logged out successfully',
            placement: 'topRight',
        });
        window.location.href = '/login';
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Subject Name',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Marks',
            dataIndex: 'marks',
            key: 'marks',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" onClick={() => handleDelete(record)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
            <Content>

                <div >
                    <Button  onClick={handleLogout} style={{ float: 'right' }}>
                        Logout
                    </Button>
                </div>
                <h1 style={{ marginTop: '30px', marginBottom: '20px' }}>Student List</h1>
                <div className="table-container">
                    <Table columns={columns} dataSource={students} rowKey="_id" pagination={false} />
                </div>
                <Button
                    type="primary"
                    onClick={() => setIsModalVisible(true)}
                    className="add-student-button"
                >
                    Add Student
                </Button>
                <Modal
                    title={editingStudent ? 'Edit Student' : 'Add Student'}
                    visible={isModalVisible}
                    onCancel={() => {
                        setIsModalVisible(false);
                        form.resetFields();
                        setEditingStudent(null);
                    }}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleAddOrUpdate}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter the student\'s name' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Subject"
                            name="subject"
                            rules={[{ required: true, message: 'Please enter the subject' }]}
                        >
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item
                            label="Marks"
                            name="marks"
                            rules={[{ required: true, message: 'Please enter the marks' }]}
                            normalize={(value) => parseFloat(value)}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {editingStudent ? 'Update' : 'Add'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
    );
};

export default Dashboard;
