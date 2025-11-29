
import React from 'react';
import { Button, Form, Input, Typography, DatePicker } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { StepProps } from '../interfaces';
import dayjs from 'dayjs';
import type { Rule } from 'antd/es/form';
import type { Dayjs } from 'dayjs';
import 'antd/es/date-picker/style';


const BasicInfoStep: React.FC<StepProps> = ({ onNext, setFormData, formData }) => {
    const [form] = Form.useForm();
    const { Title, Text } = Typography;

    // Validation rules for the combined date
    const birthdayRules: Rule[] = [
        { required: true, message: 'Birthday is required' },
        () => ({
            validator(_, value: Dayjs) {
                if (!value) return Promise.resolve();

                if (!value.isValid()) {
                    return Promise.reject('Invalid date');
                }

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
                const birthday = values.birthday ? values.birthday.format('YYYY-MM-DD') : '';
                setFormData(prev => ({
                    ...prev,
                    basicInfo: {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        birthday: birthday,
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
                        maxDate={dayjs().subtract(18, 'year')}
                        format="YYYY-MM-DD"
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
