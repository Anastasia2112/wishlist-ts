import { Button, Form, Input, InputNumber, Radio, RadioChangeEvent, Select } from 'antd';
import { useContext, useState } from 'react';
import { FirebaseContextType, WishType } from '../../../models';
import { FirebaseContext } from '../../context/FirebaseContext';

const { Option } = Select;

interface IWishForm {
    unicCategs : string[],
    handleCancel : () => void,
    onFinishFunc : (newWish: WishType) => void,
    formType : string,
    wishItem? : WishType
    // onAddFinish : (values: WishType) => void,
    // onAddFinishFailed : (errorInfo: any) => void
};

const WishForm = ({ unicCategs, handleCancel, onFinishFunc, formType, wishItem}: IWishForm) => {

    const { user } = useContext(FirebaseContext) as FirebaseContextType;

    const [value, setValue] = useState(1);

    const createWish = (formData: WishType) => {
        const newWish = {...formData, userId: user?.uid};
        onFinishFunc(newWish);
        // console.log(newWish);
    };

    const editWish = (formData: WishType) => {
        const editWish = {...formData};
        onFinishFunc(editWish);
        // console.log(newWish);
    };

    const onFinish = (values: WishType) => {
        {formType === 'add' && createWish(values);}
        {formType === 'edit' && editWish(values);}
        handleCancel();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    let initialFormValues;
    let btnLabel;

    switch (formType) {
        case 'add':
            initialFormValues = {
                'link': "",
                'category': unicCategs[0],
                'desc': ""
            };
            btnLabel = 'Добавить';
            break;
        case 'edit':
            initialFormValues = {
                'name': wishItem?.name,
                'link': wishItem?.link,
                'price': wishItem?.price,
                'img': wishItem?.img,
                'category': wishItem?.category,
                'desc': wishItem?.desc,
            };
            btnLabel = 'Отправить';
            break;
    }

  return (
    <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialFormValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
            {btnLabel}
        </Button>
        </Form.Item>
    </Form>
  )
}

export default WishForm