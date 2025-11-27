
import React from 'react';
import { Steps } from 'antd';
import { RegistrationStep } from '../interfaces';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Steps 
      current={stepIndex[currentStep]} 
      className="custom-steps"
    >
      <Step title={t('steps.basicInfo')}  />
      <Step title={t('steps.detail')}  />
      <Step title={t('steps.account')}  />
      <Step title={t('steps.confirmation')} />
    </Steps>
  );
};

export default RegistrationSteps;