
import React from 'react';
import { Button, Typography, Space } from 'antd';
import { StepProps } from '../interfaces';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { getCountryByCode, getGenderByCode } from '../utils';

const ConfirmationStep: React.FC<StepProps & { onSubmit: () => void }> = ({
    onPrev,
    onSubmit,
    formData
}) => {
    const { Title, Text } = Typography;

    return (
        <div className="step-content">
            <Title level={4} className="step-title">Confirm Your Information</Title>
            <Text type="secondary" className="step-subtitle">Please check if they are correct</Text>

            <div className="confirmation-container">
                <div className="info-section">
                    <Title level={5} className="info-title">Basic Information</Title>
                    <div className="info-item">
                        <Text strong>Name:</Text>
                        <Text>{formData.basicInfo.lastName} {formData.basicInfo.firstName}</Text>
                    </div>
                    <div className="info-item">
                        <Text strong>Birthday:</Text>
                        <Text>{formData.basicInfo.birthday}</Text>
                    </div>
                </div>

                <div className="info-section">
                    <Title level={5} className="info-title">Detail</Title>
                    <div className="info-item">
                        <Text strong>Country:</Text>
                        <Text>
                            {getCountryByCode(formData.detail.country)}
                        </Text>
                    </div>
                    <div className="info-item">
                        <Text strong>Gender:</Text>
                        <Text>{getGenderByCode(formData.detail.gender)}</Text>
                    </div>
                    <div className="info-item">
                        <Text strong>Avatar Picture:</Text>
                        <Text>{formData.detail.avatar}</Text>
                    </div>
                </div>

                <div className="info-section">
                    <Title level={5} className="info-title">Account Information</Title>
                    <div className="info-item">
                        <Text strong>Email Address:</Text>
                        <Text>{formData.account.email}</Text>
                    </div>
                    <div className="info-item">
                        <Text strong>Password:</Text>
                        <Text>••••••••</Text>
                    </div>
                </div>
            </div>

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
                        id="btnSubmit"
                        type="primary"
                        onClick={onSubmit}
                        size="large"
                        icon={<CheckOutlined />}
                    >
                        Submit
                    </Button>
                </Space>

            </div>
        </div>
    );
};

export default ConfirmationStep;