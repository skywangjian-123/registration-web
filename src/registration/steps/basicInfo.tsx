
import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { StepProps } from '../interfaces';
import BirthdaySelector from '../../controls/birthdaySelector';
import dayjs from 'dayjs';
import type { Rule } from 'antd/es/form';
import { useTranslation } from 'react-i18next';

const BasicInfoStep: React.FC<StepProps> = ({ onNext, setFormData, formData }) => {
    const [form] = Form.useForm();
    const { Title, Text } = Typography;
    const { t } = useTranslation();

    // Validation rules for the combined date
    const birthdayRules: Rule[] = [
        { required: true, message: t('validation.birthdayRequired') },
        () => ({ 
            validator(_, value: string) {
                if (!value) return Promise.resolve();

                // Validate date format
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                    return Promise.reject(t('validation.birthdayFormat'));
                }

                const birthDate = dayjs(value);
                if (!birthDate.isValid()) {
                    return Promise.reject(t('validation.birthdayInvalid'));
                }

                const age = dayjs().diff(birthDate, 'year');
                if (age >= 18) {
                    return Promise.resolve();
                }
                return Promise.reject(t('validation.birthdayAge'));
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
                        birthday: values.birthday,
                        birthYear: values.birthYear,
                        birthMonth: values.birthMonth,
                        birthDay: values.birthDay,
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
            <Title level={4} className="step-title">{t('basicInfo.title')}</Title>
            <Text type="secondary" className="step-subtitle">{t('basicInfo.subtitle')}</Text>

            <Form
                form={form}
                layout="vertical"
                initialValues={formData.basicInfo}
                className="step-form"
            >
                <div className="name-row">
                    <Form.Item
                        name="firstName"
                        label={t('basicInfo.firstName')}
                        rules={[{ required: true, message: t('validation.firstName') }]}
                        className="name-item"
                    >
                        <Input placeholder="John" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label={t('basicInfo.lastName')}
                        rules={[{ required: true, message: t('validation.lastName') }]}
                        className="name-item"
                    >
                        <Input placeholder="Wang" size="large" />
                    </Form.Item>
                </div>

                <Form.Item
                    name="birthday"
                    label={t('basicInfo.birthday')}
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
                        id="btnBasicInfoNext"
                    >
                        {t('basicInfo.next')}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default BasicInfoStep;
