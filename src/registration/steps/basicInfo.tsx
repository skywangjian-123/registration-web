
import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { StepProps } from '../interfaces';
import BirthdaySelector from '../../controls/birthdaySelector';
import dayjs from 'dayjs';
import type { Rule } from 'antd/es/form';

const BasicInfoStep: React.FC<StepProps> = ({ onNext, setFormData, formData }) => {
    const [form] = Form.useForm();
    const { Title, Text } = Typography;

    // Validation rules for the combined date
    const birthdayRules: Rule[] = [
        { required: true, message: 'Birthday is required' },
        () => ({
            validator(_, value: string) {
                if (!value) return Promise.resolve();

                // Validate date format
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    return Promise.reject('Invalid date format');
                }

                const birthDate = dayjs(value);
                if (!birthDate.isValid()) {
                    return Promise.reject('Invalid date');
                }

                const age = dayjs().diff(birthDate, 'year');
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
                        birthday: values.birthday
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
                    hidden
                >
                    <Input />
                </Form.Item>

                <BirthdaySelector form={form} />

                <div className="step-actions">
                    <Button
                        type="primary"
                        onClick={handleNext}
                        size="large"
                        icon={<ArrowRightOutlined />}
                    >
                        Next
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default BasicInfoStep;
