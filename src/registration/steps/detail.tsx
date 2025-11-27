import React, {useState} from 'react';
import { Button, Form, Typography, Space, Select, Upload, message } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { StepProps } from '../interfaces';
import type { GetProp, UploadProps } from 'antd';
import { GENDERS, COUNTRIES } from '../consts';
import { useTranslation } from 'react-i18next';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const DetailStep: React.FC<StepProps> = ({ onNext, onPrev, setFormData, formData }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const { Title, Text } = Typography;
  const { Option } = Select;
  const { t } = useTranslation();

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error(t('detail.uploadJpgPng'));
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(t('detail.uploadSize'));
    }
    return isJpgOrPng && isLt2M;
  };

  const handleNext = () => {
    form.validateFields()
      .then(values => {
        setFormData(prev => ({
          ...prev,
          detail: {
            country: values.country,
            gender: values.gender,
            avatar: values.avatar?.length?values.avatar[0].name:''
          }
        }));
        onNext();
      })
      .catch(err => {
        console.log('Validation Failed:', err);
      });
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{t('detail.upload')}</div>
    </button>
  );

  return (
    <div className="step-content">
      <Title level={4} className="step-title">{t('detail.title')}</Title>
      <Text type="secondary" className="step-subtitle">{t('detail.subtitle')}</Text>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={formData.detail}
        className="step-form"
      >
        <Form.Item
          name="country"
          label={t('detail.country')}
          rules={[{ required: true, message: t('validation.country') }]}
        >
          <Select showSearch placeholder={t('detail.selectCountry')}>
            {COUNTRIES.map((item)=><Option value={item.value}>{item.label}</Option>)}
          </Select>
        </Form.Item>

        {/* Gender Field */}
        <Form.Item
          name="gender"
          label={t('detail.gender')}
          rules={[{ required: true, message: t('validation.gender') }]}
        >
          <Select showSearch placeholder={t('detail.selectGender')}>
            {GENDERS.map((item)=><Option value={item.value}>{item.label}</Option>)}
          </Select>
        </Form.Item>

        {/* Avatar Picture Field (Optional) */}
        <Form.Item
          name="avatar"
          label={t('detail.profilePicture')}
          extra={t('detail.uploadExtra')}
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>

        
        <div className="step-actions">
          <Space>
            <Button 
              id="btnDetailPrev"
              onClick={onPrev} 
              size="large"
              icon={<ArrowLeftOutlined />}
            >
              {t('detail.previous')}
            </Button>
            
            <Button 
              id="btnDetailNext"
              type="primary" 
              onClick={handleNext} 
              size="large"
              icon={<ArrowRightOutlined />}
            >
              {t('detail.next')}
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default DetailStep;