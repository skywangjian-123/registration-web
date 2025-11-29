import React from 'react';
import { Button, Form, Input, Select, Typography, Space, List, Card } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { StepProps } from '../interfaces';
import { RELATIONSHIPS } from '../consts';
import type { Rule } from 'antd/es/form';

const { Title, Text } = Typography;
const { Item } = Form;
const { Option } = Select;

const ContactInfoStep: React.FC<StepProps> = ({ onNext, onPrev, setFormData, formData }) => {
  const [form] = Form.useForm();

  // 手机号验证规则
  const phoneRules: Rule[] = [
    { required: true, message: 'Phone number is required' },
    { pattern: /^1[3-9]\d{9}$/, message: 'Invalid phone number format' },
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

  return (
    <div className="step-content">
      <Title level={4} className="step-title">Contact Information</Title>
      <Text type="secondary" className="step-subtitle">Please input your contact information</Text>

      <Form
        form={form}
        layout="vertical"
        initialValues={formData.contactInfo}
        className="step-form"
      >
        <Item
          name="phone"
          label="Phone Number"
          rules={phoneRules}
        >
          <Input placeholder="13800138000" size="large" />
        </Item>

        <Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Address is required' }]}
        >
          <Input.TextArea placeholder="Please input your address" rows={3} size="large" />
        </Item>

        <Title level={5} className="emergency-title">Emergency Contacts</Title>
        <Text type="secondary" className="emergency-subtitle">Please add at least one emergency contact</Text>

        <Item
          name="emergencyContacts"
          rules={[{ required: true, message: 'Please add at least one emergency contact' }]}
        >
          <Form.List name="emergencyContacts">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} className="emergency-card" size="small">
                    <Space direction="vertical" className="emergency-fields" style={{ width: '100%' }}>
                      <Space className="emergency-row" style={{ width: '100%' }}>
                        <Item
                          {...restField}
                          name={[name, 'name']}
                          rules={[{ required: true, message: 'Name is required' }]}
                          style={{ marginBottom: 0, flex: 1 }}
                        >
                          <Input placeholder="Name" size="large" />
                        </Item>

                        <Item
                          {...restField}
                          name={[name, 'phone']}
                          rules={phoneRules}
                          style={{ marginBottom: 0, flex: 1 }}
                        >
                          <Input placeholder="Phone Number" size="large" />
                        </Item>

                        <Item
                          {...restField}
                          name={[name, 'relationship']}
                          rules={[{ required: true, message: 'Relationship is required' }]}
                          style={{ marginBottom: 0, flex: 1 }}
                        >
                          <Select placeholder="Relationship" size="large">
                            {RELATIONSHIPS.map(relationship => (
                              <Option key={relationship.value} value={relationship.value}>
                                {relationship.label}
                              </Option>
                            ))}
                          </Select>
                        </Item>

                        <Button
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                          disabled={fields.length <= 1}
                        />
                      </Space>
                    </Space>
                  </Card>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: '100%', marginTop: 16 }}
                >
                  Add Emergency Contact
                </Button>
              </>
            )}
          </Form.List>
        </Item>

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
              id="btnContactInfoNext"
            >
              Next
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default ContactInfoStep;