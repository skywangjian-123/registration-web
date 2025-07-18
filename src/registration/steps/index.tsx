
import React from 'react';
import { Steps } from 'antd';
import { RegistrationStep } from '../interfaces';
import { 
  UserOutlined, 
  IdcardOutlined, 
  SettingOutlined, 
  CheckCircleOutlined
} from '@ant-design/icons';
import { ALL_STEPS } from '../consts';

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
      onChange={(index) => {
        const steps: RegistrationStep[] = ALL_STEPS;
        onStepChange(steps[index]);
      }}
      className="custom-steps"
    >
      <Step title="Basic Info" icon={<IdcardOutlined />} />
      <Step title="Details" icon={<SettingOutlined />} />
      <Step title="Account" icon={<UserOutlined />} />
      <Step title="Confirmation" icon={<CheckCircleOutlined />} />
    </Steps>
  );
};

export default RegistrationSteps;