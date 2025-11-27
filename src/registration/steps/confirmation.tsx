
import React from 'react';
import { Button, Typography, Space } from 'antd';
import { StepProps } from '../interfaces';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { getCountryByCode, getGenderByCode } from '../utils';
import { useTranslation } from 'react-i18next';

const ConfirmationStep: React.FC<StepProps & { onSubmit: () => void }> = ({
    onPrev,
    onSubmit,
    formData
}) => {
    const { Title, Text } = Typography;
    const { t } = useTranslation();

    return (
        <div className="step-content">
            <Title level={4} className="step-title">{t('confirmation.title')}</Title>
            <Text type="secondary" className="step-subtitle">{t('confirmation.subtitle')}</Text>

            <div className="confirmation-container">
                <div className="info-section">
                    <Title level={5} className="info-title">{t('confirmation.basicInfo')}</Title>
                    <div className="info-item">
                        <Text strong>{t('confirmation.name')}:</Text>
                        <Text>{formData.basicInfo.lastName} {formData.basicInfo.firstName}</Text>
                    </div>
                    <div className="info-item">
                        <Text strong>{t('confirmation.birthday')}:</Text>
                        <Text>{formData.basicInfo.birthday}</Text>
                    </div>
                </div>

                <div className="info-section">
                    <Title level={5} className="info-title">{t('confirmation.detail')}</Title>
                    <div className="info-item">
                        <Text strong>{t('confirmation.country')}:</Text>
                        <Text>
                            {getCountryByCode(formData.detail.country)}
                        </Text>
                    </div>
                    <div className="info-item">
                        <Text strong>{t('confirmation.gender')}:</Text>
                        <Text>{getGenderByCode(formData.detail.gender)}</Text>
                    </div>
                    <div className="info-item">
                        <Text strong>{t('confirmation.avatar')}:</Text>
                        <Text>{formData.detail.avatar}</Text>
                    </div>
                </div>

                <div className="info-section">
                    <Title level={5} className="info-title">{t('confirmation.accountInfo')}</Title>
                    <div className="info-item">
                        <Text strong>{t('confirmation.email')}:</Text>
                        <Text>{formData.account.email}</Text>
                    </div>
                    <div className="info-item">
                        <Text strong>{t('confirmation.password')}:</Text>
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
                        {t('confirmation.previous')}
                    </Button>

                    <Button
                        id="btnSubmit"
                        type="primary"
                        onClick={onSubmit}
                        size="large"
                        icon={<CheckOutlined />}
                    >
                        {t('confirmation.submit')}
                    </Button>
                </Space>

            </div>
        </div>
    );
};

export default ConfirmationStep;