
import React from 'react';
import { Button, Form, Input, Typography, DatePicker } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { StepProps } from '../interfaces';
import dayjs from 'dayjs';
import type { Rule } from 'antd/es/form';
import type { Dayjs } from 'dayjs';

const BasicInfoStep: React.FC<StepProps> = ({ onNext, setFormData, formData }) => {
    const [form] = Form.useForm();
    const { Title, Text } = Typography;

    // Calculate max date (18 years ago from today)
    const maxDate = dayjs().subtract(18, 'year');

    // Validation rules for date picker
    const birthdayRules: Rule[] = [
        { required: true, message: 'Birthday is required' },
        () => ({
            validator(_, value: Dayjs) {
                if (!value) return Promise.resolve();
                
                const age = dayjs().diff(value, 'year');
                if (age >= 18) {
                    return Promise.resolve();
                }
                return Promise.reject('Must be at least 18 years old');
            },
        }),
    ];

    const handleNext = () => {
        form.validateFields()
            .then(values => {
                setFormData(prev => ({
                    ...prev,
                    basicInfo: {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : '',
                    }
                }));
                onNext();
            })
            .catch(err => {
                console.log('Validation Failed:', err);
            });
    };

    return (
        <div className="step-content">
            <Title level={4} className="step-title">Basic Information</Title>
            <Text type="secondary" className="step-subtitle">Please input your basic information</Text>

            <Form
                form={form}
                layout="vertical"
                initialValues={formData.basicInfo}
                className="step-form"
            >
                <div className="name-row">
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please input your first name' }]}
                        className="name-item"
                    >
                        <Input placeholder="John" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please input your last name' }]}
                        className="name-item"
                    >
                        <Input placeholder="Wang" size="large" />
                    </Form.Item>
                </div>

                <Form.Item
                    name="birthday"
                    label="Birthday"
                    rules={birthdayRules}
                >
                    <DatePicker 
                        size="large" 
                        style={{ width: '100%' }} 
                        placeholder="Select your birthday" 
                        disabledDate={(current) => current && current > maxDate}
                    />
                </Form.Item>

                <div className="step-actions">
                    <Button
                        type="primary"
                        onClick={handleNext}
                        size="large"
                        icon={<ArrowRightOutlined />}
                        id="btnBasicInfoNext"
                    >
                        Next
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default BasicInfoStep;
