
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
    detail: 1,
    account: 2,
    confirmation: 3
  };

  return (
    <Steps 
      current={stepIndex[currentStep]} 
      className="custom-steps"
    >
      <Step title="Basic Info"  />
      <Step title="Details"  />
      <Step title="Account"  />
      <Step title="Confirmation" />
    </Steps>
  );
};

export default RegistrationSteps;