import { Form, Select, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface BirthdaySelectsProps {
  form: any;
}

const BirthdaySelector = ({ form }: BirthdaySelectsProps) => {
  const [days, setDays] = useState<number[]>([]);
  const year = Form.useWatch('birthYear', form);
  const month = Form.useWatch('birthMonth', form);
  const day = Form.useWatch('birthDay', form);

  // Generate years (1900 - current year)
  const years: number[] = Array.from(
    { length: new Date().getFullYear() - 1917 },
    (_, i) => new Date().getFullYear() - 18 - i
  );

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  useEffect(() => {
    if (year && month) {
      const daysInMonth = dayjs(`${year}-${month}`).daysInMonth();
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    } else {
      setDays([]);
    }

    if (year && month && day) {
      const paddedMonth = String(month).padStart(2, '0');
      const paddedDay = String(day).padStart(2, '0');
      form.setFieldsValue({ birthday: `${year}-${paddedMonth}-${paddedDay}` });
    } else {
      form.setFieldsValue({ birthday: undefined });
    }
  }, [year, month, day, form]);

  return (
    <>
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item
            name="birthYear"
            rules={[{ required: true, message: 'Year required' }]}
          >
            <Select showSearch placeholder="Year" options={years.map(y => ({ value: y, label: y }))} />
          </Form.Item>
        </Col>
        
        <Col span={8}>
          <Form.Item
            name="birthMonth"
            rules={[{ required: true, message: 'Month required' }]}
          >
            <Select showSearch placeholder="Month" options={months} />
          </Form.Item>
        </Col>
        
        <Col span={8}>
          <Form.Item
            name="birthDay"
            rules={[{ required: true, message: 'Day required' }]}
          >
            <Select 
              showSearch
              placeholder="Day" 
              disabled={!year || !month}
              options={days.map(d => ({ value: d, label: d }))}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};


export default BirthdaySelector;
