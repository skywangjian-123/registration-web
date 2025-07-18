import React from 'react';
import { Button, Form, Input, Typography, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { StepProps } from '../interfaces';


const AccountStep: React.FC<StepProps> = ({ onPrev, onNext, setFormData, formData }) => {
  const [form] = Form.useForm();
  const { Title, Text } = Typography;
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
      <Title level={4} className="step-title">Account</Title>
      <Text type="secondary" className="step-subtitle">Please input your account information</Text>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={formData.account}
        className="step-form"
      >
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'please input your email address' }, 
            { type: 'email', message: 'please input valid email address' }
          ]}
        >
          <Input placeholder="test@test.com" size="large" />
        </Form.Item>
        
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'please input your password' }, 
            { min: 8, message: '8 characters at least' }
          ]}
        >
          <Input.Password placeholder="8 characters at least" size="large" />
        </Form.Item>
        
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please input confirm password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Password is not the same.'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Input password again" size="large" />
        </Form.Item>
        <div className="step-actions">
                    <Space>
                    <Button
                        onClick={onPrev}
                        size="large"
                        icon={<ArrowLeftOutlined />}
                    >
                        Prev
                    </Button>

                    <Button
                        type="primary"
                        onClick={handleNext}
                        size="large"
                        icon={<ArrowRightOutlined />}
                    >
                        Next
                    </Button>
                    </Space>
        </div>
        
      </Form>
    </div>
  );
};

export default AccountStep;