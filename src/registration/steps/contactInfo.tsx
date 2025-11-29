import React from 'react';
import { Button, Form, Input, Select, Typography, Space, Card, Divider } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { StepProps } from '../interfaces';
import { RELATIONSHIPS } from '../consts';
import type { Rule } from 'antd/es/form';

const ContactInfoStep: React.FC<StepProps> = ({ onNext, onPrev, setFormData, formData }) => {
    const [form] = Form.useForm();
    const { Title, Text } = Typography;

    // Validation rules for phone number
    const phoneRules: Rule[] = [
        { required: true, message: 'Phone number is required' },
        { pattern: /^1[3-9]\d{9}$/, message: 'Please input a valid Chinese phone number' },
    ];

    const handleNext = () => {
        form.validateFields()
            .then(values => {
                setFormData(prev => ({
                    ...prev,
                    contactInfo: {
                        phone: values.phone,
                        address: values.address,
                        emergencyContacts: values.emergencyContacts || [],
                    }
                }));
                onNext();
            })
            .catch(err => {
                console.log('Validation Failed:', err);
            });
    };

    const handlePrev = () => {
        form.validateFields()
            .then(values => {
                setFormData(prev => ({
                    ...prev,
                    contactInfo: {
                        phone: values.phone,
                        address: values.address,
                        emergencyContacts: values.emergencyContacts || [],
                    }
                }));
                onPrev();
            })
            .catch(() => {
                // Allow navigating back even if validation fails
                onPrev();
            });
    };

    return (
        <div className="step-content">
            <Title level={4} className="step-title">Contact Information</Title>
            <Text type="secondary" className="step-subtitle">Please input your contact information</Text>

            <Form
                form={form}
                layout="vertical"
                initialValues={{ ...formData.contactInfo, emergencyContacts: formData.contactInfo?.emergencyContacts || [{}] }}
                className="step-form"
            >
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={phoneRules}
                >
                    <Input placeholder="13800138000" size="large" />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Address is required' }]}
                >
                    <Input.TextArea placeholder="Please input your address" size="large" rows={3} />
                </Form.Item>

                <Divider />

                <Title level={5} className="step-subtitle">Emergency Contacts</Title>
                <Text type="secondary" className="step-description">Please add at least one emergency contact</Text>

                <Form.List
                    name="emergencyContacts"
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Card key={key} style={{ marginBottom: 16 }}>
                                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']}
                                            label="Name"
                                            rules={[{ required: true, message: 'Name is required' }]}
                                        >
                                            <Input placeholder="Emergency contact name" size="large" />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'phone']}
                                            label="Phone Number"
                                            rules={phoneRules}
                                        >
                                            <Input placeholder="13800138000" size="large" />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'relationship']}
                                            label="Relationship"
                                            rules={[{ required: true, message: 'Relationship is required' }]}
                                        >
                                            <Select
                                                size="large"
                                                placeholder="Select relationship"
                                                options={RELATIONSHIPS}
                                            />
                                        </Form.Item>

                                        {fields.length > 1 && (
                                            <Button
                                                type="text"
                                                icon={<MinusCircleOutlined />}
                                                onClick={() => remove(name)}
                                                danger
                                            >
                                                Remove Contact
                                            </Button>
                                        )}
                                    </Space>
                                </Card>
                            ))}

                            <Form.Item
                                rules={[
                                    () => ({
                                        validator(_, __, callback) {
                                            const values = form.getFieldValue('emergencyContacts');
                                            if (values && values.length > 0) {
                                                callback();
                                            } else {
                                                callback('Please add at least one emergency contact');
                                            }
                                        },
                                    }),
                                ]}
                            >
                                <Button
                                    type="dashed"
                                    onClick={() => add({})}
                                    icon={<PlusOutlined />}
                                    block
                                >
                                    Add Emergency Contact
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <div className="step-actions">
                    <Button
                        onClick={handlePrev}
                        size="large"
                        icon={<ArrowLeftOutlined />}
                    >
                        Previous
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleNext}
                        size="large"
                        icon={<ArrowRightOutlined />}
                        id="btnContactInfoNext"
                    >
                        Next
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ContactInfoStep;