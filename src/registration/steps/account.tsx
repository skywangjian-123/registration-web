import React from 'react';
import { Button, Form, Input, Typography, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { StepProps } from '../interfaces';
import type { Rule } from 'antd/es/form';
import { useTranslation } from 'react-i18next';


const AccountStep: React.FC<StepProps> = ({ onPrev, onNext, setFormData, formData }) => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
  const { t } = useTranslation();
  const emailRules: Rule[] = [
    { required: true, message: t('validation.emailRequired') },
    { type: 'email', message: t('validation.emailInvalid') },
  ];

  const passwordRules: Rule[] = [
    { required: true, message: t('validation.passwordRequired') },
    { min: 8, message: t('validation.passwordMinLength') },
    { pattern: /[A-Z]/, message: t('validation.passwordUppercase') },
    { pattern: /[a-z]/, message: t('validation.passwordLowercase') },
    { pattern: /[0-9]/, message: t('validation.passwordNumber') },
    { pattern: /[^A-Za-z0-9]/, message: t('validation.passwordSpecial') },
  ];

  const confirmPasswordRules: Rule[] = [
    { required: true, message: t('validation.confirmPasswordRequired') },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(t('validation.passwordMismatch')));
      },
    }),
  ];

  const handleNext = () => {
    form.validateFields()
      .then(values => {
        setFormData(prev => ({
          ...prev,
          account: {
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
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
      <Title level={4} className="step-title">{t('account.title')}</Title>
      <Text type="secondary" className="step-subtitle">{t('account.subtitle')}</Text>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={formData.account}
        className="step-form"
      >
        <Form.Item
          name="email"
          label={t('account.email')}
          rules={emailRules}
        >
          <Input placeholder="test@test.com" size="large" />
        </Form.Item>
        
        <Form.Item
          name="password"
          label={t('account.password')}
          rules={passwordRules}
        >
          <Input.Password placeholder="8 characters at least" size="large" />
        </Form.Item>
        
        <Form.Item
          name="confirmPassword"
          label={t('account.confirmPassword')}
          dependencies={['password']}
          rules={confirmPasswordRules}
        >
          <Input.Password placeholder="Input password again" size="large" />
        </Form.Item>
        <div className="step-actions">
                    <Space>
                    <Button
                        id="btnAccountPrev"
                        onClick={onPrev}
                        size="large"
                        icon={<ArrowLeftOutlined />}
                    >
                        {t('account.previous')}
                    </Button>

                    <Button
                        id="btnAccountNext"
                        type="primary"
                        onClick={handleNext}
                        size="large"
                        icon={<ArrowRightOutlined />}
                    >
                        {t('account.next')}
                    </Button>
                    </Space>
        </div>
        
      </Form>
    </div>
  );
};

export default AccountStep;