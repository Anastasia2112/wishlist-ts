import { Button, Form, Input, InputNumber, Radio, RadioChangeEvent, Select } from 'antd';
import { useContext, useState } from 'react';
import { FirebaseContextType, WishType } from '../../../models';
import { FirebaseContext } from '../../context/FirebaseContext';

const { Option } = Select;

interface IWishForm {
    unicCategs : string[],
    handleAddCancel : () => void,
    create : (newWish: WishType) => void
    // onAddFinish : (values: WishType) => void,
    // onAddFinishFailed : (errorInfo: any) => void
};

const WishForm = ({ unicCategs, handleAddCancel, create }: IWishForm) => {

    const { user } = useContext(FirebaseContext) as FirebaseContextType;

    const [value, setValue] = useState(1);

    const createWish = (formData: WishType) => {
        const newWish = {...formData, userId: user?.uid};
        create(newWish);
        // console.log(newWish);
    };

    const onAddFinish = (values: WishType) => {
        createWish(values);
        handleAddCancel();
    };

    const onAddFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

  return (
    <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
        'link': "",
        'category': unicCategs[0],
        'desc': "",
        }}
        onFinish={onAddFinish}
        onFinishFailed={onAddFinishFailed}
        autoComplete="off"
    >
        <Form.Item
        label="Название"
        name="name"
        rules={[{ required: true, message: 'Введите название!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="Ссылка"
        name="link"
        >
        <Input placeholder="" />
        </Form.Item>

        <Form.Item
        label="Цена"
        name="price"
        rules={[{ required: true, message: 'Введите цену!' }]}
        >
        <InputNumber prefix="₽" min="0" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
        label="Изображение"
        name="img"
        rules={[{ required: true, message: 'Добавьте изображение!' }]}
        >
        <Input />
        </Form.Item>

        <Radio.Group onChange={onChange} value={value} >
            <Radio value={1}>Добавить категорию</Radio>
            <Radio value={2}>Выбрать категорию</Radio>
        </Radio.Group>
        <br/><br/>

        {value === 1 && <Form.Item
            label="Категория"
            name="category"
            rules={[{ required: true, message: 'Введите категорию!' }]}
        >
            <Input />
            </Form.Item>}

        {value === 2 && <Form.Item
            label="Категория"
            name="category"
            rules={[{ required: true, message: 'Выберите категорию!' }]}
        >
        <Select >
            {unicCategs.map((sort, index) => {
                return <Option key={index} value={sort}>{sort}</Option>
            })}
        </Select>
        </Form.Item>}

        <Form.Item
        label="Описание"
        name="desc"
        >
        <Input placeholder="" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 17, span: 2 }} style={ {marginBottom: 0 }}>
        <Button type="primary" htmlType="submit">
            Добавить
        </Button>
        </Form.Item>
    </Form>
  )
}

export default WishForm