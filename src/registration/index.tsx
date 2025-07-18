import React, { useState, useCallback } from 'react';
import { Card, message, Typography } from 'antd';
import './index.css';
import { RegistrationStep, FormData } from './interfaces';
import AccountStep from './steps/account';
import BasicInfoStep from './steps/basicInfo';
import DetailStep from './steps/detail';
import ConfirmationStep from './steps/confirmation';
import RegistrationSteps from './steps';
import { ALL_STEPS } from './consts';

const { Title, Text } = Typography;


const RegistrationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('basicInfo');
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState<FormData>({
    basicInfo: { firstName: '', lastName: '', birthday: '' },
    detail: { country: '', gender: '', avatar: '' },
    account: { email: '', password: '', confirmPassword: '' },
  });

  const handleStepChange = (step: RegistrationStep) => {
    setCurrentStep(step);
  };

  const getCurrentIndex = useCallback(() =>{
    const steps: RegistrationStep[] = ALL_STEPS;
    const currentIndex = steps.indexOf(currentStep);
    return currentIndex;
  }, [currentStep])

  const nextStep = useCallback(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < ALL_STEPS.length - 1) {
      setCurrentStep(ALL_STEPS[currentIndex + 1]);
    }
  }, [getCurrentIndex]);

  const prevStep = useCallback(() => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      setCurrentStep(ALL_STEPS[currentIndex - 1]);
    }
  }, [getCurrentIndex]);

  const handleSubmit = () => {
    messageApi.open({
      type: 'success',
      content: 'Submit Successfully',
    });
    //password needs to encrypt when submit to server;
    formData.account.password="******";
    formData.account.confirmPassword="******";
    console.log('Submit data:', formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      
      case 'basicInfo':
        return (
          <BasicInfoStep 
            onNext={nextStep} 
            onPrev={() => {}}
            setFormData={setFormData}
            formData={formData}
          />
        );
      case 'detail':
        return (
          <DetailStep 
            onNext={nextStep} 
            onPrev={prevStep}
            setFormData={setFormData}
            formData={formData}
          />
        );
      case 'account':
        return (
          <AccountStep 
            onNext={nextStep} 
            setFormData={setFormData}
            formData={formData}
            onPrev={prevStep}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationStep 
            onPrev={prevStep}
            onSubmit={handleSubmit}
            setFormData={setFormData}
            formData={formData}
            onNext={() => {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="registration-container">
      {contextHolder}
      <div className="header">
        <Title level={2} className="title">Create Account</Title>
      </div>
      
      <div className="steps-container">
        <RegistrationSteps 
          currentStep={currentStep} 
          onStepChange={handleStepChange} 
        />
      </div>
      
      <Card className="form-card">
        {renderStepContent()}
      </Card>
      
      <div className="progress-container">
        <div className="progress-bar" style={{ 
          width: `${(Object.keys(formData).indexOf(currentStep) + 1) * 25}%` 
        }}></div>
        <div className="progress-text">
          {Object.keys(formData).indexOf(currentStep) + 1} / 4 Steps
        </div>
      </div>
      
      <div className="footer">
        <Text>Already has account?<a href=" ">Login</a ></Text>
      </div>
    </div>
  );
};

export default RegistrationForm;