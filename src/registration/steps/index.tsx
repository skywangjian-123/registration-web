
import React from 'react';
import { Steps } from 'antd';
import { RegistrationStep } from '../interfaces';

const { Step } = Steps;

const RegistrationSteps: React.FC<{ 
  currentStep: RegistrationStep; 
  onStepChange: (step: RegistrationStep) => void 
}> = ({ currentStep, onStepChange }) => {
  const stepIndex: Record<RegistrationStep, number> = {
    basicInfo: 0,
    contactInfo: 1,
    detail: 2,
    account: 3,
    confirmation: 4
  };

  return (
    <Steps 
      current={stepIndex[currentStep]} 
      className="custom-steps"
    >
      <Step title="Basic Info"  />
      <Step title="Contact Info"  />
      <Step title="Details"  />
      <Step title="Account"  />
      <Step title="Confirmation" />
    </Steps>
  );
};

export default RegistrationSteps;